import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, CreateUserOutput } from './dtos/create.dto';

@Resolver()
export class UserResolver {
	constructor(@Inject() private readonly userService: UserService) {}

	@Mutation(() => User)
	async create(
		@Args({ name: 'input' }) input: CreateUserDto,
	): Promise<CreateUserOutput> {
		try {
			const user = await this.userService.create(input);

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
