import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from '@/shared/modules/entities/core.entity';
import { RestaurantsCategory } from './restaurants-category.entity';
import { User } from '@/modules/users/entities/user.entity';

// Чтоб использовать OmitType
// для create.dto т.к. create.dto это InputType
@InputType({ isAbstract: true })
@ObjectType()
@Entity({
	name: 'restaurant',
})
export class Restaurant extends CoreEntity {
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

	@Field(() => RestaurantsCategory)
	@ManyToOne(() => RestaurantsCategory, (category) => category.restaurants)
	category: RestaurantsCategory;

	@Field(() => User, { nullable: true })
	@OneToMany(() => User, (user) => user.restaurant, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	owner: User;
}
