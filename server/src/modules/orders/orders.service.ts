import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@/modules/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { CreateOrdersArgs, CreateOrdersData } from './dtos/orders-create.dto';
import { OrderItem } from '@/modules/orders/entities/order-item.entity';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';
import { CustomError, getErrorWithDefault } from '@/shared/lib/custom-error';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(OrderItem)
		private readonly orderItemRepository: Repository<OrderItem>,
		@InjectRepository(RestaurantDish)
		private readonly dishRepository: Repository<RestaurantDish>,
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,
	) {}

	async create(customer: User, args: CreateOrdersArgs): Promise<CreateOrdersData> {
		try {
			const restaurant = await this.restaurantRepository.findOneOrFail({
				where: {
					id: args.restaurantId,
				},
			});

			let orderFinalPrice = 0;
			const orderItems: OrderItem[] = [];

			// @TODO вынести в метод, а то помойка пиздец
			for (const item of args.items) {
				const dish = await this.dishRepository.findOneOrFail({
					where: {
						id: item.dishId,
					},
				});

				let dishFinalPrice = dish.price;
				for (const option of item.options) {
					const currentOption = dish.options.find(
						(v) => v.name === option.name,
					);

					if (!currentOption) {
						continue;
					}

					if (!currentOption.extra) {
						dishFinalPrice = dishFinalPrice + currentOption.extra;
						continue;
					}

					const dishChoice = currentOption.choices.find(
						(v) => v.name === option.choice,
					);

					if (!dishChoice.extra) {
						continue;
					}

					dishFinalPrice += dishChoice.extra;
					const orderItem = this.orderItemRepository.create({
						dish,
						options: item.options,
					});
					await this.orderItemRepository.save(orderItem);
					orderItems.push(orderItem);
				}

				const order = await this.orderRepository.create({
					customer,
					restaurant,
					total: dishFinalPrice,
					items: orderItems,
				});

				orderFinalPrice += dishFinalPrice;
				await this.orderRepository.save(order);
			}

			const order = this.orderRepository.create({
				customer,
				restaurant,
				total: orderFinalPrice,
				items: orderItems,
			});

			await this.orderRepository.save(order);

			return {
				order,
			};
		} catch (e) {
			throw getErrorWithDefault(e, {
				errorCode: 400,
				message: 'Не удалось создать заказ',
			});
		}
	}
}
