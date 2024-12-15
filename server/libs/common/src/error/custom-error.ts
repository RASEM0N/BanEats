interface CustomErrorConstructor {
	message: string;
	errorCode: number;
	description?: string;
}

export class CustomError extends Error {
	readonly errorCode: number;
	readonly description?: string;

	constructor(params: CustomErrorConstructor) {
		super(params.message);
		this.errorCode = params.errorCode;
		this.description = params.description;
	}
}