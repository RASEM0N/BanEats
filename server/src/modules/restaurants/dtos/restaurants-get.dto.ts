import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';
import { Restaurant } from '../entities/restaurant.entity';

@ObjectType()
export class RestaurantsGetAllOutput extends CoreOutput<RestaurantsGetAllData> {
	@Field(() => RestaurantsGetAllData, { nullable: true })
	data?: RestaurantsGetAllData;
}

@ObjectType()
export class RestaurantsGetAllData {
	@Field(() => [Restaurant])
	restaurants: Restaurant[];
}
