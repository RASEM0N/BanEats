import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserVerifyService } from './services/user-verify.service';
import { UserMiddleware } from './middlewares/user.middleware';

@Module({
	imports: [TypeOrmModule.forFeature([User, Verification])],
	providers: [UserResolver, UserService, UserVerifyService, UserMiddleware],
	exports: [UserService, UserMiddleware],
})
export class UserModule {}
