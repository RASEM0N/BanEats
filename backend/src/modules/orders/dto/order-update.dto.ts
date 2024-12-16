import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';

@ArgsType()
export class UpdateOrdersArgs extends PickType(Order, ['id', 'status'], ArgsType) {}

@ObjectType()
export class UpdateOrdersOutput {
	@Field(() => Order)
	order: Order;
}
