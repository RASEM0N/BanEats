import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserArgs, CreateUserOutput } from './dtos/user-create.dto';
import { User, USER_ROLE } from './entities/user.entity';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { GetUserArgs, GetUserOutput } from './dtos/user-get.dto';
import { UpdateUserArgs, UpdateUserOutput } from './dtos/user-update.dto';
import { VerifyEmailArgs } from './dtos/user-verify-email.dto';
import { UserVerifyService } from './user-verify.service';
import { Roles } from '@/modules/authorization/decorators/role.decorator';
import { AuthPublic } from '@/modules/authorization/decorators/auth-public.decorator';
import { CoreOutputWithoutData } from '@ubereats/common/dtos';
import { UsersMeOutput } from '@/modules/users/dtos/user-me.dto';

@Resolver()
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly userVerifyService: UserVerifyService,
	) {}

	@Query(() => UsersMeOutput, { name: 'UserMe' })
	me(@AuthUser() user: User): UsersMeOutput {
		return { data: { user } };
	}

	@Roles([USER_ROLE.admin])
	@Query(() => GetUserOutput, { name: 'UserGetOne' })
	async get(@Args() { id }: GetUserArgs): Promise<GetUserOutput> {
		const user = await this.userService.get(id);
		return { data: { user } };
	}

	@AuthPublic()
	@Mutation(() => CreateUserOutput, { name: 'UserCreate' })
	async create(@Args() args: CreateUserArgs): Promise<CreateUserOutput> {
		const user = await this.userService.create(args);
		return { data: { user } };
	}

	@Mutation(() => UpdateUserOutput, { name: 'UserUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() args: UpdateUserArgs,
	): Promise<UpdateUserOutput> {
		const updatedUser = await this.userService.update(user.id, args);
		return { data: { user: updatedUser } };
	}

	@Mutation(() => CoreOutputWithoutData, { name: 'UserVerifyEmail' })
	async verifyEmail(@Args() args: VerifyEmailArgs): Promise<CoreOutputWithoutData> {
		await this.userVerifyService.verifyEmail(args.code);
		return {};
	}
}
