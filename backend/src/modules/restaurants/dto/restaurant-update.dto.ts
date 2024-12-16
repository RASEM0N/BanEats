import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantArgs } from './restaurant-create.dto';

@ArgsType()
export class UpdateRestaurantArgs extends PartialType(CreateRestaurantArgs) {
	@Field(() => Number)
	restaurantId: number;
}

@ObjectType()
export class UpdateRestaurantOutput {
	@Field(() => Restaurant)
	restaurant: Restaurant;
}
