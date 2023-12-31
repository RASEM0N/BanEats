import { Module } from '@nestjs/common';
import { AuthorizationService } from '@/modules/authorization/authorization.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/modules/authorization/guards/auth.guard';

@Module({
	providers: [
		AuthorizationService,

		// Глобальный декоратор
		// https://docs.nestjs.com/security/authentication#enable-authentication-globally
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AuthorizationModule {}
