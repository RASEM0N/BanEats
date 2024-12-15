interface UberEatsConstructor {
	errorCode: UBER_EATS_ERROR;
	message?: string;
}

const defaultMessage = (errorCode: UBER_EATS_ERROR): string => {
	if (errorCode === UBER_EATS_ERROR.no_rights) {
		return 'No rights';
	}

	if (errorCode === UBER_EATS_ERROR.no_entity) {
		return 'There is no entity';
	}

	if (errorCode === UBER_EATS_ERROR.already_there) {
		return 'There is entity';
	}

	return 'Unhandled error';
};

export enum UBER_EATS_ERROR {
	error = 400,
	no_rights = 10001,
	no_entity = 10002,
	already_there = 20001,
}

export class UberEastsError extends Error {
	readonly errorCode: UBER_EATS_ERROR;

	constructor(params: UberEatsConstructor) {
		super(params.message ?? defaultMessage(params.errorCode));
		this.errorCode = params.errorCode;
	}
}
