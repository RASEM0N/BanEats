import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IS_DEV, IS_PROD } from '@/core/constants/env';
import { JwtModule } from '@ubereats/jwt';
import { MailerModule } from '@ubereats/mailer';
import { configDb } from '@/core/db/db.config';
import { configSchema } from '@/core/config/config.schema';
import { JWT_OPTIONS, MAILER_OPTIONS } from '@/core/config/config.const';
import { AppResolver } from './app.resolver';

import { RestaurantsModule } from '@/modules/restaurants/restaurants.module';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/authorization/auth.module';
import { OrdersModule } from '@/modules/orders/orders.module';
import { SharedModule } from '@/core/shared.module';
import { UserMiddleware } from '@/modules/users/middlewares/user.middleware';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { RestaurantsCategory } from '@/modules/restaurants/entities/category.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';
import { Verification } from '@/modules/users/entities/verification.entity';
import { Order } from '@/modules/orders/entities/order.entity';
import { OrderItem } from '@/modules/orders/entities/order-item.entity';
import { User } from '@/modules/users/entities/user.entity';

@Module({
	providers: [AppResolver],
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
		}),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				console.log(configDb(configService, []));

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

		// RestaurantsModule,
		// UsersModule,
		// AuthModule,
		// OrdersModule,
		// SharedModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		// Только для graphql накидаем jwtMiddleware
		// consumer.apply(UserMiddleware).forRoutes({
		// 	path: '/graphql',
		// 	method: RequestMethod.POST,
		// });
	}
}
