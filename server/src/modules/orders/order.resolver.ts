import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateOrdersArgs, CreateOrdersOutput } from './dto/order-create.dto';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { Roles } from '@/modules/authorization/decorators/role.decorator';
import { OrderService } from './order.service';
import { Inject } from '@nestjs/common';
import {
	GetAllOrdersArgs,
	GetAllOrdersOutput,
	GetOrderOutput,
	GetOrdersArgs,
} from './dto/order-get.dto';
import {
	UpdateOrdersArgs,
	UpdateOrdersData,
	UpdateOrdersOutput,
} from './dto/order-update.dto';
import { Order } from '@/modules/orders/entities/order.entity';
import { SHARED_COMPONENTS } from '@/core/shared.module';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class OrderResolver {
	constructor(
		private readonly ordersService: OrderService,
		@Inject(SHARED_COMPONENTS.pubSub) private readonly pubSub: PubSub,
	) {}

	@Roles([USER_ROLE.client])
	@Mutation(() => CreateOrdersOutput, { name: 'OrderCreate' })
	async create(
		@AuthUser() user: User,
		@Args() args: CreateOrdersArgs,
	): Promise<CreateOrdersOutput> {
		const data = await this.ordersService.create(user, args);
		return { data };
	}

	@Mutation(() => UpdateOrdersOutput, { name: 'OrderUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() args: UpdateOrdersArgs,
	): Promise<UpdateOrdersOutput> {
		const updatedOrder = await this.ordersService.update(user, args);
		return { data: { order: updatedOrder } };
	}

	@Query(() => GetAllOrdersOutput, { name: 'OrderGetAll' })
	async getAll(
		@AuthUser() user: User,
		@Args() args: GetAllOrdersArgs,
	): Promise<GetAllOrdersOutput> {
		const data = await this.ordersService.getAll(user, args);
		return { data };
	}

	@Query(() => GetOrderOutput, { name: 'OrderGet' })
	async get(@AuthUser() user: User, args: GetOrdersArgs): Promise<GetOrderOutput> {
		const order = await this.ordersService.get(user, args);
		return { data: { order } };
	}

	@Subscription(() => Order, {
		name: 'OnOrderUpdate',
		filter: (
			{ order }: UpdateOrdersData,
			_: UpdateOrdersArgs,
			{ user }: { user: User },
		) => {
			return [order.driver.id, order.customer.id, order.restaurant.id].includes(
				user.id,
			);
		},
	})
	async onUpdate() {
		this.pubSub.asyncIterator('pubsub:orders.updateOrder');
	}

	@Subscription(() => Order, {
		name: 'OnOrderCreate',
	})
	async onCreateOrder() {
		this.pubSub.asyncIterator('pubsub:orders.createOrder');
	}
}
