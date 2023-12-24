import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserArgs, CreateUserOutput } from './dtos/create.dto';
import { User } from './entities/user.entity';
import { AuthorizationGuard } from '@/modules/authorization/authorization.guard';
import { AuthUserDecorator } from '@/modules/authorization/authorization-user.decorator';
import { GetUserArgs, GetUserOutput } from '@/modules/users/dtos/get.dto';

@Resolver()
export class UsersResolver {
	constructor(@Inject() private readonly userService: UsersService) {}

	@Query(() => User, { name: 'usersMe' })
	@UseGuards(AuthorizationGuard)
	me(@AuthUserDecorator() user: User): User {
		return user;
	}

	@Query(() => GetUserOutput, { name: 'usersGetOne' })
	async get(@Args() { id }: GetUserArgs): Promise<GetUserOutput> {
		try {
			const user = await this.userService.get(id);

			return {
				isOk: true,
				data: {
					user,
				},
			};
		} catch (e) {
			return {
				isOk: false,
				errorCode: e.errorCode,
				message: e.message,
			};
		}
	}

	@Mutation(() => CreateUserOutput, { name: 'usersCreate' })
	async create(@Args() args: CreateUserArgs): Promise<CreateUserOutput> {
		try {
			const user = await this.userService.create(args);

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
