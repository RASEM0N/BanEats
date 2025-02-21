import { ArgsType, Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { PaginationArgs, PaginationData } from '@baneats/common/dto';

@ArgsType()
export class RestaurantGetArgs {
	@Field(() => ID!)
	restaurantId: number;
}

@ObjectType()
export class RestaurantGetOutput {
	@Field(() => Restaurant)
	restaurant: Restaurant;
}

@ArgsType()
export class RestaurantGetAllArgs extends PaginationArgs {
	@Field(() => String, { nullable: true })
	query?: string;

	@Field(() => String, { nullable: true })
	categoryId?: number;
}

@ObjectType()
export class RestaurantsGetAllOutput extends PaginationData {
	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}

@ObjectType()
export class RestaurantsGetAllMyOutput {
	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}
