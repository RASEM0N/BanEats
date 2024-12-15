import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@ubereats/common/dto';
import { Restaurant } from '../entities/restaurant.entity';
import { PaginationArgs, PaginationData } from '@ubereats/common/dto';

// -------------

@ArgsType()
export class RestaurantGetAllArgs extends PaginationArgs {
	@Field(() => String, { nullable: true })
	query?: string;

	@Field(() => String, { nullable: true })
	categoryId?: number;
}

@ObjectType()
export class RestaurantsGetAllData extends PaginationData {
	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}

@ObjectType()
export class RestaurantsGetAllOutput extends CoreOutput<RestaurantsGetAllData> {
	@Field(() => RestaurantsGetAllData, { nullable: true })
	data?: RestaurantsGetAllData;
}
