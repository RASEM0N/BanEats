export enum ENV {
	dev = 'development',
	prod = 'production',
	test = 'test',
}

export const IS_DEVELOPMENT = process.env.NODE_ENV === ENV.dev;
export const IS_PRODUCTION = process.env.NODE_ENV === ENV.prod;
