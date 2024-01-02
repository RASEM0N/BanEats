import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RestaurantsCategory } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultCRUD } from '@/shared/modules/services/default-crud.service';
import slugify from 'slugify';

@Injectable()
export class CategoryService implements DefaultCRUD<RestaurantsCategory> {
	constructor(
		@InjectRepository(RestaurantsCategory)
		private readonly restaurantCategoryRepository: Repository<RestaurantsCategory>,
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

	async get(): Promise<RestaurantsCategory> {
		return undefined;
	}

	async getAll(): Promise<RestaurantsCategory[]> {
		return undefined;
	}

	async update(): Promise<RestaurantsCategory> {
		return undefined;
	}

	async delete(): Promise<void> {
		return undefined;
	}
}
