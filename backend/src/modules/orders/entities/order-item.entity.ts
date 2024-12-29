import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '@ubereats/common/entities';
import { RestaurantDish } from '@/modules/restaurants/entities/dish.entity';

// Чтоб ошикби не было
// ибо InputType и ObjectType с таким именем получается тогда

// Schema must contain uniquely named types
// but contains multiple types named "OrderItemOption"
@InputType('OrderItemOptionInputType', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
	@Field(() => String)
	name: string;

	@Field(() => Number, { nullable: true })
	choice?: string;
}

@ObjectType()
@Entity({ name: 'OrderItem' })
export class OrderItem extends CoreEntity {
	@Field(() => RestaurantDish)
	@ManyToOne(() => RestaurantDish, { nullable: true, onDelete: 'CASCADE' })
	dish: RestaurantDish;

	@Field(() => [OrderItemOption], { nullable: true })
	@Column({ type: 'json', nullable: true })
	options?: OrderItemOption[];
}
