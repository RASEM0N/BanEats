import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.dto';
import { DefaultCRUD } from '@/shared/services/default-crud.service';

@Injectable()
export class UsersService implements DefaultCRUD<User> {
	constructor(@Inject() private readonly userRepository: Repository<User>) {}

	async create(dto: CreateUserDto): Promise<User> {}

	get(...args: any): Promise<User> | User {
		return undefined;
	}

	getAll(...args: any): User[] | Promise<User[]> {
		return undefined;
	}

	update(...args: any): Promise<User> | User {
		return undefined;
	}
}
