import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { CoreEntity } from '@/shared/modules/entities/core.entity';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { User } from '@/modules/users/entities/user.entity';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';

export enum ORDER_STATUS {
	pending = 'pending',
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

	@Field(() => Number)
	@Column()
	total: number;

	@Field(() => ORDER_STATUS)
	@Column({
		type: 'enum',
		enum: ORDER_STATUS,
	})
	status: ORDER_STATUS;
}
