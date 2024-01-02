import { Field } from '@nestjs/graphql';

export abstract class CoreOutput<T> {
	@Field(() => Number, { nullable: true })
	errorCode?: number;

	@Field(() => String, { nullable: true })
	message?: string;

	@Field(() => Boolean)
	isOk: boolean;

	abstract data?: T;
}
