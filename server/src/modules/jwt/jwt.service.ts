import { Inject, Injectable } from '@nestjs/common';
import { JwtConfig } from '@/modules/jwt/jwt.module';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
	constructor(@Inject('JWT_CONFIG') private readonly jwtConfig: JwtConfig) {}

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
