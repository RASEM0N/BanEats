import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { IS_DEV, IS_PROD, IS_TEST } from '@/core/constants/env';
import { DB_OPTIONS } from '@/core/config/config.const';

const configShared = (
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
		entities,
	};
};

const configDev = (
	configService: ConfigService,
	entities: BaseDataSourceOptions['entities'],
): Partial<DataSourceOptions> => {
	return {
		...configShared(configService, entities),
		synchronize: true,
		logging: true,
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
		...configShared(configService, entities),
		synchronize: false,
		logging: false,
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
