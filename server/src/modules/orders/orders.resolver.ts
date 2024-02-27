import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateOrdersArgs, CreateOrdersOutput } from './dtos/orders-create.dto';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { OrdersService } from './orders.service';
import { Inject } from '@nestjs/common';

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
}
