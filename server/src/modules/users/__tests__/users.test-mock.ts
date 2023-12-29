import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailerService } from '@/modules/mailer/mailer.service';
import { UsersService } from '../users.service';
import { UsersVerifyService } from '../users-verify.service';
import { User } from '../entities/user.entity';
import { Verification } from '../entities/verification.entity';

export interface MockRepository<Entity> {
	findOne: jest.Mock<Promise<Entity>>;
	find: jest.Mock<Promise<Entity[]>>;
	save: jest.Mock<Promise<Entity>>;
	create: jest.Mock<Entity>;
}

export interface TestingModuleParams {
	userRepository: MockRepository<User>;
	userVerifyRepository: MockRepository<Verification>;
}

export const mockRepository = <T>(): MockRepository<T> => {
	return {
		findOne: jest.fn(),
		find: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
	};
};

export const testingModule = async ({
	userRepository,
	userVerifyRepository,
}: TestingModuleParams): Promise<TestingModule> => {
	return await Test.createTestingModule({
		imports: [MailerService],
		providers: [
			UsersService,
			UsersVerifyService,
			{
				provide: getRepositoryToken(User),
				useValue: userRepository,
			},
			{
				provide: getRepositoryToken(Verification),
				useValue: userVerifyRepository,
			},
		],
	}).compile();
};
