import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dtos';

@ObjectType()
export class EmptyOutput extends CoreOutput<undefined> {
	data?: undefined;
}
