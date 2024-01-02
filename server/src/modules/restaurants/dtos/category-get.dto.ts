import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@/shared/modules/dtos/core.dto';
import { RestaurantsCategory } from '../entities/category.entity';

@ObjectType()
export class CategoryGetAllOutput extends CoreOutput<CategoryGetAllData> {
	@Field(() => CategoryGetAllData, { nullable: true })
	data?: CategoryGetAllData;
}

@ObjectType()
export class CategoryGetAllData {
	@Field(() => [RestaurantsCategory])
	categories: RestaurantsCategory[];
}
