import { RouteRecordRaw } from 'vue-router';
import { MyRestaurantsPage } from '@pages/loggedIn/owner/myRestaurants';
import { AddRestaurantPage } from '@pages/loggedIn/owner/addRestaurant';
import { MyRestaurantPage } from '@pages/loggedIn/owner/myRestaurant';
import { AddDishPage } from '@pages/loggedIn/owner/addDIsh';

export const ownerRoutes: RouteRecordRaw[] = [
	{
		path: '/my-restaurants',
		component: MyRestaurantsPage,
		meta: {
			title: 'My restaurants | BanEats',
		},
	},
	{
		path: '/add-restaurant',
		component: AddRestaurantPage,
		meta: {
			title: 'Add Restaurant | BanEats',
		},
	},
	{
		path: '/restaurants/:restaurantId',
		component: MyRestaurantPage,
		meta: {

			// @TODO динамическое
			title: 'My Restaurant | BanEats',
		},
	},
	{
		path: '/restaurants/:restaurantId/add-dish',
		component: AddDishPage,
		meta: {

			// @TODO динамическое
			title: 'Add dish | BanEats',
		},
	}
];