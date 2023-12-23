import { Field, ObjectType } from '@nestjs/graphql';

// 🐱‍👤 Если есть data то по похожему принципу действиуем
// @ObjectType()
// export class CoreOutputWithData<T>
// 	extends CoreOutputDto
// 	implements CoreOutputWithData<T> {}

export interface CoreOutput {
	message?: string;
	errorCode?: number;
	isOk: boolean;
}

export interface CoreOutputWithData<T> extends CoreOutput {
	data?: T;
}

@ObjectType()
export class CoreDto implements CoreOutput {
	@Field(() => Number, { nullable: true })
	errorCode?: number;

	@Field(() => String, { nullable: true })
	message?: string;

	@Field(() => Boolean)
	isOk: boolean;
}
