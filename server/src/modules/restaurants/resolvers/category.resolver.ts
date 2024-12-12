import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthPublic } from '@/modules/authorization/decorators/auth-public.decorator';

import { RestaurantService } from '../services/restaurant.service';
import { CategoryService } from '../services/category.service';
import { RestaurantsCategory } from '../entities/category.entity';
import {
	CategoryGetAllOutput,
	CategoryGetArgs,
	CategoryGetOutput,
} from '../dtos/category-get.dto';

// @TODO надо понять зачем блять это делать
@Resolver(() => RestaurantsCategory)
export class CategoryResolver {
	constructor(
		private readonly restaurantService: RestaurantService,
		private readonly categoryService: CategoryService,
	) {}

	/**
	 * Если в каком-то GQL методе есть сушнрсит RestaurantsCategory
	 * то это дополнительно добавлчть новое поле, которое выполнится
	 * только если мы попросим
	 * @see https://docs.nestjs.com/graphql/resolvers#schema-first-resolver
	 */
	// @TODO
	// @Resolver(() => RestaurantsCategory)
	@ResolveField(() => Number)

	// Parent получаем из @Resolver, который может как на методе
	// так и на классе самом
	async restaurantCount(@Parent() category: RestaurantsCategory): Promise<number> {
		return this.restaurantService.count(category.id);
	}

	/**
	 * Вместе с методов выше полный ответ будет
	 *	{
	 *	   isOk: true,
	 *	   data: {
	 *	       categories: [
	 *	           {
	 *	               name: 'суши и роллы',
	 *	               slug: 'суши-и-роллы',
	 *	               restaurantCount: 43
	 *	           },
	 *	           {
	 * 	               name: 'макароны',
	 * 	               slug: 'макароны',
	 * 	               restaurantCount: 12
	 * 	           }
	 *	       ]
	 *	   }
	 *	}
	 */
	@AuthPublic()
	@Query(() => CategoryGetAllOutput, { name: 'restaurantsCategoryGetAll' })
	async getAll(): Promise<CategoryGetAllOutput> {
		try {
			const categories = await this.categoryService.getAll();

			return {
				isOk: true,
				data: {
					categories,
				},
			};
		} catch (e) {
			return {
				isOk: true,
				errorCode: e.errorCode,
				message: e.message,
			};
		}
	}

	@AuthPublic()
	@Query(() => CategoryGetOutput, { name: 'restaurantsCategoryGetBySlug' })
	async getBySlug(@Args() args: CategoryGetArgs): Promise<CategoryGetOutput> {
		try {
			const result = await this.categoryService.getWithAllRestaurants(args);

			return {
				isOk: true,
				data: {
					...result,
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
}
