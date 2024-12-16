import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { RestaurantService } from '../services/restaurant.service';
import { CategoryService } from '../services/category.service';
import { RestaurantsCategory } from '../entities/category.entity';
import {
	CategoryGetAllOutput,
	CategoryGetArgs,
	CategoryGetOutput,
} from '../dto/category-get.dto';

// @TODO надо понять зачем блять это делать
@Resolver(() => RestaurantsCategory)
export class CategoryResolver {
	constructor(
		private readonly restaurantService: RestaurantService,
		private readonly categoryService: CategoryService,
	) {}

	// ОПТИМИЗАЦИЯ
	// В любой @ObjectType RestaurantsCategory
	// добавляем поле restaurantCount,
	// которое отдельное берется

	// https://docs.nestjs.com/graphql/resolvers#schema-first-resolver
	@ResolveField(() => Int)
	async restaurantCount(@Parent() category: RestaurantsCategory): Promise<number> {
		return this.restaurantService.count(category.id);
	}

	@Query(() => CategoryGetAllOutput, { name: 'RestaurantCategoryGetAll' })
	async getAll(): Promise<CategoryGetAllOutput> {
		const categories = await this.categoryService.getAll();
		return { categories };
	}

	@Query(() => CategoryGetOutput, { name: 'RestaurantCategoryGetBySlug' })
	async getBySlug(@Args() args: CategoryGetArgs): Promise<CategoryGetOutput> {
		const result = await this.restaurantService.getCategoryWithAllRestaurants(args);
		return { ...result };
	}
}
