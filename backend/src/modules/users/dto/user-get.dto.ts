import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs extends PickType(User, ['id'], ArgsType) {}

@ObjectType()
export class GetUserOutput {
	@Field(() => User)
	user: User;
}
