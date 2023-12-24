import { ENV, IS_DEVELOPMENT, IS_PRODUCTION } from '@/shared/constants/env';
import * as joi from 'joi';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from '@/modules/restaurants/restaurants.module';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { UsersModule } from '@/modules/users/users.module';
import { User } from '@/modules/users/entities/user.entity';
import { AuthorizationModule } from '@/modules/authorization/authorization.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: IS_DEVELOPMENT ? '.env.dev' : '.env.prod',
			ignoreEnvFile: IS_PRODUCTION,
			validationSchema: joi.object({
				NODE_ENV: joi.string().valid(ENV.dev, ENV.prod, ENV.test).required(),
				APP_PORT: joi.number().required(),
				DB_HOST: joi.string().required(),
				DB_NAME: joi.string().required(),
				DB_PORT: joi.number().required(),
				DB_USERNAME: joi.string().required(),
				DB_PASSWORD: joi.string().required(),
			}),
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			playground: true,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			database: process.env.DB_NAME,
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,

			// сразу же синхронизируются (добавляются поля там новые)
			synchronize: !IS_PRODUCTION,
			logging: !IS_PRODUCTION,
			entities: [Restaurant, User],
		}),
		RestaurantsModule,
		UsersModule,
		AuthorizationModule,
	],
})
export class AppModule {}
