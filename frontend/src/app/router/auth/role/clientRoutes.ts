import { RouteRecordRaw } from 'vue-router';
import { RestaurantsPage } from '@pages/restaurants';
import { CategoryPage } from '@pages/category';
// import { RestaurantPage } from '@pages/restaurant';

export const clientRoutes: RouteRecordRaw[] = [
	{
		path: '/restaurants',
		component: RestaurantsPage,
		meta: {
			title: 'Restaurants | BanEats',
		},
	},

	// @TODO расскоментить
	// {
	// 	path: '/restaurants/:restaurantId',
	// 	component: RestaurantPage,
	// 	meta: {
	// 		title: 'Restaurant | BanEats',
	// 	},
	// },

	{
		path: '/restaurants/category/:slug',
		component: CategoryPage,
		meta: {
			title: 'Category | BanEats',
		},
	},
]