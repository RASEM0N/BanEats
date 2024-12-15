import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dto';
import { User } from '@/modules/users/entities/user.entity';

@ObjectType()
export class UsersMeData {
	@Field(() => User)
	user: User;
}

@ObjectType()
export class UsersMeOutput extends CoreOutput<UsersMeData> {
	@Field(() => UsersMeData, { nullable: true })
	data?: UsersMeData;
}
