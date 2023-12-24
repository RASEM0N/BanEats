import { DynamicModule, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerConfig } from './mailer.types';

@Module({})
export class MailerModule {
	static forRoot(config: MailerConfig): DynamicModule {
		return {
			module: MailerModule,
			providers: [
				MailerService,
				{
					provide: 'MAILER_CONFIG',
					useValue: { ...config },
				},
			],
			exports: [MailerService],
		};
	}
}
