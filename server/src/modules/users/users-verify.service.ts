import { Inject, Injectable } from '@nestjs/common';
import { getErrorWithDefault } from '@/shared/lib/custom-error';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Verification } from '@/modules/users/entities/verification.entity';
import { MailerService } from '@/modules/mailer/mailer.service';
import { SendVerifyEmailDto } from '@/modules/users/dtos/send-verify-email.dto';

@Injectable()
export class UsersVerifyService {
	constructor(
		@Inject() private readonly mailerService: MailerService,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Verification)
		private readonly verificationRepository: Repository<Verification>,
	) {}

	async verifyEmail(code: string): Promise<void> {
		try {
			const verification = await this.verificationRepository.findOne({
				where: { code },
				relations: ['user'],
			});

			if (!verification) {
				throw new Error();
			}

			verification.user.isVerified = true;
			await this.userRepository.save(verification.user);
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Ошибка подтверждения email',
			});
		}
	}

	async sendVerifyEmail({ email, code }: SendVerifyEmailDto): Promise<void> {
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
