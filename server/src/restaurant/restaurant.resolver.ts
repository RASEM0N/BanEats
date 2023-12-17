import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create.dto';

@Resolver()
export class RestaurantResolver {
	@Query(() => [Restaurant])
	getAll(): Restaurant[] {
		return [];
	}

	@Mutation(() => Boolean)
	create(@Args() dto: CreateRestaurantDto): boolean {
		console.log(dto);
		return true;
	}
}
