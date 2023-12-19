import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Restaurant])],
	providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
