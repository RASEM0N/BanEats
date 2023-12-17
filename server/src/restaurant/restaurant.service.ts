import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
	constructor(
		@Inject() private readonly restaurantRepository: Repository<Restaurant>,
	) {}

	async getAll(): Promise<Restaurant[]> {
		return this.restaurantRepository.find();
	}
}
