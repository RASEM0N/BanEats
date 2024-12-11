import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '@ubereats/common/entities';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'Rerification' })
export class Verification extends CoreEntity {
	@Field(() => String)
	@Column()
	code: string;

	@OneToOne(() => User, {
		// удалим пользователя, удалится и подтверждение с ним
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: User;

	@BeforeInsert()
	private createCore(): void {
		this.code = uuidv4();
	}
}
