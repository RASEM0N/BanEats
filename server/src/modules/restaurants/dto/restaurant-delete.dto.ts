import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@ArgsType()
export class RestaurantsDeleteArgs {
	@Field(() => Number)
	@IsNumber()
	@IsPositive()
	restaurantId: number;
}
