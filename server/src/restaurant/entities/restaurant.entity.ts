import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

// Чтоб использовать OmitType
// для create.dto т.к. create.dto это InputType
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
	@Field(() => Number)
	@PrimaryGeneratedColumn()
	@IsNumber()
	id: number;

	@Field(() => String)
	@Column({ type: 'string' })
	@IsString()
	@Length(5, 100)
	name: string;

	@Field(() => Boolean)
	@Column({ type: 'boolean' })
	@IsBoolean()
	isVegan: boolean;

	@Field(() => String)
	@Column({ type: 'string' })
	@IsString()
	@Length(5, 255)
	address: string;

	@Field(() => String)
	@Column({ type: 'string' })
	@IsString()
	@Length(5, 255)
	ownersName: string;

	@Field(() => String)
	@Column({ type: 'string' })
	@IsString()
	@Length(5, 100)
	category: string;
}
