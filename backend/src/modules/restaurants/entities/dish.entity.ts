import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { IsNumber, IsString, Length, IsOptional } from 'class-validator';
import { CoreEntity } from '@baneats/common/entities';
import { Restaurant } from './restaurant.entity';

@InputType('DishChoiceInput', { isAbstract: true })
@ObjectType()
export class DishChoice {
	@Field(() => String)
	name: string;

	@Field(() => Number, { nullable: true })
	extra?: number;
}

@InputType('DishOptionInput', { isAbstract: true })
@ObjectType()
export class DishOption {
	@Field(() => String)
	name: string;

	@Field(() => [DishChoice], { nullable: true })
	choices?: DishChoice[];

	@Field(() => Number, { nullable: true })
	extra?: number;
}

@ObjectType()
@Entity({ name: 'RestaurantsDish' })
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

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	@IsOptional()
	@IsString()
	photo?: string;

	@Field(() => Restaurant)
	@ManyToOne(() => Restaurant, (restaurant) => restaurant.dishes, {
		onDelete: 'CASCADE',
	})
	restaurant: Restaurant;

	@Field(() => Number)
	@RelationId((v: RestaurantDish) => v.restaurant)
	restaurantId: number;

	@Field(() => [DishOption], { nullable: true })
	@Column({ type: 'json', nullable: true })
	options?: DishOption[];
}
