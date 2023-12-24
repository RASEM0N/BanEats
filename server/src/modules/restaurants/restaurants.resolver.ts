import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create.dto';
import { Inject } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { UpdateRestaurantDto } from './dtos/update.dto';

@Resolver(() => Number)
export class RestaurantsResolver {
	constructor(@Inject() private readonly restaurantService: RestaurantsService) {}

	@Query(() => [Restaurant], { name: 'restaurantsGetAll' })
	async getAll(): Promise<Restaurant[]> {
		return this.restaurantService.getAll();
	}

	@Mutation(() => Restaurant, { name: 'restaurantsCreate' })
	async create(@Args() dto: CreateRestaurantDto): Promise<Restaurant> {
		return this.restaurantService.create(dto);
	}

	@Mutation(() => Restaurant, { name: 'restaurantsUpdate' })
	async update(@Args() dto: UpdateRestaurantDto): Promise<Restaurant> {
		return this.restaurantService.update(dto);
	}
}
