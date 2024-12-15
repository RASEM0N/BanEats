import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteDishArgs {
	@Field(() => Number)
	dishId: number;
}
