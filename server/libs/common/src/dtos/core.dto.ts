import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutputWithoutData {
	@Field(() => Number, { nullable: true })
	errorCode?: number;

	@Field(() => String, { nullable: true })
	message?: string;
}

export abstract class CoreOutput<T> {
	@Field(() => Number, { nullable: true })
	errorCode?: number;

	@Field(() => String, { nullable: true })
	message?: string;

	abstract data?: T;
}
