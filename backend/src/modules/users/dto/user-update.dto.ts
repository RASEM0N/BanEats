import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserArgs extends PickType(User, ['email', 'password'], ArgsType) {}

@ObjectType()
export class UpdateUserOutput {
	@Field(() => User)
	user: User;
}
