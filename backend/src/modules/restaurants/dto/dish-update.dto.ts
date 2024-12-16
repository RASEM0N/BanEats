import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { RestaurantDish } from '../entities/dish.entity';

@ArgsType()
export class UpdateDishArgs extends PickType(
	RestaurantDish,
	['name', 'price', 'description', 'options'],
	ArgsType,
) {
	@Field(() => Number)
	dishId: number;
}

@ObjectType()
export class UpdateDishOutput {
	@Field(() => RestaurantDish)
	dish: RestaurantDish;
}
