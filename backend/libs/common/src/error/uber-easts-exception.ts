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
	must_not_be_login = 20003,
	validation_error = 20004,
}

export class UberEastsException extends Error {
	readonly errorCode: UBER_EATS_ERROR;

	private static readonly descriptions: { [key in UBER_EATS_ERROR]: string } = {
		[UBER_EATS_ERROR.error]: 'Unhandled error',
		[UBER_EATS_ERROR.server_error]: 'Server error',
		[UBER_EATS_ERROR.no_rights]: 'No rights',
		[UBER_EATS_ERROR.no_entity]: 'There is no entity',
		[UBER_EATS_ERROR.already_there]: 'There is entity',
		[UBER_EATS_ERROR.fail_login]: 'Fail authentication',
		[UBER_EATS_ERROR.validation_error]: 'Validation error',
		[UBER_EATS_ERROR.must_not_be_login]: 'The client must not be logged in',
	};

	static getDescription(errorCode: UBER_EATS_ERROR): string {
		return this.descriptions[errorCode] ?? this.descriptions[UBER_EATS_ERROR.error];
	}

	constructor(params: UberEatsConstructor) {
		super(params.message ?? UberEastsException.getDescription(params.errorCode));
		this.errorCode = params.errorCode;
	}
}
