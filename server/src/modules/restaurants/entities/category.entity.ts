import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from '@ubereats/common/entities';
import { Restaurant } from './restaurant.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({
	name: 'restaurantsCategory',
})
export class RestaurantsCategory extends CoreEntity {
	@Field(() => String)
	@Column({ unique: true })
	@IsString()
	@Length(5)
	name: string;

	@Field(() => String)
	@Column({ unique: true })
	@IsString()
	slug: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	@IsString()
	coverImage?: string;

	@Field(() => String)
	@Column()
	@IsString()
	address: string;

	@Field(() => [Restaurant], { nullable: true })
	@OneToMany(() => Restaurant, (restaurant) => restaurant.category)
	restaurants: Restaurant[];
}
