import { Provider } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtConfig } from './jwt.module';
import { JwtModuleAsyncOptions } from './jwt.types';

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
