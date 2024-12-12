import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailerService } from '@ubereats/mailer';
import { UserService } from '../../user.service';
import { UserVerifyService } from '../../user-verify.service';
import { User } from '../../entities/user.entity';
import { Verification } from '../../entities/verification.entity';
import { createMockRepository } from '@ubereats/test/mock-repository';
import { DataSource } from 'typeorm';
import { createMockDataSource, MockDataSource, MockComponent } from '@ubereats/test';

export interface TestingModuleParams {
	usersService?: MockComponent<UserService>;
	usersVerifyService?: MockComponent<UserVerifyService>;
}

export const testingModule = async ({
	usersService,
	usersVerifyService,
}: TestingModuleParams) => {
	const module = await Test.createTestingModule({
		providers: [
			{
				provide: UserService,
				useValue: usersService ?? UserService,
			},
			{
				provide: UserVerifyService,
				useValue: usersVerifyService ?? UserVerifyService,
			},
			{
				provide: getRepositoryToken(User),
				useValue: createMockRepository(),
			},
			{
				provide: getRepositoryToken(Verification),
				useValue: createMockRepository(),
			},
			{
				provide: MailerService,
				useValue: {
					sendEmail: jest.fn(),
				},
			},
			{
				provide: DataSource,
				useValue: createMockDataSource(),
			},
		],
	}).compile();

	return {
		userService: module.get<UserService | MockComponent<UserService>>(UserService),
		usersVerifyService: module.get<
			UserVerifyService | MockComponent<UserVerifyService>
		>(UserVerifyService),
		userRepository: module.get(getRepositoryToken(User)),
		userVerifyRepository: module.get(getRepositoryToken(Verification)),
		mailerService: module.get(MailerService),
		dataSource: module.get<MockDataSource>(DataSource),
	};
};
