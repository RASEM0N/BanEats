import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserArgs, CreateUserOutput } from './dtos/users-create.dto';
import { User, USER_ROLE } from './entities/user.entity';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { GetUserArgs, GetUserOutput } from './dtos/users-get.dto';
import { UpdateUserArgs, UpdateUserOutput } from './dtos/users-update.dto';
import { VerifyEmailArgs } from './dtos/verify-email.dto';
import { UsersVerifyService } from './users-verify.service';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { AuthPublic } from '@/modules/authorization/decorators/auth-public.decorator';
import { EmptyOutput } from '@ubereats/common/dtos';
import { UsersMeOutput } from '@/modules/users/dtos/users-me.dto';

@Resolver()
export class UsersResolver {
	constructor(
		@Inject() private readonly userService: UsersService,
		@Inject() private readonly userVerifyService: UsersVerifyService,
	) {}

	@Query(() => UsersMeOutput, { name: 'usersMe' })
	me(@AuthUser() user: User): UsersMeOutput {
		return {
			isOk: true,
			data: {
				user,
			},
		};
	}

	@AuthRoles([USER_ROLE.admin])
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

	@AuthPublic()
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

	@Mutation(() => EmptyOutput, { name: 'usersVerifyEmail' })
	async verifyEmail(@Args() args: VerifyEmailArgs): Promise<EmptyOutput> {
		try {
			await this.userVerifyService.verifyEmail(args.code);
			return {
				isOk: true,
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
