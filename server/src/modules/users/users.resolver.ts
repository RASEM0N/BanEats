import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserOutput } from './dtos/create.dto';
import { LoginDto, LoginOutput } from '@/modules/authorization/dtos/login.dto';

@Resolver()
export class UsersResolver {
	constructor(@Inject() private readonly userService: UsersService) {}

	@Mutation(() => CreateUserOutput)
	async create(@Args() dto: CreateUserDto): Promise<CreateUserOutput> {
		try {
			const user = await this.userService.create(dto);

			return {
				isOk: true,
				data: {
					user,
				},
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}
}
