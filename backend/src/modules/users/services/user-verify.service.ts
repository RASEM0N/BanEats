import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Verification } from '../entities/verification.entity';
import { MailerService } from '@baneats/mailer';
import { SendVerifyEmailArgs } from '../dto/user-verify-send-email.dto';
import { Repository } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { ConfigService } from '@nestjs/config';
import { USER_OPTIONS } from '@/core/config/config.const';

@Injectable()
export class UserVerifyService {
	constructor(
		@InjectRepository(User) private readonly user: Repository<User>,
		@InjectRepository(Verification)
		private readonly verification: Repository<Verification>,
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
	) {}

	async createVerifyWithTransaction(
		user: User,
		queryRunner: QueryRunner,
	): Promise<Verification> {
		const prevVerification = await this.verification.findOne({
			where: { user: { id: user.id } },
		});

		if (prevVerification) {
			await queryRunner.manager.remove(prevVerification);
		}

		const verification = await queryRunner.manager.save(
			this.verification.create({
				user,
			}),
		);

		// Отправляем электронное сообщение с подтверждением почты
		await this.sendVerifyEmail({
			email: user.email,
			code: verification.code,
		});

		return verification;
	}

	async verifyEmail(code: string): Promise<void> {
		const verification = await this.verification.findOne({
			where: { code },
			relations: ['user'],
		});

		if (!verification) {
			throw new Error();
		}

		verification.user.isVerified = true;
		await this.user.save(verification.user);
		await this.verification.delete(verification.id);
	}

	async sendVerifyEmail({ email, code }: SendVerifyEmailArgs): Promise<void> {
		try {
			await this.mailerService.sendEmail({
				to: email,
				subject: '[Ban Eats] Код подтверждения',
				html: this.getVerifyHTML(code),
			});
		} catch (e) {
			// @TODO заменить на логгер
			// console.error(e);
		}
	}

	private getVerifyHTML(code: string): string {
		const url = new URL(this.configService.get(USER_OPTIONS.verify_url));
		url.searchParams.set('code', code);

		return `
			<!doctype html>
			<html lang='en'>
				<head>
					<meta charset='UTF-8'>
					<meta name='viewport' content='width=device-width'>
					<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
					<title>Ban Eats Verify</title>
					<style></style>
				</head>
				<body>
					Verify link for end registration a <b>${code}</b> or 
					go to <a href='${url.href}' target='_blank'>${url.href}</a>
				</body>
			</html>
		`;
	}
}
