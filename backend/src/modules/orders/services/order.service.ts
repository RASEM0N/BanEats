import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, ORDER_STATUS } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Repository } from 'typeorm';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { CreateOrdersArgs, CreateOrdersOutput } from '../dto/order-create.dto';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';
import { GetAllOrdersArgs, GetAllOrdersData, GetOrdersArgs } from '../dto/order-get.dto';
import { UpdateOrdersArgs } from '../dto/order-update.dto';
import { SHARED_COMPONENTS } from '@/core/shared.module';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private readonly order: Repository<Order>,
		@InjectRepository(OrderItem)
		private readonly orderItem: Repository<OrderItem>,
		@InjectRepository(RestaurantDish)
		private readonly dish: Repository<RestaurantDish>,
		@InjectRepository(Restaurant)
		private readonly restaurant: Repository<Restaurant>,
		// @TODO так не правильно инжектить
		// хуя Service от GraphQl зависит
		@Inject(SHARED_COMPONENTS.pubSub) private readonly pubSub: PubSub,
	) {}

	async create(customer: User, args: CreateOrdersArgs): Promise<CreateOrdersOutput> {
		const restaurant = await this.restaurant.findOneOrFail({
			where: {
				id: args.restaurantId,
			},
		});

		let orderFinalPrice = 0;
		const orderItems: OrderItem[] = [];

		// @TODO вынести в метод, а то помойка пиздец
		for (const item of args.items) {
			const dish = await this.dish.findOneOrFail({
				where: {
					id: item.dishId,
				},
			});

			let dishFinalPrice = dish.price;
			for (const option of item.options) {
				const currentOption = dish.options.find((v) => v.name === option.name);

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
				const orderItem = this.orderItem.create({
					dish,
					options: item.options,
				});
				await this.orderItem.save(orderItem);
				orderItems.push(orderItem);
			}

			const order = await this.order.create({
				customer,
				restaurant,
				total: dishFinalPrice,
				items: orderItems,
			});

			orderFinalPrice += dishFinalPrice;
			await this.order.save(order);
		}

		const order = this.order.create({
			customer,
			restaurant,
			total: orderFinalPrice,
			items: orderItems,
		});

		await this.order.save(order);
		await this.pubSub.publish('pubsub:orders.createOrder', {
			order,
		});

		return {
			order,
		};
	}

	// https://orkhan.gitbook.io/typeorm/docs/find-options
	async getAll(user: User, { status }: GetAllOrdersArgs): Promise<GetAllOrdersData> {
		if (user.role === USER_ROLE.client) {
			const orders = await this.order.find({
				where: {
					customer: {
						id: user.id,
					},
					...(status && { status }),
				},
			});

			return {
				orders,
			};
		}

		if (user.role === USER_ROLE.delivery) {
			const orders = await this.order.find({
				where: {
					driver: {
						id: user.id,
					},
					...(status && { status }),
				},
			});

			return {
				orders,
			};
		}

		if (user.role === USER_ROLE.owner) {
			const restaurants = await this.restaurant.find({
				where: {
					owner: {
						id: user.id,
					},
				},
				relations: ['orders'],
			});
			const orders = restaurants.map((restaurant) => restaurant.orders).flat(1);

			return {
				orders: status
					? orders.filter((order) => order.status === status)
					: orders,
			};
		}

		return {
			orders: [],
		};
	}

	async get(user: User, { id }: GetOrdersArgs): Promise<Order> {
		const order = await this.order.findOneOrFail({
			relations: ['restaurant'],
			where: {
				id,
			},
		});

		if (!this.canGetOrder(user, order)) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_rights,
			});
		}

		return order;
	}

	async update(user: User, updateArgs: UpdateOrdersArgs): Promise<Order> {
		const order = await this.get(user, updateArgs);
		const canEdit = this.canEdit(user, updateArgs.status);

		if (!canEdit) {
			throw new UberEastsException({
				errorCode: UBER_EATS_ERROR.no_rights,
			});
		}

		const newOrder = await this.order.save({
			...order,
			status: updateArgs.status,
		});

		await this.pubSub.publish('pubsub:orders.updateOrder', {
			order: newOrder,
		});

		return newOrder;
	}

	private canEdit(user: User, newStatus: ORDER_STATUS): boolean {
		if (user.role === USER_ROLE.admin) {
			return true;
		}

		if (user.role === USER_ROLE.client) {
			return false;
		}

		if (user.role === USER_ROLE.owner) {
			return [ORDER_STATUS.cooking, ORDER_STATUS.cooked].includes(newStatus);
		}

		if (user.role === USER_ROLE.delivery) {
			return [ORDER_STATUS.delivered, ORDER_STATUS.pickedUp].includes(newStatus);
		}

		return false;
	}

	private canGetOrder(user: User, order: Order): boolean {
		if (user.role === USER_ROLE.admin) {
			return true;
		}

		return [order.customer.id, order.driver.id, order.driver.id].includes(user.id);
	}
}
