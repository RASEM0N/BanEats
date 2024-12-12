import { Inject, Injectable } from '@nestjs/common';
import { getErrorWithDefault } from '@ubereats/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { MailerService } from '@ubereats/mailer';
import { SendVerifyEmailArgs } from './dtos/user-verify-send-email.dto';
import { Repository } from 'typeorm';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class UserVerifyService {
	constructor(
		private readonly mailerService: MailerService,
		@InjectRepository(User) private readonly user: Repository<User>,
		@InjectRepository(Verification)
		private readonly verification: Repository<Verification>,
	) {}

	async createVerifyWithTransaction(
		user: User,
		queryRunner: QueryRunner,
	): Promise<Verification> {
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
		try {
			const verification = await this.verification.findOne({
				where: { code },
				relations: ['user'],
			});

			if (!verification) {
				throw new Error();
			}

			verification.user.isVerified = true;
			await this.user.save(verification.user);
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Ошибка подтверждения email',
			});
		}
	}

	async sendVerifyEmail({ email, code }: SendVerifyEmailArgs): Promise<void> {
		try {
			await this.mailerService.sendEmail({
				to: email,
				subject: '[Uber Eats] Код подтверждения',
				html: this.getVerifyHTML(code),
			});
		} catch (e) {
			// @TODO заменить на логгер
			console.error(e);
		}
	}

	private getVerifyHTML(code: string): string {
		// @TODO ссылка от балды
		const verifyLink = `https://uber-eats-clone.ru/verify/${code}`;
		return `
			<!doctype html>
			<html lang='en'>
				<head>
					<meta charset='UTF-8'>
					<meta name='viewport' content='width=device-width'>
					<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
					<title>Uber Eats Verify</title>
				</head>
				<body>
					Verify link for end registration a <b>${code}</b> or 
					go to <a href='${verifyLink}' target='_blank'>${verifyLink}</a>
				</body>
			</html>
		`;
	}
}
