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
export class UpdateRestaurantInput extends PartialType(
	OmitType(Restaurant, ['id', 'createdAt', 'updatedAt']),
) {}

@ArgsType()
export class UpdateRestaurantDto extends PickType(Restaurant, ['id']) {
	@Field(() => UpdateRestaurantInput)
	input: UpdateRestaurantInput;
}
