import { Provider } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerConfig, MailerModuleAsyncOptions } from './mailer.types';

export const MAILER_CONFIG = Symbol.for('MAILER_CONFIG');

export const providers = (config: MailerConfig): Provider[] => {
	return [
		MailerService,
		{
			provide: MAILER_CONFIG,
			useValue: config,
		},
	];
};

export const asyncProviders = ({
	inject,
	useFactory,
}: MailerModuleAsyncOptions): Provider[] => {
	return [
		MailerService,
		{
			provide: MAILER_CONFIG,
			inject,
			useFactory,
		},
	];
};
