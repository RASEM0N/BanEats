import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { ModuleMetadata } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type MailerConfig = SMTPTransport.Options;
export type MailerSendOptions = Mail.Options;
export type MailerTransport = ReturnType<typeof createTransport>;

export interface MailerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	inject?: any[];
	useFactory?: (...args: any[]) => Promise<MailerConfig> | MailerConfig;
}
