import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserArgs } from './dtos/create.dto';
import { DefaultCRUD } from '@/shared/services/default-crud.service';
import { CustomError, getErrorWithDefault } from '@/shared/lib/custom-error';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserArgs } from './dtos/update.dto';
import { Verification } from './entities/verification.entity';
import { UsersVerifyService } from './users-verify.service';

@Injectable()
export class UsersService implements DefaultCRUD<User> {
	constructor(
		@Inject() private readonly dataSource: DataSource,
		@Inject() private readonly userVerifyService: UsersVerifyService,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Verification)
		private readonly verificationRepository: Repository<Verification>,
	) {}

	async create({ email, role, password }: CreateUserArgs): Promise<User> {
		/**
		 * Transaction
		 * @see https://docs.nestjs.com/techniques/database#typeorm-transactions
		 */
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

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

			const user = await queryRunner.manager.save(
				this.userRepository.create({
					email,
					role,
					password,
				}),
			);

			const verification = await queryRunner.manager.save(
				this.verificationRepository.create({
					user,
				}),
			);

			// Отправляем электронное сообщение с подтверждением почты
			await this.userVerifyService.sendVerifyEmail({
				email: user.email,
				code: verification.code,
			});

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

	async update(userId: number, newInfo: UpdateUserArgs): Promise<User> {
		try {
			await this.userRepository.update(
				{
					id: userId,
				},
				{
					...newInfo,
				},
			);

			return this.get(userId);
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: `Ошибка обновления пользователя с userId: ${userId}`,
			});
		}
	}
}
