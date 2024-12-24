import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
	@Field(() => Number, { defaultValue: 1 })
	page: number;
}

@ObjectType()
export class PaginationData {
	@Field(() => Number)
	totalPages: number;

	@Field(() => Number)
	totalCount: number;

	@Field(() => Number)
	page: number;
}
