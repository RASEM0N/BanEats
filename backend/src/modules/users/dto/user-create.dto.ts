import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class CreateUserArgs extends PickType(
	User,
	['email', 'password', 'role'],
	ArgsType,
) {}

@ObjectType()
export class CreateUserOutput {
	@Field(() => User)
	user: User;
}
