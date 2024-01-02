import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';
import { IsString, Length } from 'class-validator';

@ObjectType()
export class CreateRestaurantData {
	@Field(() => Restaurant)
	restaurant: Restaurant;
}

@ArgsType()
export class CreateRestaurantArgs extends PickType(Restaurant, [
	'name',
	'address',
	'coverImage',
]) {
	@Field(() => String)
	@IsString()
	@Length(5)
	categoryName: string;
}

export class CreateRestaurantOutput extends CoreOutput<CreateRestaurantData> {
	@Field(() => CreateRestaurantData, { nullable: true })
	data?: CreateRestaurantData;
}
