import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { RestaurantDish } from '../entities/dish.entity';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';

@ArgsType()
export class CreateDishArgs extends PickType(RestaurantDish, [
	'name',
	'price',
	'description',
	'options',
]) {
	@Field(() => Number)
	restaurantId: number;
}

@ObjectType()
export class CreateDishData {
	@Field(() => RestaurantDish)
	dish: RestaurantDish;
}

@ObjectType()
export class CreateDishOutput extends CoreOutput<CreateDishData> {
	@Field(() => CreateDishData, { nullable: true })
	data?: CreateDishData;
}
