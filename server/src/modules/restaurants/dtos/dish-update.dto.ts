import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { RestaurantDish } from '../entities/dish.entity';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';

@ArgsType()
export class UpdateDishArgs extends PickType(RestaurantDish, [
	'name',
	'price',
	'description',
	'options',
]) {
	@Field(() => Number)
	dishId: number;
}

@ObjectType()
export class UpdateDishData {
	@Field(() => RestaurantDish)
	dish: RestaurantDish;
}

@ObjectType()
export class UpdateDishOutput extends CoreOutput<UpdateDishData> {
	@Field(() => UpdateDishData, { nullable: true })
	data?: UpdateDishData;
}
