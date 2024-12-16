import { CoreOutput } from '@ubereats/common/dto';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '@/modules/users/entities/user.entity';

@ArgsType()
export class LoginArgs extends PickType(User, ['email', 'password'], ArgsType) {}

@ObjectType()
export class LoginData {
	@Field(() => String, { nullable: true })
	token?: string;

	@Field(() => User)
	user: User;
}

@ObjectType()
export class LoginOutput extends CoreOutput<LoginData> {
	@Field(() => LoginData, { nullable: true })
	data?: LoginData;
}
