import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CoreEntity } from '@/shared/modules/entities/core.entity';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { User } from '@/modules/users/entities/user.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';
import { OrderItem } from '@/modules/orders/entities/order-item.entity';

export enum ORDER_STATUS {
	pending = 'pending',
	cooked = 'cooked',
	cooking = 'cooking',
	pickedUp = 'pickedUp',
	delivered = 'delivered',
}

registerEnumType(ORDER_STATUS, { name: 'ORDER_STATUS' });

@ObjectType()
@Entity({
	name: 'order',
})
export class Order extends CoreEntity {
	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.orders, {
		onDelete: 'SET NULL',
		nullable: true,
	})
	customer?: User;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, (user) => user.orders, {
		onDelete: 'SET NULL',
		nullable: true,
	})
	driver?: User;

	@Field(() => Restaurant)
	@ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
		onDelete: 'SET NULL',
		nullable: true,
	})
	restaurant: Restaurant;

	@Field(() => [RestaurantDish])
	@ManyToMany(() => RestaurantDish)
	dish: RestaurantDish;

	@Field(() => [OrderItem])
	@ManyToMany(() => OrderItem, { eager: true })
	@JoinTable()
	items: OrderItem[];

	@Field(() => Number)
	@Column()
	total: number;

	@Field(() => ORDER_STATUS)
	@Column({
		type: 'enum',
		enum: ORDER_STATUS,
		default: ORDER_STATUS.pending,
	})
	status: ORDER_STATUS;
}
