import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserOutput } from './dtos/create.dto';
import { User } from './entities/user.entity';
import { AuthorizationGuard } from '@/modules/authorization/authorization.guard';

@Resolver()
export class UsersResolver {
	constructor(@Inject() private readonly userService: UsersService) {}

	@Query(() => User, { name: 'usersMe' })
	@UseGuards(AuthorizationGuard)
	me(@Context() ctx): User {
		return ctx.user;
	}

	@Mutation(() => CreateUserOutput, { name: 'usersCreate' })
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
