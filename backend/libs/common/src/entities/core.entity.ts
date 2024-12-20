import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsPositive } from 'class-validator';

@ObjectType()
export class CoreEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	@IsInt()
	@IsPositive()
	id: number;

	@Field(() => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updatedAt: Date;
}
