import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserArgs, CreateUserOutput } from './dtos/create.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@/modules/authorization/guards/auth.guard';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { GetUserArgs, GetUserOutput } from './dtos/get.dto';
import { UpdateUserArgs, UpdateUserOutput } from './dtos/update.dto';
import { VerifyEmailArgs, VerifyEmailOutput } from './dtos/verify-email.dto';
import { UsersVerifyService } from './users-verify.service';

@Resolver()
export class UsersResolver {
	constructor(
		@Inject() private readonly userService: UsersService,
		@Inject() private readonly userVerifyService: UsersVerifyService,
	) {}

	@Query(() => User, { name: 'usersMe' })
	@UseGuards(AuthGuard)
	me(@AuthUser() user: User): User {
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

	@Mutation(() => UpdateUserOutput, { name: 'usersUpdate' })
	@UseGuards(AuthGuard)
	async update(
		@AuthUser() user: User,
		@Args() args: UpdateUserArgs,
	): Promise<UpdateUserOutput> {
		try {
			const updatedUser = await this.userService.update(user.id, args);

			return {
				isOk: true,
				data: {
					user: updatedUser,
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

	@Mutation(() => VerifyEmailOutput, { name: 'usersVerifyEmail' })
	async verifyEmail(@Args() args: VerifyEmailArgs): Promise<VerifyEmailOutput> {
		try {
			await this.userVerifyService.verifyEmail(args.code);
			return {
				isOk: true,
				data: {},
			};
		} catch (e) {
			return {
				isOk: false,
				errorCode: e.errorCode,
				message: e.message,
			};
		}
	}
}
