import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

export interface JwtConfig {
	secretKey: string;
	expires: string;
}

// засчет этого не надо будет imports делать
// для каждого использования JwtService
@Module({})
export class JwtModule {
	static forRoot(config: JwtConfig): DynamicModule {
		return {
			module: JwtModule,
			providers: [
				JwtService,
				{
					provide: 'JWT_CONFIG',
					useValue: { ...config },
				},
			],
			exports: [JwtService],
		};
	}
}
