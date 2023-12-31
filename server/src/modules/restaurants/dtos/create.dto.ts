import { ArgsType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CoreDto } from '@/shared/modules/dtos/core.dto';

@ObjectType()
export class CreateRestaurantData {
	@Field(() => Restaurant)
	restaurant: Restaurant;
}

@ArgsType()
export class CreateRestaurantInput extends OmitType(Restaurant, [
	'id',
	'createdAt',
	'updatedAt',
]) {}

export class CreateRestaurantOutput extends CoreDto<CreateRestaurantData> {
	@Field(() => CreateRestaurantData, { nullable: true })
	data?: CreateRestaurantData;
}
