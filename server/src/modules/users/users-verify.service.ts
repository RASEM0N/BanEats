import { Injectable } from '@nestjs/common';
import { getErrorWithDefault } from '@/shared/lib/custom-error';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Verification } from '@/modules/users/entities/verification.entity';

@Injectable()
export class UsersVerifyService {
	constructor(
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
}
