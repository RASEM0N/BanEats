import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantArgs extends PickType(
	Restaurant,
	['name', 'address', 'coverImage'],
	ArgsType,
) {
	@Field(() => String)
	@IsString()
	@Length(5)
	categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput {
	@Field(() => Restaurant)
	restaurant: Restaurant;
}
