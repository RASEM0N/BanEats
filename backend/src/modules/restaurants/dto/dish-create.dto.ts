import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { RestaurantDish } from '../entities/dish.entity';
import { CoreOutput } from '@ubereats/common/dto';

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
export class CreateDishData {
	@Field(() => RestaurantDish)
	dish: RestaurantDish;
}

@ObjectType()
export class CreateDishOutput extends CoreOutput<CreateDishData> {
	@Field(() => CreateDishData, { nullable: true })
	data?: CreateDishData;
}
