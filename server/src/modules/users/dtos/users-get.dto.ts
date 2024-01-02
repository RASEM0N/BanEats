import { User } from '../entities/user.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';

@ObjectType()
export class GetUserData {
	user: User;
}

@ArgsType()
export class GetUserArgs extends PickType(User, ['id']) {}

@ObjectType()
export class GetUserOutput extends CoreOutput<GetUserData> {
	@Field(() => GetUserData, { nullable: true })
	data?: GetUserData;
}
