import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dtos';

// @TODO удалить
@ObjectType()
export class EmptyOutput extends CoreOutput<undefined> {
	data?: undefined;
}
