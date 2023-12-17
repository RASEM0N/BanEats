import { Query, Resolver } from '@nestjs/graphql';
import { RestaurantEntity } from './entities/restaurant.entity';

@Resolver(() => RestaurantEntity)
export class RestaurantResolver {
	@Query(() => RestaurantEntity)
	myRestaurant() {
		return true;
	}
}
