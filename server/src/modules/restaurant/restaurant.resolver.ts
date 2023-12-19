import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create.dto';
import { Inject } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { UpdateRestaurantDto } from './dtos/update.dto';

@Resolver(() => Number)
export class RestaurantResolver {
	constructor(@Inject() private readonly restaurantService: RestaurantService) {}

	@Query(() => [Restaurant])
	async getAll(): Promise<Restaurant[]> {
		return this.restaurantService.getAll();
	}

	@Mutation(() => Restaurant)
	async create(
		@Args({ name: 'input' }) input: CreateRestaurantDto,
	): Promise<Restaurant> {
		return this.restaurantService.create(input);
	}

	@Mutation(() => Restaurant)
	async update(@Args() dto: UpdateRestaurantDto): Promise<Restaurant> {
		return this.restaurantService.update(dto);
	}
}
