import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';
import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
export class CreateOrderItemArgs {
	@Field(() => Number)
	dishId: number;

	@Field(() => [OrderItemOption], { nullable: true })
	options?: OrderItemOption[];
}

@ArgsType()
export class CreateOrdersArgs {
	@Field(() => Number)
	restaurantId: number;

	@Field(() => [CreateOrderItemArgs])
	items: CreateOrderItemArgs[];
}

@ObjectType()
export class CreateOrdersOutput {
	@Field(() => Order)
	order: Order;
}
