import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dtos';

@ObjectType()
export class EmptyData {}

@ObjectType()
export class EmptyOutput extends CoreOutput<EmptyData> {
	@Field(() => EmptyData, { nullable: true })
	data?: EmptyData;
}
