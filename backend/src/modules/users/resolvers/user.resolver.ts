import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { CreateUserArgs, CreateUserOutput } from '../dto/user-create.dto';
import { User, USER_ROLE } from '../entities/user.entity';
import { AuthUser } from '@/modules/auth/decorators/auth-user.decorator';
import { GetUserArgs, GetUserOutput } from '../dto/user-get.dto';
import { UpdateUserArgs, UpdateUserOutput } from '../dto/user-update.dto';
import { VerifyEmailArgs } from '../dto/user-verify-email.dto';
import { UserVerifyService } from '../services/user-verify.service';
import { Roles } from '@/modules/auth/decorators/role.decorator';
import { UsersMeOutput } from '@/modules/users/dto/user-me.dto';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';
import { NoAuth } from '@/modules/auth/decorators/no-auth.decorator';

@Resolver()
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly userVerifyService: UserVerifyService,
	) {}

	@Roles('any')
	@Query(() => UsersMeOutput, { name: 'UserMe' })
	me(@AuthUser() user: User): UsersMeOutput {
		return { user };
	}

	@Roles('any')
	@Query(() => GetUserOutput, { name: 'UserGetOne' })
	async get(
		@AuthUser() autUser: User,
		@Args() { id }: GetUserArgs,
	): Promise<GetUserOutput> {
		if (autUser.role !== USER_ROLE.admin && autUser.id !== id) {
			throw new UberEastsException({ errorCode: UBER_EATS_ERROR.no_rights });
		}

		const user = await this.userService.get(id);
		return { user };
	}

	@NoAuth()
	@Mutation(() => CreateUserOutput, { name: 'UserCreate' })
	async create(@Args() args: CreateUserArgs): Promise<CreateUserOutput> {
		const user = await this.userService.create(args);
		return { user };
	}

	@Roles('any')
	@Mutation(() => UpdateUserOutput, { name: 'UserUpdate' })
	async update(
		@AuthUser() authUser: User,
		@Args() args: UpdateUserArgs,
	): Promise<UpdateUserOutput> {
		const user = await this.userService.update(authUser.id, args);
		return { user };
	}

	@Roles('any')
	@Mutation(() => Boolean, { name: 'UserVerifyEmail' })
	async verifyEmail(@Args() args: VerifyEmailArgs): Promise<boolean> {
		await this.userVerifyService.verifyEmail(args.code);
		return true;
	}
}
