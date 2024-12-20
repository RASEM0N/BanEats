import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '@/modules/users/services/user.service';
import { JwtService } from '@ubereats/jwt';
import { BearerToken, SHARED_COMPONENTS } from '@/core/shared.module';

@Injectable()
export class UserMiddleware implements NestMiddleware {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		@Inject(SHARED_COMPONENTS.bearerToken) private readonly bearerToken: BearerToken,
	) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		const token = this.bearerToken.extractInitToken(req.header('authorization'));

		if (!token) {
			return next();
		}

		try {
			const verifyResult = this.jwtService.verify(token);
			const userId =
				typeof verifyResult === 'string' ? +verifyResult : +verifyResult?.id;

			if (!userId || isNaN(userId)) {
				return next();
			}

			const user = await this.userService.get(userId);

			if (!user) {
				return next();
			}

			req['user'] = user;
		} catch (e) {
			// @TODO какой-то логгер должен быть
			console.error(e);
		}

		next();
	}
}
