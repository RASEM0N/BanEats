import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsCategory } from './entities/category.entity';
import { RestaurantsCategoryService } from './restaurants-category.service';

@Module({
	imports: [TypeOrmModule.forFeature([Restaurant, RestaurantsCategory])],
	providers: [RestaurantsResolver, RestaurantsService, RestaurantsCategoryService],
})
export class RestaurantsModule {}
