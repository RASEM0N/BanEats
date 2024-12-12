import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Raw, Repository } from 'typeorm';
import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantArgs } from '../dtos/restaurant-create.dto';
import { UpdateRestaurantArgs } from '../dtos/restaurant-update.dto';
import { DefaultCRUD } from '@ubereats/common/services';
import { CustomError, getErrorWithDefault } from '@ubereats/common/error';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { CategoryService } from './category.service';
import { RestaurantsDeleteArgs } from '../dtos/restaurant-delete.dto';
import { RestaurantGetAllArgs, RestaurantsGetAllData } from '../dtos/restaurant-get.dto';

@Injectable()
export class RestaurantService implements DefaultCRUD<Restaurant> {
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,

		// @TODO расскоментить
		// private readonly categoryService: CategoryService,
	) {}

	async get(id: number): Promise<Restaurant> {
		const restaurant = await this.restaurantRepository.findOne({
			relations: ['menu'],
			where: {
				id,
			},
		});

		if (!restaurant) {
			throw new CustomError({
				errorCode: 400,
				message: `Не нашли сущность Restaurant с id: ${id}`,
			});
		}

		return restaurant;
	}

	async getAll(args: RestaurantGetAllArgs): Promise<RestaurantsGetAllData> {
		try {
			const take = 25;
			const skip = (args.page - 1) * take;

			const paginationOptions = this.paginationOptions({
				take,
				skip,
				...args,
			});
			const [restaurants, totalCount] =
				await this.restaurantRepository.findAndCount(paginationOptions);

			const totalPages = Math.ceil(totalCount / take);

			return {
				restaurants,
				totalPages,
				totalCount,
			};
		} catch (e) {
			throw getErrorWithDefault(e, {
				message: 'Ошибка получения списка рестаранов',
				errorCode: 400,
			});
		}
	}

	async create(user: User, dto: CreateRestaurantArgs): Promise<Restaurant> {
		// @TODO по идее сюда Transaction надо пиздануть
		// т.к. одно пизданутся может

		// @TODO
		try {
			// const category = await this.categoryService.create(
			// 	dto.categoryName,
			// );

			const restaurant = this.restaurantRepository.create({
				...dto,
			});

			restaurant.category = undefined;
			return await this.restaurantRepository.save(restaurant);
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Ошибка создания ресторана',
			});
		}
	}

	async update(user: User, updateArgs: UpdateRestaurantArgs): Promise<Restaurant> {
		try {
			const restaurant = await this.restaurantRepository.findOneBy({
				id: updateArgs.restaurantId,
			});

			if (!restaurant) {
				throw new CustomError({
					errorCode: 400,
					message: 'Не нашли ресторан',
				});
			}

			if (user.id !== restaurant.id) {
				throw new CustomError({
					errorCode: 400,
					message: 'Нет прав для обновления данного ресторана',
				});
			}

			if (updateArgs.categoryName) {
				// restaurant.category = await this.categoryService.create(
				// 	updateArgs.categoryName,
				// );
			}

			return this.restaurantRepository.save({
				id: updateArgs.restaurantId,
				...updateArgs,
			});
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Ошибка обновления ресторана',
			});
		}
	}

	async delete(user: User, args: RestaurantsDeleteArgs): Promise<void> {
		try {
			const restaurant = await this.restaurantRepository.findOneBy({
				id: args.restaurantId,
			});

			if (!restaurant) {
				return;
			}

			if (restaurant.ownerId !== user.id) {
				throw new CustomError({
					errorCode: 400,
					message: 'Нет прав на удаление ресторана',
				});
			}

			await this.restaurantRepository.delete(args.restaurantId);
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Не удалось удалить ресторан',
			});
		}
	}

	async count(categoryId: number): Promise<number> {
		return this.restaurantRepository.countBy({
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
}
