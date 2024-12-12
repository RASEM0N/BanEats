import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/authorization/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/modules/authorization/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { AuthResolver } from '@/modules/authorization/auth.resolver';
import { UserModule } from '@/modules/users/user.module';

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
