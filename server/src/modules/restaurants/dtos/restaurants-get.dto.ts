import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';
import { Restaurant } from '../entities/restaurant.entity';
import { RestaurantsCategory } from '../entities/category.entity';
import { PaginationArgs, PaginationData } from '@/shared/modules/dtos/pagination.dto';

// -------------

@ObjectType()
export class RestaurantsGetAllOutput extends CoreOutput<RestaurantsGetAllData> {
	@Field(() => RestaurantsGetAllData, { nullable: true })
	data?: RestaurantsGetAllData;
}

@ObjectType()
export class RestaurantsGetAllData extends PaginationData {
	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}

// -------------

export class RestaurantsGetAllByCategoryArgs extends PaginationArgs {
	@Field(() => RestaurantsCategory)
	category: RestaurantsCategory;
}
