import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import {
	CreateRestaurantArgs,
	CreateRestaurantOutput,
} from './dtos/restaurants-create.dto';
import { Inject } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import {
	UpdateRestaurantArgs,
	UpdateRestaurantOutput,
} from './dtos/restaurants-update.dto';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { EmptyOutput } from '@/shared/modules/dtos/empty.dto';
import { RestaurantsDeleteArgs } from './dtos/restaurants-delete.dto';

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
		@Args() dto: CreateRestaurantArgs,
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
		@Args() updateArgs: UpdateRestaurantArgs,
	): Promise<UpdateRestaurantOutput> {
		try {
			const restaurant = await this.restaurantService.update(user, updateArgs);

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

	@AuthRoles([USER_ROLE.admin])
	@Mutation(() => EmptyOutput, { name: 'restaurantsDelete ' })
	async delete(
		@AuthUser() user: User,
		@Args() args: RestaurantsDeleteArgs,
	): Promise<EmptyOutput> {
		try {
			await this.restaurantService.delete(user, args);

			return {
				isOk: true,
				data: {},
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}
}
