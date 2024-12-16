import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dto';
import { Order } from '../entities/order.entity';

@ArgsType()
export class UpdateOrdersArgs extends PickType(Order, ['id', 'status'], ArgsType) {}

@ObjectType()
export class UpdateOrdersData {
	@Field(() => Order)
	order: Order;
}

@ObjectType()
export class UpdateOrdersOutput extends CoreOutput<UpdateOrdersData> {
	@Field(() => UpdateOrdersData, { nullable: true })
	data?: UpdateOrdersData;
}
