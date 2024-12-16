import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { RestaurantDish } from '../entities/dish.entity';

@ArgsType()
export class CreateDishArgs extends PickType(
	RestaurantDish,
	['name', 'price', 'description', 'options'],
	ArgsType,
) {
	@Field(() => Number)
	restaurantId: number;
}


@ObjectType()
export class CreateDishOutput {
	@Field(() => RestaurantDish)
	dish: RestaurantDish;
}
