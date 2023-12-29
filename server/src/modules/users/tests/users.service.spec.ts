import { UsersService } from '../users.service';
import { UsersVerifyService } from '../users-verify.service';
import { testingModule } from './lib/mock-module';
import { User } from '../entities/user.entity';
import { MockRepository } from '@/shared/lib/tests/mock-repository';
import { createMockUserData } from '@/modules/users/tests/lib/mock-user-entity';
import { CustomError } from '@/shared/lib/custom-error';
import { MockDataSource } from '@/shared/lib/tests/mock-data-source';
import { MockComponent } from '@/shared/lib/tests/mock-component';

describe('UsersService', () => {
	let usersService: UsersService;
	let usersVerifyService: MockComponent<UsersVerifyService>;
	let usersRepository: MockRepository<User>;
	let dataSource: MockDataSource;

	beforeAll(async () => {
		const components = await testingModule({
			usersVerifyService: {
				createVerifyWithTransaction: jest.fn(),
			},
		});

		dataSource = components.dataSource;
		usersRepository = components.userRepository;
		usersService = components.userService as UsersService;
		usersVerifyService =
			components.usersVerifyService as MockComponent<UsersVerifyService>;
	});

	describe('get', () => {
		it('Пользователь уже есть - возвращаем', async () => {
			const mockUser = createMockUserData();
			usersRepository.findOne.mockResolvedValue(mockUser);
			const user = await usersService.get(mockUser.id);
			expect(user).toEqual(mockUser);
		});

		it('Пользователя нет - ошибка', async () => {
			try {
				await usersService.get(1);
			} catch (e) {
				expect(e).toBeInstanceOf(CustomError);
				expect(e.errorCode).toBe(400);
			}
		});
	});

	describe('getAll', () => {
		it('Пользователи есть - возвращаем массив их', async () => {
			const mockUsers = [
				createMockUserData({
					id: 1,
					email: 'abama1@mail.ru',
				}),
				createMockUserData({
					id: 2,
					email: 'abama2@mail.ru',
				}),
			];
			usersRepository.find.mockResolvedValue(mockUsers);
			const users = await usersService.getAll();
			expect(users).toEqual(mockUsers);
		});

		it('Пользователей нет - возвращаем пустой массив', async () => {
			const users = await usersService.getAll();
			expect(users).toMatchObject(users);
		});
	});

	describe('create', () => {
		it('Пользователя нету - вернули пользователя', async () => {
			const mockUser = createMockUserData();
			const mockQueryRunner = dataSource._mockQueryRunner;
			const { createVerifyWithTransaction } = usersVerifyService;

			usersRepository.findOne.mockResolvedValue(null);
			usersRepository.create.mockResolvedValue(mockUser);

			const createdUser = await usersService.create({
				email: mockUser.email,
				role: mockUser.role,
				password: mockUser.password,
			});

			// проверим что пользователь нормальный создался
			expect(createdUser).toBe(mockUser);

			// проверяем открытие и закрытие Transaction
			expect(dataSource.createQueryRunner).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.connect).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.startTransaction).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.commitTransaction).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalledTimes(0);
			expect(mockQueryRunner.release).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(1);

			// проверим сохранение в БД пользователя
			expect(mockQueryRunner.manager.save).toHaveBeenNthCalledWith(1, mockUser);
			expect(mockQueryRunner.manager.save).nthReturnedWith(1, mockUser);

			// проверим создание Подтвержедния
			expect(createVerifyWithTransaction).toHaveBeenCalledTimes(1);
			expect(createVerifyWithTransaction).toHaveBeenNthCalledWith(
				1,
				mockUser,
				mockQueryRunner,
			);
		});

		it('Пользователя нету, упало создание подтверждения - ошибка', async () => {
			const mockUser = createMockUserData();
			const mockQueryRunner = dataSource._mockQueryRunner;
			const { createVerifyWithTransaction } = usersVerifyService;

			usersRepository.findOne.mockResolvedValue(null);
			usersRepository.create.mockResolvedValue(mockUser);
			usersVerifyService.createVerifyWithTransaction.mockImplementation(() => {
				throw new Error();
			});

			try {
				await usersService.create({
					email: mockUser.email,
					role: mockUser.role,
					password: mockUser.password,
				});
			} catch (e) {
				expect(e).toBeInstanceOf(CustomError);
				expect(e.errorCode).toBe(400);
			}

			// проверяем открытие и закрытие Transaction
			expect(dataSource.createQueryRunner).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.connect).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.startTransaction).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.commitTransaction).toHaveBeenCalledTimes(0);
			expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.release).toHaveBeenCalledTimes(1);
			expect(mockQueryRunner.manager.save).toHaveBeenCalledTimes(1);

			// проверим создание Подтвержедния
			expect(createVerifyWithTransaction).toHaveBeenCalledTimes(1);
			expect(createVerifyWithTransaction).toHaveBeenNthCalledWith(
				1,
				mockUser,
				mockQueryRunner,
			);
		});

		it('Пользователь уже есть - ошибка', async () => {
			const mockUser = createMockUserData();
			usersRepository.findOne.mockResolvedValue(mockUser);
			usersRepository.create.mockResolvedValue(mockUser);

			try {
				await usersService.create({
					email: mockUser.email,
					role: mockUser.role,
					password: mockUser.password,
				});
			} catch (e) {
				expect(usersRepository.create).not.toHaveBeenCalled();
				expect(usersRepository.createQueryBuilder).not.toHaveBeenCalled();
				expect(
					usersVerifyService.createVerifyWithTransaction,
				).not.toHaveBeenCalled();

				expect(e).toThrow(CustomError);
				expect(e.errorCode).toBe(400);
			}
		});
	});

	describe('update', () => {});
});
