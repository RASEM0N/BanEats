import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from '@baneats/common/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Order } from '@/modules/orders/entities/order.entity';
import { RestaurantsCategory } from './category.entity';
import { RestaurantDish } from './dish.entity';

@ObjectType()
@Entity({ name: 'Restaurant' })
export class Restaurant extends CoreEntity {
	@Field(() => String)
	@Column()
	@IsString()
	@Length(5, 255)
	name: string;

	@Field(() => String)
	@Column()
	@IsString()
	coverImage: string;

	@Field(() => String)
	@Column()
	@IsString()
	@Length(5, 255)
	address: string;
	@Field(() => RestaurantsCategory)
	@ManyToOne(() => RestaurantsCategory, (category) => category.restaurants, {
		nullable: true,
		eager: true,
		onDelete: 'SET NULL',
	})
	category: RestaurantsCategory;

	@OneToMany(() => RestaurantDish, (dish) => dish.restaurant)
	dishes: RestaurantDish[];

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.restaurant, { onDelete: 'CASCADE' })
	owner: User;

	@Field(() => [Order])
	@OneToMany(() => Order, (order) => order.restaurant, {
		onDelete: 'SET NULL',
		nullable: true,
	})
	orders: Order[];

	@RelationId((restaurant: Restaurant) => restaurant.owner)
	ownerId: number;
}
