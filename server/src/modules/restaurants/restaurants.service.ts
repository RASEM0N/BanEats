import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create.dto';
import { UpdateRestaurantDto } from './dtos/update.dto';
import { DefaultCRUD } from '@/shared/modules/services/default-crud.service';
import { CustomError } from '@/shared/lib/custom-error';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RestaurantsService implements DefaultCRUD<Restaurant> {
	// https://typeorm.io/active-record-data-mapper
	// идем по паттерну Data Mapper
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,
	) {}

	async get(id: number): Promise<Restaurant> {
		const restaurant = await this.restaurantRepository.findOne({
			where: { id },
		});

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

	async create(dto: CreateRestaurantDto): Promise<Restaurant> {
		const restaurant = this.restaurantRepository.create({
			...dto,
		});
		return await this.restaurantRepository.save(restaurant);
	}

	async update({ id, input }: UpdateRestaurantDto): Promise<Restaurant> {
		const restaurant = await this.get(id);

		return this.restaurantRepository.save({
			id,
			...restaurant,
			...input,
		});
	}
}
