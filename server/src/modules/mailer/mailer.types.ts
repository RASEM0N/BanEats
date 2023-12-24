import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type MailerConfig = SMTPTransport.Options;
export type MailerSendOptions = Mail.Options;
export type MailerTransport = ReturnType<typeof createTransport>;
