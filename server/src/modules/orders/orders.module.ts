import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Order, OrderItem])],
	providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
