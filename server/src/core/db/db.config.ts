import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { IS_DEV, IS_PROD, IS_TEST } from '@/core/constants/env';
import { DB_OPTIONS } from '@/core/config/config.const';

const configDev = (
	configService: ConfigService,
	entities: BaseDataSourceOptions['entities'],
): Partial<DataSourceOptions> => {
	return {
		type: 'sqlite',
		database: configService.get<string>(DB_OPTIONS.database),
		synchronize: true,
		logging: true,
		entities,
	};
};

const configTest = (
	configService: ConfigService,
	entities: BaseDataSourceOptions['entities'],
): Partial<DataSourceOptions> => {
	return { ...configDev(configService, entities) };
};

const configProd = (
	configService: ConfigService,
	entities: BaseDataSourceOptions['entities'],
): Partial<DataSourceOptions> => {
	return {
		type: 'postgres',
		database: configService.get<string>(DB_OPTIONS.database),
		host: configService.get<string>(DB_OPTIONS.host),
		port: +configService.get<string>(DB_OPTIONS.port),
		username: configService.get<string>(DB_OPTIONS.username),
		password: configService.get<string>(DB_OPTIONS.password),
		synchronize: false,
		logging: false,
		entities,
	};
};

export const configDb = (
	configService: ConfigService,
	entities: BaseDataSourceOptions['entities'],
): Partial<DataSourceOptions> => {
	if (IS_PROD) {
		return configProd(configService, entities);
	}

	if (IS_TEST) {
		return configTest(configService, entities);
	}

	if (IS_DEV) {
		return configDev(configService, entities);
	}

	throw new Error('Unknown app environment. Specify NODE_ENV');
};
