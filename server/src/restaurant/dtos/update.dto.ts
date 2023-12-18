import {
	ArgsType,
	Field,
	InputType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
	OmitType(Restaurant, ['id']),
) {}

@ArgsType()
export class UpdateRestaurantDto extends PickType(Restaurant, ['id']) {
	@Field(() => UpdateRestaurantInputType)
	input: UpdateRestaurantInputType;
}
