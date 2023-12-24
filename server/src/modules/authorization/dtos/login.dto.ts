import { CoreDto } from '@/shared/dtos/core.dto';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '@/modules/users/entities/user.entity';

@ArgsType()
export class LoginDto extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreDto<LoginData> {
	@Field(() => LoginData, { nullable: true })
	data?: LoginData;
}

@ObjectType()
export class LoginData {
	@Field(() => String, { nullable: true })
	token?: string;

	@Field(() => User)
	user: User;
}
