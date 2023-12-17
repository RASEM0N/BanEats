import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
	@Field(() => Number)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => String)
	@Column({ type: 'string' })
	name: string;

	@Field(() => Boolean)
	@Column({ type: 'boolean' })
	isVegan: boolean;

	@Field(() => String)
	@Column({ type: 'string' })
	address: string;

	@Field(() => String)
	@Column({ type: 'string' })
	ownersName: string;

	@Field(() => String)
	@Column({ type: 'string' })
	category: string;
}
