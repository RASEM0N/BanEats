import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { asyncProviders, providers } from './jwt.provider';
import { JwtModuleAsyncOptions } from './jwt.types';

export interface JwtConfig {
	secretKey: string;
	expires: string;
}

@Global()
@Module({})
export class JwtModule {
	static forRoot(config: JwtConfig): DynamicModule {
		return {
			module: JwtModule,
			providers: providers(config),
			exports: [JwtService],
		};
	}

	static forRootAsync(options: JwtModuleAsyncOptions): DynamicModule {
		return {
			module: JwtModule,
			imports: options.imports,
			providers: asyncProviders(options),
			exports: [JwtService],
		};
	}
}
