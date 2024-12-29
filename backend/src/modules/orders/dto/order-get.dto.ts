import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Order, ORDER_STATUS } from '../entities/order.entity';

@ArgsType()
export class GetAllOrdersArgs {
	@Field(() => ORDER_STATUS, { nullable: true })
	status?: ORDER_STATUS;
}

@ObjectType()
export class GetAllOrdersOutput {
	@Field(() => [Order])
	orders?: Order[];
}

@ArgsType()
export class GetOrderArgs {
	@Field(() => Number)
	orderId: number;
}

@ObjectType()
export class GetOrderOutput {
	@Field(() => Order)
	order: Order;
}
