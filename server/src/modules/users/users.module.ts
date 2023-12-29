import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersVerifyService } from './users-verify.service';
import { MailerService } from '@/modules/mailer/mailer.service';
import { DataSource } from 'typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([User, Verification]), MailerService, DataSource],
	providers: [UsersResolver, UsersService, UsersVerifyService],
})
export class UsersModule {}
