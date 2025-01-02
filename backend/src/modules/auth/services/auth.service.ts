import { Inject, Injectable } from '@nestjs/common';
import { LoginArgs, LoginOutput } from '../dto/auth-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@baneats/jwt';
import { BAN_EATS_ERROR, BanEastsException } from '@baneats/common/error';
import { BearerToken, SHARED_COMPONENTS } from '@/core/shared.module';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly user: Repository<User>,
		@Inject(JwtService) private readonly jwtService: JwtService,
		@Inject(SHARED_COMPONENTS.bearerToken) private readonly bearerToken: BearerToken,
	) {}

	async login({ email, password }: LoginArgs): Promise<LoginOutput> {
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
			throw new BanEastsException({ errorCode: BAN_EATS_ERROR.fail_login });
		}

		const token = this.jwtService.sign(user.id);

		return {
			user,
			token,
		};
	}
}
