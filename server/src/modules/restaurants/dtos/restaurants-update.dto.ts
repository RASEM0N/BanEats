import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantArgs } from '@/modules/restaurants/dtos/restaurants-create.dto';
import { CoreDto } from '@/shared/modules/dtos/core.dto';

@ArgsType()
export class UpdateRestaurantArgs extends PartialType(CreateRestaurantArgs) {
	@Field(() => Number)
	restaurantId: number;
}

@ObjectType()
export class UpdateRestaurantData {
	@Field(() => Restaurant)
	restaurant: Restaurant;
}

@ObjectType()
export class UpdateRestaurantOutput extends CoreDto<UpdateRestaurantData> {
	@Field(() => UpdateRestaurantData, { nullable: true })
	data?: UpdateRestaurantData;
}
