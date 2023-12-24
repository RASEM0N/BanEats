import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { Verification } from '../entities/verification.entity';
import { CoreDto } from '@/shared/dtos/core.dto';
import { EmptyData } from '@/shared/dtos/empty.dto';

@ArgsType()
export class VerifyEmailArgs extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyEmailOutput extends CoreDto<EmptyData> {
	@Field(() => EmptyData, { nullable: true })
	data?: EmptyData;
}
