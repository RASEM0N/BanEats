import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultCRUD } from '@ubereats/common/services';
import { User } from '@/modules/users/entities/user.entity';

import { RestaurantsService } from './restaurants.service';
import { RestaurantDish } from './entities/dish.entity';
import { CreateDishArgs } from './dtos/dish-create.dto';
import { UpdateDishArgs } from './dtos/dish-update.dto';
import { DeleteDishArgs } from './dtos/dish-delete.dto';
import { CustomError, getErrorWithDefault } from '@/shared/lib/custom-error';

@Injectable()
export class DishService implements DefaultCRUD<RestaurantDish> {
	constructor(
		@InjectRepository(RestaurantDish)
		private readonly dishService: Repository<RestaurantDish>,
		@Inject() private readonly restaurantService: RestaurantsService,
	) {}

	async get(): Promise<RestaurantDish> {
		return undefined as RestaurantDish;
	}

	async getAll(): Promise<RestaurantDish[]> {
		return undefined as RestaurantDish[];
	}

	async create(user: User, args: CreateDishArgs): Promise<RestaurantDish> {
		try {
			const restaurant = await this.restaurantService.get(args.restaurantId);

			if (restaurant.ownerId !== user.id) {
				throw new CustomError({
					message: 'К данному ресторану нет доступа',
					errorCode: 400,
				});
			}

			return this.dishService.save(
				this.dishService.create({
					...args,
					restaurant,
				}),
			);
		} catch (e) {
			throw getErrorWithDefault(e, {
				message: 'Ошибка создания блюда',
				errorCode: 400,
			});
		}
	}

	async update(user: User, args: UpdateDishArgs): Promise<RestaurantDish> {
		try {
			const dish = await this.dishService.findOne({
				relations: ['restaurant'],
				where: {
					id: args.dishId,
				},
			});

			if (!dish) {
				throw new CustomError({
					message: 'Такого блюда нет',
					errorCode: 400,
				});
			}

			if (dish.restaurant.ownerId !== user.id) {
				throw new CustomError({
					message: 'К данному блюду нет доступа',
					errorCode: 400,
				});
			}

			return this.dishService.save({
				id: args.dishId,
				...dish,
				...args,
			});
		} catch (e) {
			throw getErrorWithDefault(e, {
				message: 'Ошибка обновления блюда',
				errorCode: 400,
			});
		}
	}

	async delete(user: User, args: DeleteDishArgs): Promise<void> {
		try {
			const dish = await this.dishService.findOne({
				relations: ['restaurant'],
				where: {
					id: args.dishId,
				},
			});

			if (!dish) {
				throw new CustomError({
					message: 'Такого блюда нет',
					errorCode: 400,
				});
			}

			if (dish.restaurant.ownerId !== user.id) {
				throw new CustomError({
					message: 'К данному блюду нет доступа',
					errorCode: 400,
				});
			}

			await this.dishService.delete(dish.id);
		} catch (e) {
			throw getErrorWithDefault(e, {
				message: 'Ошибка удаления блюда',
				errorCode: 400,
			});
		}
	}
}
