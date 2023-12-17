import { ENV, IS_DEVELOPMENT, IS_PRODUCTION } from './constants/env';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import * as joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: IS_DEVELOPMENT ? '.env.dev' : '.env.prod',
			ignoreEnvFile: IS_PRODUCTION,
			validationSchema: joi.object({
				NODE_ENV: joi.string().valid(ENV.dev, ENV.prod, ENV.test).required(),
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
			synchronize: true,
			logging: true,
		}),
		RestaurantModule,
	],
})
export class AppModule {}
