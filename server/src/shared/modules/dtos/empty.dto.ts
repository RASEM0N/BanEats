import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';

@ObjectType()
export class EmptyData {}

@ObjectType()
export class EmptyOutput extends CoreOutput<EmptyData> {
	@Field(() => EmptyData, { nullable: true })
	data?: EmptyData;
}
