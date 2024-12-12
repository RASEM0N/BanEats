import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultCRUD } from '@ubereats/common/services';
import { User } from '@/modules/users/entities/user.entity';

import { RestaurantService } from './restaurant.service';
import { RestaurantDish } from '../entities/dish.entity';
import { CreateDishArgs } from '../dtos/dish-create.dto';
import { UpdateDishArgs } from '../dtos/dish-update.dto';
import { DeleteDishArgs } from '../dtos/dish-delete.dto';
import { CustomError, getErrorWithDefault } from '@ubereats/common/error';

@Injectable()
export class DishService implements DefaultCRUD<RestaurantDish> {
	constructor(
		@InjectRepository(RestaurantDish)
		private readonly dish: Repository<RestaurantDish>,
		private readonly restaurantService: RestaurantService,
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
				// @TODO 400 не надо обрабатывать
				throw new CustomError({
					message: 'К данному ресторану нет доступа',
					errorCode: 400,
				});
			}

			return this.dish.save(
				this.dish.create({
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
			const dish = await this.dish.findOne({
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

			return this.dish.save({
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
			const dish = await this.dish.findOne({
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

			await this.dish.delete(dish.id);
		} catch (e) {
			throw getErrorWithDefault(e, {
				message: 'Ошибка удаления блюда',
				errorCode: 400,
			});
		}
	}
}
