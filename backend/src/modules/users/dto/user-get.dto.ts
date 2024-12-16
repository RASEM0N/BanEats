import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dto';

@ObjectType()
export class GetUserData {
	@Field(() => User)
	user: User;
}

@ArgsType()
export class GetUserArgs extends PickType(User, ['id'], ArgsType) {}

@ObjectType()
export class GetUserOutput extends CoreOutput<GetUserData> {
	@Field(() => GetUserData, { nullable: true })
	data?: GetUserData;
}
