import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { CategoryService } from './category.service';
import { Inject } from '@nestjs/common';
import { CategoryGetAllOutput } from './dtos/category-get.dto';
import { AuthPublic } from '@/modules/authorization/decorators/auth-public.decorator';
import { RestaurantsCategory } from '@/modules/restaurants/entities/category.entity';

@Resolver()
export class CategoryResolver {
	constructor(
		@Inject() private readonly restaurantService: RestaurantsService,
		@Inject() private readonly categoryService: CategoryService,
	) {}

	/**
	 * Если в каком-то GQL методе есть сушнрсит RestaurantsCategory
	 * то это дополнительно добавлчть новое поле, которое выполнится
	 * только если мы попросим
	 * @see https://docs.nestjs.com/graphql/resolvers#schema-first-resolver
	 */
	@Resolver(() => RestaurantsCategory)
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
}
