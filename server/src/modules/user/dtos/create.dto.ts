import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '@/modules/user/entities/user.entity';
import { CoreDto } from '@/common/dtos/core.dto';

@ObjectType()
export class CreateUserData {
	@Field(() => User)
	user: User;
}

@ArgsType()
export class CreateUserDto extends PickType(User, ['email', 'password', 'role']) {}

@ObjectType()
export class CreateUserOutput extends CoreDto {
	@Field(() => CreateUserData, { nullable: true })
	data?: CreateUserData;
}
