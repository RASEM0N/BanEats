import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { CoreDto } from '@/shared/dtos/core.dto';

@ObjectType()
export class UpdateUserData {
	user: User;
}

@ArgsType()
export class UpdateUserArgs extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class UpdateUserOutput extends CoreDto<UpdateUserData> {
	@Field(() => UpdateUserData, { nullable: true })
	data?: UpdateUserData;
}
