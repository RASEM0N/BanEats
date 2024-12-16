import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { RestaurantsCategory } from '../entities/category.entity';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { PaginationArgs } from '@ubereats/common/dto';

@ObjectType()
export class CategoryGetAllOutput {
	@Field(() => [RestaurantsCategory])
	categories: RestaurantsCategory[];
}

@ArgsType()
export class CategoryGetArgs extends PaginationArgs {
	@Field(() => String)
	slug: string;
}

@ObjectType()
export class CategoryGetOutput {
	@Field(() => RestaurantsCategory)
	category: RestaurantsCategory;

	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}
