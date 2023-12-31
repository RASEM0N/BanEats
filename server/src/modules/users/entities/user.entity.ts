import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from '@/shared/modules/entities/core.entity';
import { IsBoolean, IsEmail, IsEnum, Length } from 'class-validator';
import { hash, genSalt, compare } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';

export enum UserRole {
	client = 'client',
	owner = 'owner',
	delivery = 'delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity({
	name: 'user',
})
export class User extends CoreEntity {
	@Field(() => String)
	@Column({ unique: true })
	@IsEmail()
	@Length(4, 40)
	email: string;

	@Column()
	@Length(10, 40)
	password: string;

	@Field(() => UserRole)
	@Column({
		type: 'enum',
		enum: UserRole,
	})
	@IsEnum(UserRole)
	role: UserRole;

	@Field(() => Boolean)
	@Column({ default: false })
	@IsBoolean()
	isVerified: boolean;

	@Field(() => [Restaurant])
	@OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
	restaurant: Restaurant[];

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
