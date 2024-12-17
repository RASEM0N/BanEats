import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import {
	ForbiddenException,
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IS_DEV, IS_PROD } from '@/core/constants/env';
import { JwtModule } from '@ubereats/jwt';
import { MailerModule } from '@ubereats/mailer';
import { configDb } from '@/core/db/db.config';
import { configSchema } from '@/core/config/config.schema';
import { JWT_OPTIONS, MAILER_OPTIONS } from '@/core/config/config.const';

import { RestaurantModule } from '@/modules/restaurants/restaurant.module';
import { UserModule } from '@/modules/users/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { OrderModule } from '@/modules/orders/order.module';
import { SharedModule } from '@/core/shared.module';
import { UserMiddleware } from '@/modules/users/middlewares/user.middleware';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { RestaurantsCategory } from '@/modules/restaurants/entities/category.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';
import { Verification } from '@/modules/users/entities/verification.entity';
import { Order } from '@/modules/orders/entities/order.entity';
import { OrderItem } from '@/modules/orders/entities/order-item.entity';
import { User } from '@/modules/users/entities/user.entity';
import { AppResolver } from '@/app.resolver';
import { ValidationError } from 'class-validator';
import { UBER_EATS_ERROR } from '@ubereats/common/error';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: IS_DEV ? '.env.dev' : '.env.prod',
			ignoreEnvFile: IS_PROD,
			validationSchema: configSchema(),
		}),

		JwtModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					expires: configService.get(JWT_OPTIONS.expires),
					secretKey: configService.get(JWT_OPTIONS.secret_key),
				};
			},
		}),

		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					service: configService.get(MAILER_OPTIONS.service),
					auth: {
						user: configService.get(MAILER_OPTIONS.email),
						pass: configService.get(MAILER_OPTIONS.password),
					},
				};
			},
		}),

		GraphQLModule.forRoot<ApolloDriverConfig>({
			installSubscriptionHandlers: true,
			path: '/graphql',
			driver: ApolloDriver,
			autoSchemaFile: true,
			playground: true,
			context: ({ req, connection }) => {
				return {
					// т.к. у WS нет Request
					// и через JWT не проходит
					authToken: req?.headers['x-jwt'] ?? connection?.context['x-jwt'],
				};
			},
			formatError: (formattedError, error: any) => {
				let message = formattedError.message;
				let statusCode =
					error.errorCode ??
					error.getStatus?.() ??
					error.originalError?.errorCode ??
					error.originalError?.getStatus?.() ??
					UBER_EATS_ERROR.error;

				// @TODO тут слишком много кейсов возможных
				// можно по разному возвращать ошибку
				// 1. все ошибки
				// 2. одну ошибку
				if (error.originalError?.thrownValue?.[0] instanceof ValidationError) {
					message = `[${error.originalError?.thrownValue[0].property}]: ${
						Object.values(error.originalError?.thrownValue[0].constraints)[0]
					}`;
					statusCode = UBER_EATS_ERROR.validation_error;
				}

				// @TODO надо проработать
				return {
					message,
					statusCode,

					path: formattedError.path,
					...(IS_DEV
						? {
								extensions: formattedError.extensions,
								locations: formattedError.locations,
							}
						: {}),
				};
			},
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				return configDb(configService, [
					Restaurant,
					RestaurantsCategory,
					RestaurantDish,
					Verification,
					Order,
					OrderItem,
					User,
				]);
			},
		}),
		SharedModule,
		AuthModule,
		OrderModule,
		UserModule,
		RestaurantModule,
	],
	providers: [AppResolver],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		// Только для graphql накидаем jwtMiddleware
		consumer.apply(UserMiddleware).forRoutes({
			path: '/graphql',
			method: RequestMethod.POST,
		});
	}
}
