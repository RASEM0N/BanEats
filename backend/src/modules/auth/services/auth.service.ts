import { Inject, Injectable } from '@nestjs/common';
import { LoginArgs, LoginData } from '../dto/auth-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@ubereats/jwt';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly user: Repository<User>,
		@Inject(JwtService) private readonly jwtService: JwtService,
	) {}

	async login({ email, password }: LoginArgs): Promise<LoginData> {
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
			throw new UberEastsException({ errorCode: UBER_EATS_ERROR.fail_login });
		}

		const token = this.jwtService.sign(user.id);

		return {
			user,
			token,
		};
	}
}
