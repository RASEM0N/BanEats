import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dto';

@ObjectType()
export class UpdateUserData {
	@Field(() => User)
	user: User;
}

@ArgsType()
export class UpdateUserArgs extends PickType(User, ['email', 'password'], ArgsType) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutput<UpdateUserData> {
	@Field(() => UpdateUserData, { nullable: true })
	data?: UpdateUserData;
}
