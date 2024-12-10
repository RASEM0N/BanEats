import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { asyncProviders, providers } from './mailer.provider';
import { MailerConfig, MailerModuleAsyncOptions } from './mailer.types';

@Global()
@Module({})
export class MailerModule {
	static forRoot(config: MailerConfig): DynamicModule {
		return {
			module: MailerModule,
			providers: providers(config),
			exports: [MailerService],
		};
	}

	static forRootAsync(options: MailerModuleAsyncOptions): DynamicModule {
		return {
			module: MailerModule,
			imports: options.imports,
			providers: asyncProviders(options),
			exports: [MailerService],
		};
	}
}
