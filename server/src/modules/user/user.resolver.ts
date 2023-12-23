import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserOutput } from './dtos/create.dto';

@Resolver()
export class UserResolver {
	constructor(@Inject() private readonly userService: UserService) {}

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
