import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutputWithoutData {
	@Field(() => Number, { nullable: true })
	errorCode?: number;

	@Field(() => String, { nullable: true })
	message?: string;

	@Field(() => Boolean)
	isOk: boolean;
}

export abstract class CoreOutput<T> {
	@Field(() => Number, { nullable: true })
	errorCode?: number;

	@Field(() => String, { nullable: true })
	message?: string;

	@Field(() => Boolean)
	isOk: boolean;

	abstract data?: T;
}
