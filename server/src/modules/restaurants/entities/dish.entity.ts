import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from '@/shared/modules/entities/core.entity';
import { Restaurant } from './restaurant.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({
	name: 'restaurantsDish',
})
export class RestaurantDish extends CoreEntity {
	@Field(() => String)
	@Column()
	@Length(5)
	name: string;

	@Field(() => String)
	@Column()
	@Length(5)
	description: string;

	@Field(() => Number)
	@Column()
	@IsNumber()
	price: number;

	@Field(() => String)
	@Column()
	@IsString()
	photo: string;

	@Field(() => Restaurant)
	@ManyToOne(() => Restaurant, (restaurant) => restaurant.dishes, {
		onDelete: 'CASCADE',
	})
	restaurant: Restaurant;

	@Field(() => Number)
	@RelationId((v: RestaurantDish) => v.restaurant)
	restaurantId: number;
}
