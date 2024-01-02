import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsCategory } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Restaurant, RestaurantsCategory])],
	providers: [
		RestaurantsResolver,
		CategoryResolver,
		RestaurantsService,
		CategoryService,
	],
})
export class RestaurantsModule {}
