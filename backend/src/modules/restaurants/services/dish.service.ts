import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultCRUD } from '@ubereats/common/services';
import { User } from '@/modules/users/entities/user.entity';

import { RestaurantService } from './restaurant.service';
import { RestaurantDish } from '../entities/dish.entity';
import { CreateDishArgs } from '../dto/dish-create.dto';
import { UpdateDishArgs } from '../dto/dish-update.dto';
import { DeleteDishArgs } from '../dto/dish-delete.dto';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';

@Injectable()
export class DishService implements DefaultCRUD<RestaurantDish> {
	constructor(
		@InjectRepository(RestaurantDish)
		private readonly dish: Repository<RestaurantDish>,
		private readonly restaurantService: RestaurantService,
	) {}

	async get(): Promise<RestaurantDish> {
		throw new UberEastsException({
			errorCode: UBER_EATS_ERROR.server_error,
			message: 'Not done method yet',
		});
	}

	async getAll(): Promise<RestaurantDish[]> {
		throw new UberEastsException({
			errorCode: UBER_EATS_ERROR.server_error,
			message: 'Not done method yet',
		});
	}

	async getOrCreate(user: User, args: CreateDishArgs): Promise<RestaurantDish> {
		const restaurant = await this.restaurantService.get(user, args.restaurantId);

		return this.dish.save(
			this.dish.create({
				...args,
				restaurant,
			}),
		);
	}

	async update(user: User, args: UpdateDishArgs): Promise<RestaurantDish> {
		const dish = await this.dish.findOne({
			relations: ['restaurant'],
			where: {
				id: args.dishId,
			},
		});

		if (!dish) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_entity,
				message: 'There is no dish',
			});
		}

		if (dish.restaurant.ownerId !== user.id) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_entity,
			});
		}

		return this.dish.save({
			id: args.dishId,
			...dish,
			...args,
		});
	}

	async delete(user: User, args: DeleteDishArgs): Promise<void> {
		const dish = await this.dish.findOne({
			relations: ['restaurant'],
			where: {
				id: args.dishId,
			},
		});

		if (!dish) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_entity,
				message: 'There is no dish',
			});
		}

		if (dish.restaurant.ownerId !== user.id) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_rights,
			});
		}

		await this.dish.delete(dish.id);
	}
}
