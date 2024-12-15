import { UserService } from '../services/user.service';
import { UserVerifyService } from '../services/user-verify.service';
import { testingModule } from './lib/mock-module';
import { User } from '../entities/user.entity';
import { MockRepository, MockDataSource, MockComponent } from '@ubereats/test';
import {
	createMockUserData,
	MockUserData,
} from '@/modules/users/tests/lib/mock-user-entity';
import { UberEastsError } from '@ubereats/common/error';

describe('UserService', () => {
	let usersService: UserService;
	let usersVerifyService: MockComponent<UserVerifyService>;
	let usersRepository: MockRepository<User>;
	let dataSource: MockDataSource;

	const checkTransactionSaveUser = async (
		user: Partial<MockUserData>,
		{
			commitTransactionCalledTimes,
			rollbackTransactionCalledTimes,
			managerSaveUserCalledTimes,
			createVerifyCalledTimes,
		},
	) => {
		const mockQueryRunner = dataSource._mockQueryRunner;
		const { createVerifyWithTransaction } = usersVerifyService;

		// проверяем открытие и закрытие Transaction
		expect(dataSource.createQueryRunner).toHaveBeenCalledTimes(1);
		expect(mockQueryRunner.connect).toHaveBeenCalledTimes(1);
		expect(mockQueryRunner.startTransaction).toHaveBeenCalledTimes(1);
		expect(mockQueryRunner.release).toHaveBeenCalledTimes(1);

		expect(mockQueryRunner.commitTransaction).toHaveBeenCalledTimes(
			commitTransactionCalledTimes,
		);
		expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalledTimes(
			rollbackTransactionCalledTimes,
		);

		if (managerSaveUserCalledTimes) {
			expect(mockQueryRunner.manager.save).toHaveBeenNthCalledWith(
				managerSaveUserCalledTimes,
				user,
			);
			expect(mockQueryRunner.manager.save).nthReturnedWith(
				managerSaveUserCalledTimes,
				user,
			);
		} else {
			expect(mockQueryRunner.manager.save).not.toHaveBeenCalled();
		}

		if (createVerifyCalledTimes) {
			expect(createVerifyWithTransaction).toHaveBeenCalledTimes(
				createVerifyCalledTimes,
			);
			expect(createVerifyWithTransaction).toHaveBeenNthCalledWith(
				createVerifyCalledTimes,
				user,
				mockQueryRunner,
			);
		} else {
			expect(createVerifyWithTransaction).not.toHaveBeenCalled();
		}
	};

	beforeAll(async () => {
		const components = await testingModule({
			usersVerifyService: {
				createVerifyWithTransaction: jest.fn(),
			},
		});

		dataSource = components.dataSource;
		usersRepository = components.userRepository;
		usersService = components.userService as UserService;
		usersVerifyService =
			components.usersVerifyService as MockComponent<UserVerifyService>;
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
				expect(e).toBeInstanceOf(UberEastsError);
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

			usersRepository.findOne.mockResolvedValue(undefined);
			usersRepository.create.mockResolvedValue(mockUser);

			const createdUser = await usersService.create({
				email: mockUser.email,
				role: mockUser.role,
				password: mockUser.password,
			});

			// проверим что пользователь нормальный создался
			expect(createdUser).toBe(mockUser);

			// проверим создание пользователя
			await checkTransactionSaveUser(mockUser, {
				rollbackTransactionCalledTimes: 0,
				commitTransactionCalledTimes: 1,
				managerSaveUserCalledTimes: 1,
				createVerifyCalledTimes: 1,
			});
		});

		it('Пользователя нету, упало создание подтверждения - ошибка', async () => {
			const mockUser = createMockUserData();

			usersRepository.findOne.mockResolvedValue(undefined);
			usersRepository.create.mockResolvedValue(mockUser);
			usersVerifyService.createVerifyWithTransaction.mockRejectedValue(new Error());

			try {
				await usersService.create({
					email: mockUser.email,
					role: mockUser.role,
					password: mockUser.password,
				});
			} catch (e) {
				expect(e).toBeInstanceOf(UberEastsError);
				expect(e.errorCode).toBe(400);
			}

			// проверим создание пользователя
			await checkTransactionSaveUser(mockUser, {
				rollbackTransactionCalledTimes: 1,
				commitTransactionCalledTimes: 0,
				managerSaveUserCalledTimes: 1,
				createVerifyCalledTimes: 0,
			});
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

				expect(e).toThrow(UberEastsError);
				expect(e.errorCode).toBe(400);
			}
		});
	});

	describe('update', () => {
		it('При обновление почты', async () => {
			const mockUser = createMockUserData({ isVerified: true });
			const updateData = {
				email: 'space@mail.ru',
				password: '12345678',
			};
			usersRepository.findOne.mockResolvedValue(mockUser);
			const updatedUser = await usersService.update(mockUser.id, updateData);

			expect(updatedUser).toMatchObject({
				...mockUser,
				...updateData,
				isVerified: false,
			});

			// проверим создание пользователя
			await checkTransactionSaveUser(mockUser, {
				rollbackTransactionCalledTimes: 0,
				commitTransactionCalledTimes: 1,
				managerSaveUserCalledTimes: 1,
				createVerifyCalledTimes: 1,
			});
		});

		it('При обновления только пароля', async () => {
			const mockUser = createMockUserData({ isVerified: true });
			const updateData = {
				email: mockUser.email,
				password: '12345678',
			};
			usersRepository.findOne.mockResolvedValue(mockUser);
			const updatedUser = await usersService.update(mockUser.id, updateData);

			expect(updatedUser).toMatchObject({
				...mockUser,
				...updateData,
				isVerified: true,
			});

			// проверим создание пользователя
			await checkTransactionSaveUser(mockUser, {
				rollbackTransactionCalledTimes: 0,
				createVerifyCalledTimes: 0,
				commitTransactionCalledTimes: 1,
				managerSaveUserCalledTimes: 1,
			});
		});

		it('Упала ошибка на создание подтверждения - ошибка', async () => {
			const mockUser = createMockUserData();
			const updateData = {
				email: 'space@mail.ru',
				password: '12345678',
			};

			usersRepository.findOne.mockResolvedValue(mockUser);
			usersVerifyService.createVerifyWithTransaction.mockRejectedValue(new Error());

			try {
				await usersService.update(mockUser.id, updateData);
			} catch (e) {
				expect(e).toBeInstanceOf(UberEastsError);
				expect(e.errorCode).toBe(400);
			}

			// проверим создание пользователя
			await checkTransactionSaveUser(mockUser, {
				rollbackTransactionCalledTimes: 1,
				managerSaveUserCalledTimes: 1,
				commitTransactionCalledTimes: 0,
				createVerifyCalledTimes: 0,
			});
		});

		it('Попытались обновить пользователя, которого нет - ошибка', async () => {
			const mockUser = createMockUserData();
			usersRepository.findOne.mockResolvedValue(undefined);

			try {
				await usersService.update(mockUser.id, {
					email: 'newEmail@mail.ru',
					password: '1234568910',
				});
			} catch (e) {
				expect(e).toThrow(UberEastsError);
				expect(e.errorCode).toBe(400);
			}

			expect(dataSource.createQueryRunner).not.toHaveBeenCalled();
			expect(dataSource._mockQueryRunner.manager.save).not.toHaveBeenCalled();
			expect(usersVerifyService.createVerifyWithTransaction).not.toHaveBeenCalled();
		});
	});
});
