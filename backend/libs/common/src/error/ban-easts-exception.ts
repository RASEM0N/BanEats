interface BanEatsConstructor {
	errorCode: BAN_EATS_ERROR;
	message?: string;
}

export enum BAN_EATS_ERROR {
	error = 400,
	server_error = 500,
	no_rights = 10001,
	no_entity = 10002,
	already_there = 20001,
	fail_login = 20002,
	must_not_be_login = 20003,
	validation_error = 20004,
}

export class BanEastsException extends Error {
	readonly errorCode: BAN_EATS_ERROR;

	private static readonly descriptions: { [key in BAN_EATS_ERROR]: string } = {
		[BAN_EATS_ERROR.error]: 'Unhandled error',
		[BAN_EATS_ERROR.server_error]: 'Server error',
		[BAN_EATS_ERROR.no_rights]: 'No rights',
		[BAN_EATS_ERROR.no_entity]: 'There is no entity',
		[BAN_EATS_ERROR.already_there]: 'There is entity',
		[BAN_EATS_ERROR.fail_login]: 'Fail authentication',
		[BAN_EATS_ERROR.validation_error]: 'Validation error',
		[BAN_EATS_ERROR.must_not_be_login]: 'The client must not be logged in',
	};

	static getDescription(errorCode: BAN_EATS_ERROR): string {
		return this.descriptions[errorCode] ?? this.descriptions[BAN_EATS_ERROR.error];
	}

	constructor(params: BanEatsConstructor) {
		super(params.message ?? BanEastsException.getDescription(params.errorCode));
		this.errorCode = params.errorCode;
	}
}
