import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserArgs } from './dtos/users-create.dto';
import { DefaultCRUD } from '@ubereats/common/services';
import { CustomError, getErrorWithDefault } from '@ubereats/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserArgs } from './dtos/users-update.dto';
import { UsersVerifyService } from './users-verify.service';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class UsersService implements DefaultCRUD<User> {
	constructor(
		@Inject() private readonly dataSource: DataSource,
		@Inject() private readonly userVerifyService: UsersVerifyService,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	async create({ email, role, password }: CreateUserArgs): Promise<User> {
		/**
		 * Transaction
		 * @see https://docs.nestjs.com/techniques/database#typeorm-transactions
		 */
		let queryRunner: QueryRunner | undefined;
		try {
			const existUser = await this.userRepository.findOne({
				where: { email },
			});

			if (existUser) {
				throw new CustomError({
					errorCode: 400,
					message: `Пользователь с email: ${email} уже есть`,
				});
			}

			queryRunner = this.dataSource.createQueryRunner();
			await queryRunner.connect();
			await queryRunner.startTransaction();

			const user = await queryRunner.manager.save(
				this.userRepository.create({
					email,
					role,
					password,
				}),
			);

			await this.userVerifyService.createVerifyWithTransaction(user, queryRunner);

			await queryRunner.commitTransaction();
			return user;
		} catch (e) {
			// откатываем обратно наши операции с БД
			await queryRunner?.rollbackTransaction();
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: `Не удалось создать пользователя с email: ${email}`,
			});
		} finally {
			// закрываем соединение наше с queryRunner
			await queryRunner?.release();
		}
	}

	async get(userId: number): Promise<User> {
		try {
			const user = await this.userRepository.findOne({
				where: { id: userId },
			});

			if (!user) {
				throw new CustomError({
					errorCode: 400,
					message: `Пользователя с userId: ${userId} не существует`,
				});
			}

			return user;
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: `Ошибка нахождения пользователя с userId: ${userId}`,
			});
		}
	}

	async getAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async update(userId: number, { email, password }: UpdateUserArgs): Promise<User> {
		let queryRunner: QueryRunner | undefined;
		try {
			const user = await this.get(userId);
			const isChangedEmail = email && user.email !== email;

			if (isChangedEmail) {
				user.email = email;
				user.isVerified = false;
			}

			if (password) {
				user.password = password;
			}

			queryRunner = this.dataSource.createQueryRunner();
			await queryRunner.connect();
			await queryRunner.startTransaction();

			const updatedUser = await queryRunner.manager.save(user);
			if (isChangedEmail) {
				await this.userVerifyService.createVerifyWithTransaction(
					updatedUser,
					queryRunner,
				);
			}

			await queryRunner.commitTransaction();

			return updatedUser;
		} catch (e) {
			await queryRunner?.rollbackTransaction();
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: `Ошибка обновления пользователя с userId: ${userId}`,
			});
		} finally {
			await queryRunner?.release();
		}
	}

	async delete(userId: number): Promise<void> {
		try {
			await this.userRepository.delete(userId);
		} catch (e) {
			throw new CustomError({
				errorCode: 400,
				message: 'Не удалось удалить пользователя',
			});
		}
	}
}
