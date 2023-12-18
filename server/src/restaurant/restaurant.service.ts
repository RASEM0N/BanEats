import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create.dto';

@Injectable()
export class RestaurantService {
	// https://typeorm.io/active-record-data-mapper
	// идем по паттерну Data Mapper
	constructor(
		@Inject() private readonly restaurantRepository: Repository<Restaurant>,
	) {}

	async getAll(): Promise<Restaurant[]> {
		return this.restaurantRepository.find();
	}

	async create(dto: CreateRestaurantDto): Promise<Restaurant> {
		const restaurant = new Restaurant();
		restaurant.name = dto.name;
		restaurant.address = dto.address;
		restaurant.category = dto.category;
		restaurant.isVegan = dto.isVegan;
		restaurant.ownersName = dto.ownersName;
		await this.restaurantRepository.save(dto);
		return restaurant;
	}
}
