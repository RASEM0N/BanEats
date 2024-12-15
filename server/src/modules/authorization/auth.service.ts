import { Inject, Injectable } from '@nestjs/common';
import { LoginData, LoginArgs } from './dto/auth-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { getErrorWithDefault } from '@ubereats/common/error';
import { JwtService } from '@ubereats/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly user: Repository<User>,
		@Inject(JwtService) private readonly jwtService: JwtService,
	) {}

	async login({ email, password }: LoginArgs): Promise<LoginData> {
		try {
			const user = await this.user.findOne({
				where: {
					email,
				},
				select: [
					// @TODO возможно можно по другому бахнуть я пока хз как
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

			const token = this.jwtService.sign(user.id);

			return {
				user,
				token,
			};
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Не удалось авторизоватся',
			});
		}
	}
}
