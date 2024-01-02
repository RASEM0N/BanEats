import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsCategory } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { DishResolver } from './dish.resolver';
import { DishService } from './dish.service';
import { RestaurantDish } from './entities/dish.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			// ---
			Restaurant,
			RestaurantsCategory,
			RestaurantDish,
			// ---
		]),
	],
	providers: [
		RestaurantsResolver,
		RestaurantsService,
		CategoryResolver,
		CategoryService,
		DishResolver,
		DishService,
	],
})
export class RestaurantsModule {}
