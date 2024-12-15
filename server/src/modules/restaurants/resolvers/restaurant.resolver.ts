import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutputWithoutData, PaginationArgs } from '@ubereats/common/dtos';
import { Roles } from '@/modules/authorization/decorators/role.decorator';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { AuthPublic } from '@/modules/authorization/decorators/auth-public.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';

import {
	CreateRestaurantArgs,
	CreateRestaurantOutput,
} from '../dto/restaurant-create.dto';
import { RestaurantService } from '../services/restaurant.service';
import {
	UpdateRestaurantArgs,
	UpdateRestaurantOutput,
} from '../dto/restaurant-update.dto';
import { RestaurantsDeleteArgs } from '../dto/restaurant-delete.dto';
import { RestaurantsGetAllOutput } from '../dto/restaurant-get.dto';

@Resolver(() => Number)
export class RestaurantResolver {
	constructor(private readonly restaurantService: RestaurantService) {}

	@AuthPublic()
	@Query(() => RestaurantsGetAllOutput, { name: 'RestaurantGetAll' })
	async getAll(@Args() args: PaginationArgs): Promise<RestaurantsGetAllOutput> {
		const result = await this.restaurantService.getAll(args);
		return { data: { ...result }, };
	}

	@Roles([USER_ROLE.owner])
	@Mutation(() => CreateRestaurantOutput, { name: 'RestaurantCreate' })
	async create(
		@AuthUser() user: User,
		@Args() dto: CreateRestaurantArgs,
	): Promise<CreateRestaurantOutput> {
		const restaurant = await this.restaurantService.create(user, dto);

		return { data: { restaurant } };
	}

	@Roles([USER_ROLE.owner])
	@Mutation(() => UpdateRestaurantOutput, { name: 'RestaurantUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() updateArgs: UpdateRestaurantArgs,
	): Promise<UpdateRestaurantOutput> {
		const restaurant = await this.restaurantService.update(user, updateArgs);

		return { data: { restaurant } };
	}

	@Roles([USER_ROLE.admin])
	@Mutation(() => CoreOutputWithoutData, { name: 'RestaurantDelete' })
	async delete(
		@AuthUser() user: User,
		@Args() args: RestaurantsDeleteArgs,
	): Promise<CoreOutputWithoutData> {
		await this.restaurantService.delete(user, args);
		return {};
	}
}
