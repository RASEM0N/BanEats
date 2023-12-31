import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create.dto';
import { Inject } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { UpdateRestaurantDto } from './dtos/update.dto';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';

@Resolver(() => Number)
export class RestaurantsResolver {
	constructor(@Inject() private readonly restaurantService: RestaurantsService) {}

	@Query(() => [Restaurant], { name: 'restaurantsGetAll' })
	async getAll(): Promise<Restaurant[]> {
		return this.restaurantService.getAll();
	}

	@AuthRoles([USER_ROLE.owner])
	@Mutation(() => Restaurant, { name: 'restaurantsCreate' })
	async create(
		@AuthUser() user: User,
		@Args() dto: CreateRestaurantInput,
	): Promise<CreateRestaurantOutput> {
		try {
			const restaurant = await this.restaurantService.create(user, dto);

			return {
				isOk: true,
				data: {
					restaurant,
				},
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}

	@AuthRoles([USER_ROLE.owner])
	@Mutation(() => Restaurant, { name: 'restaurantsUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() dto: UpdateRestaurantDto,
	): Promise<Restaurant> {
		return this.restaurantService.update(dto);
	}
}
