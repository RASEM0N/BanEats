import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantArgs } from './restaurant-create.dto';
import { CoreOutput } from '@ubereats/common/dto';

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
export class UpdateRestaurantOutput extends CoreOutput<UpdateRestaurantData> {
	@Field(() => UpdateRestaurantData, { nullable: true })
	data?: UpdateRestaurantData;
}
