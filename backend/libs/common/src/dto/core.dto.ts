import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UBER_EATS_ERROR } from '@ubereats/common/error';

registerEnumType(UBER_EATS_ERROR, {
	name: 'UBER_EATS_ERROR',
	valuesMap: {
		error: { description: 'Дефолтная ошибка' },
		no_rights: { description: 'Нет прав на действие' },
		no_entity: { description: 'Нет сущности/предмета' },
		already_there: { description: 'Данная сущность/предмет уже существует' },
	},
});

@ObjectType()
export class CoreOutputWithoutData {
	@Field(() => UBER_EATS_ERROR, { nullable: true })
	errorCode?: UBER_EATS_ERROR;

	@Field(() => String, { nullable: true })
	message?: string;
}

export abstract class CoreOutput<T> {
	@Field(() => UBER_EATS_ERROR, { nullable: true })
	errorCode?: UBER_EATS_ERROR;

	@Field(() => String, { nullable: true })
	message?: string;

	abstract data?: T;
}
