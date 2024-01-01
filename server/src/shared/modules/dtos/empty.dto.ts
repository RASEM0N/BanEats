import { Field, ObjectType } from '@nestjs/graphql';
import { CoreDto } from '@/shared/modules/dtos/core.dto';

@ObjectType()
export class EmptyData {}

@ObjectType()
export class EmptyOutput extends CoreDto<EmptyData> {
	@Field(() => EmptyData, { nullable: true })
	data?: EmptyData;
}
