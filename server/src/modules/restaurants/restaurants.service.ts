import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dtos/create.dto';
import { UpdateRestaurantDto } from './dtos/update.dto';
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

	async create(user: User, dto: CreateRestaurantInput): Promise<Restaurant> {
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

	async update({ id, input }: UpdateRestaurantDto): Promise<Restaurant> {
		const restaurant = await this.get(id);

		return this.restaurantRepository.save({
			id,
			...restaurant,
			...input,
		});
	}
}
