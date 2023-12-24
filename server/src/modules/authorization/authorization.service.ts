import { Injectable } from '@nestjs/common';
import { LoginData, LoginDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { getErrorWithDefault } from '@/shared/lib/custom-error';

@Injectable()
export class AuthorizationService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	async login({ email, password }: LoginDto): Promise<LoginData> {
		try {
			const user = await this.userRepository.findOne({
				where: {
					email,
				},
				select: [
					// @TODO возможно можно по другому бахнуть
					// я пока хз как
					'id',
					'email',
					'password',
					'role',
					'createdAt',
					'updatedAt',
					'isVerified',
				],
			});

			if (!user || !(await user.isValidPassword(password))) {
				throw new Error();
			}

			return {
				user,

				// тут пустышка пока что
				token: '',
			};
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Не удалось авторизоватся',
			});
		}
	}
}
