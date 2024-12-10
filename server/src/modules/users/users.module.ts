import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersVerifyService } from './users-verify.service';
import { MailerService } from '@/core/mailer/mailer.service';
import { DataSource } from 'typeorm';
import { UserMiddleware } from './middlewares/user.middleware';

@Module({
	imports: [TypeOrmModule.forFeature([User, Verification]), MailerService, DataSource],
	providers: [UsersResolver, UsersService, UsersVerifyService],
	exports: [UserMiddleware],
})
export class UsersModule {}
