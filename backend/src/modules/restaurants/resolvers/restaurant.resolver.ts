import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '@ubereats/common/dto';
import { Roles } from '@/modules/auth/decorators/role.decorator';
import { AuthUser } from '@/modules/auth/decorators/auth-user.decorator';
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
import {
	RestaurantGetArgs,
	RestaurantGetOutput,
	RestaurantsGetAllMyOutput,
	RestaurantsGetAllOutput,
} from '../dto/restaurant-get.dto';

@Resolver(() => Number)
export class RestaurantResolver {
	constructor(private readonly restaurantService: RestaurantService) {}

	@Query(() => RestaurantGetOutput, { name: 'RestaurantGet' })
	async get(
		@AuthUser() user: User,
		@Args() args: RestaurantGetArgs,
	): Promise<RestaurantGetOutput> {
		const restaurant = await this.restaurantService.get(user, args.restaurantId);
		return { restaurant };
	}

	@Query(() => RestaurantsGetAllOutput, { name: 'RestaurantGetAll' })
	async getAll(@Args() args: PaginationArgs): Promise<RestaurantsGetAllOutput> {
		const result = await this.restaurantService.getAll(args);
		return { ...result };
	}

	@Roles(USER_ROLE.owner)
	@Query(() => RestaurantsGetAllMyOutput, { name: 'RestaurantGetAllMy' })
	async getMyRestaurants(@AuthUser() user: User): Promise<RestaurantsGetAllMyOutput> {
		const result = await this.restaurantService.getAllMyRestaurants(user);
		return { ...result };
	}

	@Roles(USER_ROLE.owner)
	@Mutation(() => CreateRestaurantOutput, { name: 'RestaurantCreate' })
	async create(
		@AuthUser() user: User,
		@Args() dto: CreateRestaurantArgs,
	): Promise<CreateRestaurantOutput> {
		const restaurant = await this.restaurantService.getOrCreate(user, dto);
		return { restaurant };
	}

	@Roles(USER_ROLE.owner)
	@Mutation(() => UpdateRestaurantOutput, { name: 'RestaurantUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() updateArgs: UpdateRestaurantArgs,
	): Promise<UpdateRestaurantOutput> {
		const restaurant = await this.restaurantService.update(user, updateArgs);
		return { restaurant };
	}

	@Roles(USER_ROLE.admin)
	@Mutation(() => Boolean, { name: 'RestaurantDelete' })
	async delete(
		@AuthUser() user: User,
		@Args() args: RestaurantsDeleteArgs,
	): Promise<boolean> {
		await this.restaurantService.delete(user, args);
		return true;
	}
}
