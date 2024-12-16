import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UsersMeOutput {
	@Field(() => User)
	user: User;
}
