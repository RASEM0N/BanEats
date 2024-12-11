import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RestaurantsCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultCRUD } from '@ubereats/common/services';
import slugify from 'slugify';
import { CategoryGetArgs, CategoryGetData } from './dtos/category-get.dto';
import { CustomError, getErrorWithDefault } from '@/shared/lib/custom-error';
import { RestaurantsService } from './restaurants.service';

@Injectable()
export class CategoryService implements DefaultCRUD<RestaurantsCategory> {
	constructor(
		@InjectRepository(RestaurantsCategory)
		private readonly restaurantCategoryRepository: Repository<RestaurantsCategory>,
		@Inject() private readonly restaurantService: RestaurantsService,
	) {}

	async create(categoryName: string): Promise<RestaurantsCategory> {
		const name = categoryName.trim().toLowerCase();
		const slug = slugify(name);

		const category = await this.restaurantCategoryRepository.findOneBy({
			slug,
		});

		if (category) {
			return category;
		}

		const createdCategory = this.restaurantCategoryRepository.create({
			name,
			slug,
		});

		await this.restaurantCategoryRepository.save(createdCategory);
		return createdCategory;
	}

	async get(slug: string): Promise<RestaurantsCategory> {
		const restaurant = await this.restaurantCategoryRepository.findOneBy({
			slug,
		});

		if (!restaurant) {
			throw new CustomError({
				message: 'Нет такого категории',
				errorCode: 400,
			});
		}

		return restaurant;
	}

	async getWithAllRestaurants({
		slug,
		page,
	}: CategoryGetArgs): Promise<CategoryGetData> {
		try {
			const category = await this.get(slug);
			const paginationResult = await this.restaurantService.getAll({
				page,
				categoryId: category.id,
			});

			return {
				category,
				...paginationResult,
			};
		} catch (e) {
			throw getErrorWithDefault(e, {
				message: 'Ошибка получения категории',
				errorCode: 400,
			});
		}
	}

	async getAll(): Promise<RestaurantsCategory[]> {
		return this.restaurantCategoryRepository.find();
	}

	async update(): Promise<RestaurantsCategory> {
		return undefined;
	}

	async delete(): Promise<void> {
		return undefined;
	}
}
