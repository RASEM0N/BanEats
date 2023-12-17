import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

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
}
