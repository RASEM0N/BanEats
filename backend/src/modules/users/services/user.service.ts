import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserArgs } from '../dto/user-create.dto';
import { DefaultCRUD } from '@ubereats/common/services';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserArgs } from '../dto/user-update.dto';
import { UserVerifyService } from './user-verify.service';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class UserService implements DefaultCRUD<User> {
	constructor(
		private readonly dataSource: DataSource,
		private readonly userVerifyService: UserVerifyService,
		@InjectRepository(User) private readonly user: Repository<User>,
	) {}

	async getOrCreate({ email, role, password }: CreateUserArgs): Promise<User> {
		/**
		 * Transaction
		 * @see https://docs.nestjs.com/techniques/database#typeorm-transactions
		 */
		let queryRunner: QueryRunner | undefined;
		try {
			const existUser = await this.user.findOne({
				where: { email },
			});

			if (existUser) {
				throw new UberEastsException({
					errorCode: UBER_EATS_ERROR.already_there,
					message: `There is already a user with this email address`,
				});
			}

			queryRunner = this.dataSource.createQueryRunner();
			await queryRunner.connect();
			await queryRunner.startTransaction();

			const user = await queryRunner.manager.save(
				this.user.create({
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
			throw e;
		} finally {
			// закрываем соединение наше с queryRunner
			await queryRunner?.release();
		}
	}

	async get(userId: number): Promise<User> {
		const user = await this.user.findOne({
			where: { id: userId },
		});

		if (!user) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_entity,
				message: `There is no user`,
			});
		}

		return user;
	}

	async getAll(): Promise<User[]> {
		return this.user.find();
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
			throw e;
		} finally {
			await queryRunner?.release();
		}
	}

	async delete(userId: number): Promise<void> {
		await this.user.delete(userId);
	}
}
