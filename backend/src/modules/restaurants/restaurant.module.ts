import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver } from './resolvers/restaurant.resolver';
import { RestaurantService } from './services/restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsCategory } from './entities/category.entity';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';
import { DishResolver } from './resolvers/dish.resolver';
import { DishService } from './services/dish.service';
import { RestaurantDish } from './entities/dish.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Restaurant, RestaurantsCategory, RestaurantDish]),
	],
	providers: [
		RestaurantResolver,
		CategoryResolver,
		DishResolver,
		RestaurantService,
		CategoryService,
		DishService,
	],
})
export class RestaurantModule {}
