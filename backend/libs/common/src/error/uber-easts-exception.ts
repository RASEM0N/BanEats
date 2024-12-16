import { registerEnumType } from '@nestjs/graphql';

interface UberEatsConstructor {
	errorCode: UBER_EATS_ERROR;
	message?: string;
}

export enum UBER_EATS_ERROR {
	error = 400,
	server_error = 500,
	no_rights = 10001,
	no_entity = 10002,
	already_there = 20001,
	fail_login = 20002,
}

registerEnumType(UBER_EATS_ERROR, {
	name: 'UBER_EATS_ERROR',
	valuesMap: {
		error: { description: 'Дефолтная ошибка' },
		no_rights: { description: 'Нет прав на действие' },
		no_entity: { description: 'Нет сущности/предмета' },
		already_there: { description: 'Данная сущность/предмет уже существует' },
	},
});

export class UberEastsException extends Error {
	readonly errorCode: UBER_EATS_ERROR;

	static defaultMessage(errorCode: UBER_EATS_ERROR): string {
		if (errorCode === UBER_EATS_ERROR.no_rights) {
			return 'No rights';
		}

		if (errorCode === UBER_EATS_ERROR.no_entity) {
			return 'There is no entity';
		}

		if (errorCode === UBER_EATS_ERROR.already_there) {
			return 'There is entity';
		}

		if (errorCode === UBER_EATS_ERROR.server_error) {
			return 'Server error';
		}

		return 'Unhandled error';
	}

	constructor(params: UberEatsConstructor) {
		super(params.message ?? UberEastsException.defaultMessage(params.errorCode));
		this.errorCode = params.errorCode;
	}
}
