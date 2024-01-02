import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';

@ObjectType()
export class UpdateUserData {
	user: User;
}

@ArgsType()
export class UpdateUserArgs extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutput<UpdateUserData> {
	@Field(() => UpdateUserData, { nullable: true })
	data?: UpdateUserData;
}
