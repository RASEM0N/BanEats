import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '@/shared/entities/core.entity';
import { User } from '@/modules/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@Entity({
	name: 'verification',
})
export class Verification extends CoreEntity {
	@Field(() => String)
	@Column()
	code: string;

	@OneToOne(() => User, {
		// если Пользователь удалится то и подтверждение тоже тоже
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	user: User;

	@BeforeInsert()
	private createCore(): void {
		this.code = uuidv4();
	}
}
