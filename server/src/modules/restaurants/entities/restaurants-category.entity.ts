import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({
	name: 'restaurantsCategory',
})
export class RestaurantsCategory {
	@Field(() => String)
	@Column()
	@IsString()
	@Length(5)
	name: string;

	@Field(() => String)
	@Column()
	@IsString()
	coverImage: string;

	@Field(() => String)
	@Column()
	@IsString()
	address: string;

	@Field(() => [Restaurant])
	@OneToMany(() => Restaurant, (restaurant) => restaurant.category)
	restaurants: Restaurant[];
}
