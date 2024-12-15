import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RestaurantsCategory } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultCRUD } from '@ubereats/common/services';
import slugify from 'slugify';
import { UBER_EATS_ERROR, UberEastsError } from '@ubereats/common/error';

@Injectable()
export class CategoryService implements DefaultCRUD<RestaurantsCategory> {
	constructor(
		@InjectRepository(RestaurantsCategory)
		private readonly category: Repository<RestaurantsCategory>,
		// private readonly restaurantService: RestaurantService,
	) {}

	async create(categoryName: string): Promise<RestaurantsCategory> {
		const name = categoryName.trim().toLowerCase();
		const slug = slugify(name);

		const category = await this.category.findOneBy({
			slug,
		});

		if (category) {
			return category;
		}

		const createdCategory = this.category.create({
			name,
			slug,
		});

		await this.category.save(createdCategory);
		return createdCategory;
	}

	async get(slug: string): Promise<RestaurantsCategory> {
		const restaurant = await this.category.findOneBy({
			slug,
		});

		if (!restaurant) {
			throw new UberEastsError({
				errorCode: UBER_EATS_ERROR.no_entity,
				message: 'There is no category',
			});
		}

		return restaurant;
	}

	async getAll(): Promise<RestaurantsCategory[]> {
		return this.category.find();
	}

	async update(): Promise<RestaurantsCategory> {
		return undefined;
	}

	async delete(): Promise<void> {
		return undefined;
	}
}
