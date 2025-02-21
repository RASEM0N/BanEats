import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Raw, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantArgs } from '../dto/restaurant-create.dto';
import { UpdateRestaurantArgs } from '../dto/restaurant-update.dto';
import { DefaultCRUD } from '@baneats/common/services';
import { BAN_EATS_ERROR, BanEastsException } from '@baneats/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { CategoryService } from './category.service';
import { RestaurantsDeleteArgs } from '../dto/restaurant-delete.dto';
import {
	RestaurantGetAllArgs,
	RestaurantsGetAllMyOutput,
	RestaurantsGetAllOutput,
} from '../dto/restaurant-get.dto';
import {
	CategoryGetArgs,
	CategoryGetOutput,
} from '@/modules/restaurants/dto/category-get.dto';

@Injectable()
export class RestaurantService implements DefaultCRUD<Restaurant> {
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurant: Repository<Restaurant>,
		@Inject(CategoryService) private readonly categoryService: CategoryService,
	) {}

	async get(user: User, id: number): Promise<Restaurant> {
		const restaurant = await this.restaurant.findOne({
			where: { id },
		});

		if (!restaurant) {
			throw new BanEastsException({
				errorCode: BAN_EATS_ERROR.no_entity,
				message: `There is no restaurant`,
			});
		}

		if (restaurant.ownerId !== user.id) {
			throw new BanEastsException({
				errorCode: BAN_EATS_ERROR.no_rights,
			});
		}

		return restaurant;
	}

	async getAll(args: RestaurantGetAllArgs): Promise<RestaurantsGetAllOutput> {
		const take = 25;
		const skip = (args.page - 1) * take;

		const paginationOptions = this.paginationOptions({
			take,
			skip,
			...args,
		});
		const [restaurants, totalCount] =
			await this.restaurant.findAndCount(paginationOptions);

		const totalPages = Math.ceil(totalCount / take);

		return {
			restaurants,
			totalPages,
			totalCount,
			page: args.page,
		};
	}

	async getAllMyRestaurants(user: User): Promise<RestaurantsGetAllMyOutput> {
		const restaurants = await this.restaurant.find({
			where: {
				owner: { id: user.id },
			},
		});
		return { restaurants };
	}

	async getOrCreate(user: User, dto: CreateRestaurantArgs): Promise<Restaurant> {
		const restaurant = this.restaurant.create({
			...dto,
		});

		restaurant.owner = user;
		restaurant.category = await this.categoryService.getOrCreate(dto.categoryName);
		return await this.restaurant.save(restaurant);
	}

	async update(user: User, updateArgs: UpdateRestaurantArgs): Promise<Restaurant> {
		const restaurant = await this.restaurant.findOneBy({
			id: updateArgs.restaurantId,
		});

		if (!restaurant) {
			throw new BanEastsException({
				errorCode: BAN_EATS_ERROR.no_entity,
				message: 'There is no restaurant',
			});
		}

		if (user.id !== restaurant.id) {
			throw new BanEastsException({
				errorCode: BAN_EATS_ERROR.no_rights,
			});
		}

		if (updateArgs.categoryName) {
			restaurant.category = await this.categoryService.getOrCreate(
				updateArgs.categoryName,
			);
		}

		return this.restaurant.save({
			id: updateArgs.restaurantId,
			...updateArgs,
		});
	}

	async delete(user: User, args: RestaurantsDeleteArgs): Promise<void> {
		const restaurant = await this.restaurant.findOneBy({
			id: args.restaurantId,
		});

		if (!restaurant) {
			return;
		}

		if (restaurant.ownerId !== user.id) {
			throw new BanEastsException({
				errorCode: BAN_EATS_ERROR.no_rights,
			});
		}

		await this.restaurant.delete(args.restaurantId);
	}

	async count(categoryId: number): Promise<number> {
		return this.restaurant.countBy({
			category: {
				id: categoryId,
			},
		});
	}

	private paginationOptions(
		data: RestaurantGetAllArgs & { skip: number; take: number },
	): FindManyOptions<Restaurant> {
		const where: FindOptionsWhere<Restaurant> = {};

		if (data.categoryId) {
			where.category = {
				id: data.categoryId,
			};
		}

		if (data.query) {
			where.category = {
				name: Raw((name) => `${name} ILIKE '%${data.query}%'`),
			};
		}

		return {
			skip: data.skip,
			take: data.take,
			where,
		};
	}

	async getCategoryWithAllRestaurants({
		slug,
		page,
	}: CategoryGetArgs): Promise<CategoryGetOutput> {
		const category = await this.categoryService.get(slug);
		const paginationResult = await this.getAll({
			page,
			categoryId: category.id,
		});

		return {
			category,
			...paginationResult,
		};
	}
}
