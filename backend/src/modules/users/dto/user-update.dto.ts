import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PartialType, PickType } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserArgs extends PartialType(
	PickType(User, ['email', 'password'], ArgsType),
) {}

@ObjectType()
export class UpdateUserOutput {
	@Field(() => User)
	user: User;
}
