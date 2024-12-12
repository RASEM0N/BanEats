import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '@/modules/users/users.service';
import { JwtService } from '@ubereats/jwt';

@Injectable()
export class UserMiddleware implements NestMiddleware {
	constructor(
		 private readonly userService: UsersService,
		 private readonly jwtService: JwtService,
	) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		const token = req.header('x-jwt');

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
