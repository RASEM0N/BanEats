import { Provider } from '@nestjs/common';
import { JwtService } from '@/core/jwt/jwt.service';
import { JwtConfig } from '@/core/jwt/jwt.module';
import { JwtModuleAsyncOptions } from '@/core/jwt/jwt.types';

export const JWT_CONFIG = Symbol.for('JWT_CONFIG');

export const providers = (config: JwtConfig): Provider[] => {
	return [
		JwtService,
		{
			provide: JWT_CONFIG,
			useValue: config,
		},
	];
};

export const asyncProviders = ({
	inject,
	useFactory,
}: JwtModuleAsyncOptions): Provider[] => {
	return [
		JwtService,
		{
			provide: JWT_CONFIG,
			useFactory,
		},
	];
};
