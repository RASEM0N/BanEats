import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrdersArgs, CreateOrdersOutput } from './dtos/orders-create.dto';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { OrdersService } from './orders.service';
import { Inject } from '@nestjs/common';
import {
	GetAllOrdersArgs,
	GetAllOrdersOutput,
	GetOrderOutput,
	GetOrdersArgs,
} from './dtos/orders-get.dto';
import { UpdateOrdersArgs, UpdateOrdersOutput } from './dtos/orders-update.dto';

@Resolver()
export class OrdersResolver {
	constructor(@Inject() private readonly ordersService: OrdersService) {}

	@Mutation(() => CreateOrdersOutput, { name: 'ordersCreate' })
	@AuthRoles([USER_ROLE.client])
	async create(
		@AuthUser() user: User,
		@Args() args: CreateOrdersArgs,
	): Promise<CreateOrdersOutput> {
		try {
			const data = await this.ordersService.create(user, args);

			return {
				isOk: true,
				data,
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}

	@Mutation(() => UpdateOrdersOutput, { name: 'ordersUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() args: UpdateOrdersArgs,
	): Promise<UpdateOrdersOutput> {
		const updatedOrder = await this.ordersService.update(user, args);

		return {
			isOk: true,
			data: {
				order: updatedOrder,
			},
		};
	}

	@Query(() => GetAllOrdersOutput, { name: 'orderGetAll' })
	async getAll(
		@AuthUser() user: User,
		@Args() args: GetAllOrdersArgs,
	): Promise<GetAllOrdersOutput> {
		try {
			const data = await this.ordersService.getAll(user, args);

			return {
				isOk: true,
				data,
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}

	@Query(() => GetOrderOutput, { name: 'orderGet' })
	async get(@AuthUser() user: User, args: GetOrdersArgs): Promise<GetOrderOutput> {
		try {
			const order = await this.ordersService.get(user, args);

			return {
				isOk: true,
				data: {
					order,
				},
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}
}
