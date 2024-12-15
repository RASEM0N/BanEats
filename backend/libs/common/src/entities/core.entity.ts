import { Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsPositive } from 'class-validator';

export class CoreEntity {
	@Field(() => Number)
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
