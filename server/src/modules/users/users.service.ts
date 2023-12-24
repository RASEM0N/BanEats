import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.dto';
import { DefaultCRUD } from '@/shared/services/default-crud.service';
import { CustomError, getErrorWithDefault } from '@/shared/lib/custom-error';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService implements DefaultCRUD<User> {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	async create({ email, role, password }: CreateUserDto): Promise<User> {
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

			const user = this.userRepository.create({
				email,
				role,
				password,
			});

			return await this.userRepository.save(user);
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: `Не удалось создать пользователя с email: ${email}`,
			});
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

	update(...args: any): Promise<User> | User {
		return undefined;
	}
}
