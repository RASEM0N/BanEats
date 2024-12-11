import joi from 'joi';
import {
	APP_OPTIONS,
	DB_OPTIONS,
	JWT_OPTIONS,
	MAILER_OPTIONS,
} from '@/core/config/config.const';
import { IS_DEV, IS_PROD, IS_TEST } from '@/core/constants/env';

const configShared = {
	[APP_OPTIONS.port]: joi.number().required(),
	[DB_OPTIONS.name]: joi.number().required(),
	[JWT_OPTIONS.secret_key]: joi.string().required(),
	[JWT_OPTIONS.expires]: joi.string().required(),
};

const configDev = {
	...configShared,
};

const configTest = {
	...configShared,
};

const configProd = {
	...configShared,
	[DB_OPTIONS.host]: joi.string().required(),
	[DB_OPTIONS.port]: joi.string().required(),
	[DB_OPTIONS.username]: joi.string().required(),
	[DB_OPTIONS.password]: joi.string().required(),

	[MAILER_OPTIONS.service]: joi.string().required(),
	[MAILER_OPTIONS.email]: joi.string().email().required(),
	[MAILER_OPTIONS.password]: joi.string().required(),
};

export const configSchema = () =>
	joi.object(
		(() => {
			if (IS_PROD) {
				return configProd;
			}

			if (IS_DEV) {
				return configDev;
			}

			if (IS_TEST) {
				return configTest;
			}

			return configShared;
		})(),
	);
