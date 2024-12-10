export enum ENV {
	dev = 'dev',
	prod = 'prod',
	test = 'test',
}

export const IS_DEV = process.env.NODE_ENV === ENV.dev;
export const IS_PROD = process.env.NODE_ENV === ENV.prod;
export const IS_TEST = process.env.NODE_ENV === ENV.test;
