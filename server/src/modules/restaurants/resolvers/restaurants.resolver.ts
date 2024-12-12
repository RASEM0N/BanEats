import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutputWithoutData, PaginationArgs } from '@ubereats/common/dtos';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { AuthPublic } from '@/modules/authorization/decorators/auth-public.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';

import {
	CreateRestaurantArgs,
	CreateRestaurantOutput,
} from '../dtos/restaurants-create.dto';
import { RestaurantsService } from '../services/restaurants.service';
import {
	UpdateRestaurantArgs,
	UpdateRestaurantOutput,
} from '../dtos/restaurants-update.dto';
import { RestaurantsDeleteArgs } from '../dtos/restaurants-delete.dto';
import { RestaurantsGetAllOutput } from '../dtos/restaurants-get.dto';

@Resolver(() => Number)
export class RestaurantsResolver {
	constructor(private readonly restaurantService: RestaurantsService) {}

	@AuthPublic()
	@Query(() => RestaurantsGetAllOutput, { name: 'restaurantsGetAll' })
	async getAll(@Args() args: PaginationArgs): Promise<RestaurantsGetAllOutput> {
		try {
			const result = await this.restaurantService.getAll(args);

			return {
				isOk: true,
				data: {
					...result,
				},
			};

			// @TODO это по должно быть в общем обратчике,
			// а то копипаст получается все время
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}

	@AuthRoles([USER_ROLE.owner])
	@Mutation(() => CreateRestaurantOutput, { name: 'restaurantsCreate' })
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
	@Mutation(() => UpdateRestaurantOutput, { name: 'restaurantsUpdate' })
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
	@Mutation(() => CoreOutputWithoutData, { name: 'restaurantsDelete' })
	async delete(
		@AuthUser() user: User,
		@Args() args: RestaurantsDeleteArgs,
	): Promise<CoreOutputWithoutData> {
		try {
			await this.restaurantService.delete(user, args);

			return {
				isOk: true,
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
