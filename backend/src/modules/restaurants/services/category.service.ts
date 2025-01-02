import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RestaurantsCategory } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { BAN_EATS_ERROR, BanEastsException } from '@baneats/common/error';
import { DefaultCRUD } from '@baneats/common/services';

@Injectable()
export class CategoryService implements DefaultCRUD<RestaurantsCategory> {
	constructor(
		@InjectRepository(RestaurantsCategory)
		private readonly category: Repository<RestaurantsCategory>,
	) {}

	async getOrCreate(categoryName: string): Promise<RestaurantsCategory> {
		const name = categoryName.trim().toLowerCase();
		const slug = slugify(name);

		const category = await this.category.findOneBy({
			slug,
		});

		if (category) {
			return category;
		}

		return this.category.save(this.category.create({ name, slug, restaurants: [] }));
	}

	async get(slug: string): Promise<RestaurantsCategory> {
		const restaurant = await this.category.findOneBy({
			slug,
		});

		if (!restaurant) {
			throw new BanEastsException({
				errorCode: BAN_EATS_ERROR.no_entity,
				message: 'There is no category',
			});
		}

		return restaurant;
	}

	async getAll(): Promise<RestaurantsCategory[]> {
		return this.category.find();
	}

	async update(): Promise<RestaurantsCategory> {
		throw new BanEastsException({
			errorCode: BAN_EATS_ERROR.server_error,
			message: 'Not done method yet',
		});
	}

	async delete(): Promise<void> {
		throw new BanEastsException({
			errorCode: BAN_EATS_ERROR.server_error,
			message: 'Not done method yet',
		});
	}
}
