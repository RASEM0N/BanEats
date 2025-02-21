import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from '@baneats/common/entities';
import { IsBoolean, IsEmail, IsEnum, Length } from 'class-validator';
import { hash, genSalt, compare } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { Order } from '@/modules/orders/entities/order.entity';

export enum USER_ROLE {
	admin = 'admin',
	client = 'client',
	owner = 'owner',
	delivery = 'delivery',
}

// @TODO добавить описание
registerEnumType(USER_ROLE, { name: 'USER_ROLE' });

@ObjectType()
@Entity({ name: 'User' })
export class User extends CoreEntity {
	@Field(() => String, { description: 'Min 4, Max 40' })
	@Column({ unique: true })
	@IsEmail()
	@Length(4, 40)
	email: string;

	@Field(() => String, { description: 'Min 10, Max 40' })
	@Column()
	@Length(10, 40)
	password: string;

	@Field(() => USER_ROLE)
	@Column({
		type: 'enum',
		enum: USER_ROLE,
	})
	@IsEnum(USER_ROLE)
	role: USER_ROLE;

	@Field(() => Boolean)
	@Column({ default: false })
	@IsBoolean()
	isVerified: boolean;

	@Field(() => [Restaurant])
	@OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
	restaurant: Restaurant[];

	@Field(() => [Order])
	@OneToMany(() => Order, (order) => order.customer)
	orders: Order[];

	@Field(() => [Order])
	@OneToMany(() => Order, (order) => order.driver)
	rides: Order[];

	/**
	 * @see https://orkhan.gitbook.io/typeorm/docs/listeners-and-subscribers
	 */
	@BeforeInsert()
	@BeforeUpdate()
	private async hashPassword(): Promise<void> {
		try {
			/**
			 * Technique 1
			 * @see https://www.npmjs.com/package/bcrypt#usage
			 */
			const salt = await genSalt(10);
			this.password = await hash(this.password, salt);
		} catch (e) {
			// TODO надо бы на логгер заменить это бы...
			// или в общем обработчике лучше сделать
			console.error(e);
			throw new InternalServerErrorException();
		}
	}

	public async isValidPassword(password: string): Promise<boolean> {
		try {
			return compare(password, this.password);
		} catch (e) {
			return false;
		}
	}
}
