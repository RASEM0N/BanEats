import { RouteRecordRaw } from 'vue-router';
import { RestaurantsPage } from '@pages/restaurants';
import { RestaurantPage } from '@pages/restaurant';
import { CategoryPage } from '@pages/category';

export const clientRoutes: RouteRecordRaw[] = [
	{
		path: '/restaurants',
		component: RestaurantsPage,
		meta: {
			title: 'Restaurants | BanEats',
		},
	},
	{
		path: '/restaurants/:restaurantId',
		component: RestaurantPage,
		meta: {
			title: 'Restaurant | BanEats',
		},
	},
	{
		path: '/restaurants/category/:slug',
		component: CategoryPage,
		meta: {
			title: 'Category | BanEats',
		},
	},
]