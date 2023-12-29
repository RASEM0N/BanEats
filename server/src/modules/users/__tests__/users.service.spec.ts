import { UsersService } from '../users.service';
import { mockRepository, testingModule, MockRepository } from './users.test-mock';
import { User } from '../entities/user.entity';
import { Verification } from '../entities/verification.entity';

describe('UsersService', () => {
	let service: UsersService;
	let userRepository: MockRepository<User>;
	let userVerifyRepository: MockRepository<Verification>;

	beforeAll(async () => {
		userRepository = mockRepository();
		userVerifyRepository = mockRepository();
		const module = await testingModule({
			userRepository,
			userVerifyRepository,
		});
		service = module.get(UsersService);
	});

	describe('get', () => {});
	describe('getAll', () => {});
	describe('create', () => {});
	describe('update', () => {});
});
