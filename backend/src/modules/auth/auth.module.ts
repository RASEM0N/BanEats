import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { UserModule } from '@/modules/users/user.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([User])],
	providers: [
		AuthService,
		AuthResolver,

		// Глобальный декоратор
		// https://docs.nestjs.com/security/authentication#enable-authentication-globally
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AuthModule {}
