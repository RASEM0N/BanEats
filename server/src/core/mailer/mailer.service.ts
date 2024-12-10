import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailerTransport, MailerSendOptions, MailerConfig } from './mailer.types';
import { MAILER_CONFIG } from './mailer.provider';

@Injectable()
export class MailerService {
	private readonly transport: MailerTransport;

	constructor(@Inject(MAILER_CONFIG) private readonly mailerConfig: MailerConfig) {
		this.transport = createTransport({ ...mailerConfig });
	}

	async sendEmail(options: MailerSendOptions): Promise<void> {
		try {
			await this.transport.sendMail({ ...options });
		} catch (e) {
			// @TODO логгер нужен
			console.error(e);
		}
	}
}
