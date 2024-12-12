import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Order, OrderItem, RestaurantDish, Restaurant])],
	providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
