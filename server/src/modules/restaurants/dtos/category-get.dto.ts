import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';
import { RestaurantsCategory } from '../entities/category.entity';
import { Restaurant } from '@/modules/restaurants/entities/restaurant.entity';
import { PaginationArgs, PaginationData } from '@/shared/modules/dtos/pagination.dto';

// -------------

@ObjectType()
export class CategoryGetAllData {
	@Field(() => [RestaurantsCategory])
	categories: RestaurantsCategory[];
}

@ObjectType()
export class CategoryGetAllOutput extends CoreOutput<CategoryGetAllData> {
	@Field(() => CategoryGetAllData, { nullable: true })
	data?: CategoryGetAllData;
}

// -------------

@ArgsType()
export class CategoryGetArgs extends PaginationArgs {
	@Field(() => String)
	slug: string;
}

@ObjectType()
export class CategoryGetData extends PaginationData {
	@Field(() => RestaurantsCategory)
	category: RestaurantsCategory;

	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}

@ObjectType()
export class CategoryGetOutput extends CoreOutput<CategoryGetData> {
	@Field(() => CategoryGetData, { nullable: true })
	data?: CategoryGetData;
}
