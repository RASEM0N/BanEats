import { Inject, Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { JwtConfig } from './jwt.module';
import { JWT_CONFIG } from './jwt.provider';

@Injectable()
export class JwtService {
	constructor(@Inject(JWT_CONFIG) private readonly jwtConfig: JwtConfig) {}

	sign(id: any): string {
		return sign(
			{
				id,
			},
			this.jwtConfig.secretKey,
			{
				expiresIn: this.jwtConfig.expires,
			},
		);
	}

	verify(token: string): string | JwtPayload {
		return verify(token, this.jwtConfig.secretKey);
	}
}
