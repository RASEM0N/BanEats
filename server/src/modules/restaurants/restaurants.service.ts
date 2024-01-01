import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantArgs } from './dtos/restaurants-create.dto';
import { UpdateRestaurantArgs } from './dtos/restaurants-update.dto';
import { DefaultCRUD } from '@/shared/modules/services/default-crud.service';
import { CustomError, getErrorWithDefault } from '@/shared/lib/custom-error';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { RestaurantsCategoryService } from './restaurants-category.service';

@Injectable()
export class RestaurantsService implements DefaultCRUD<Restaurant> {
	// https://typeorm.io/active-record-data-mapper
	// идем по паттерну Data Mapper
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,
		@Inject() private readonly restaurantCategoryService: RestaurantsCategoryService,
	) {}

	async get(id: number): Promise<Restaurant> {
		const restaurant = await this.restaurantRepository.findOneBy({ id });

		if (!restaurant) {
			throw new CustomError({
				errorCode: 400,
				message: `Не нашли сущность Restaurant с id: ${id}`,
			});
		}

		return restaurant;
	}

	async getAll(): Promise<Restaurant[]> {
		return this.restaurantRepository.find();
	}

	async create(user: User, dto: CreateRestaurantArgs): Promise<Restaurant> {
		// @TODO по идее сюда Transaction надо пиздануть
		// т.к. одно пизданутся может
		try {
			const category = await this.restaurantCategoryService.create(
				dto.categoryName,
			);

			const restaurant = this.restaurantRepository.create({
				...dto,
			});

			restaurant.category = category;
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
			const restaurant = await this.get(updateArgs.restaurantId);

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
				restaurant.category = await this.restaurantCategoryService.create(
					updateArgs.categoryName,
				);
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
}
