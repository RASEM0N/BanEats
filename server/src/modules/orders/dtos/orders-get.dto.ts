import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dtos';
import { Order, ORDER_STATUS } from '../entities/order.entity';

@ArgsType()
export class GetAllOrdersArgs {
	@Field(() => ORDER_STATUS, { nullable: true })
	status?: ORDER_STATUS;
}

@ObjectType()
export class GetAllOrdersData {
	@Field(() => [Order])
	orders?: Order[];
}

@ObjectType()
export class GetAllOrdersOutput extends CoreOutput<GetAllOrdersData> {
	@Field(() => GetAllOrdersData, { nullable: true })
	data?: GetAllOrdersData;
}

@ArgsType()
export class GetOrdersArgs {
	@Field(() => Number)
	id: number;
}

@ObjectType()
export class GetOrdersData {
	@Field(() => Order)
	order: Order;
}

@ObjectType()
export class GetOrderOutput extends CoreOutput<GetOrdersData> {
	@Field(() => GetOrdersData, { nullable: true })
	data?: GetOrdersData;
}
