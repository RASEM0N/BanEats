import { Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from '@/shared/entities/core.entity';
import { IsEmail, IsEnum, IsNumberString, Length } from 'class-validator';

enum UserRole {
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
	isVerified: boolean;
}
