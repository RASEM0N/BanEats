import { RouteRecordRaw } from 'vue-router';
import { MyRestaurantsPage } from '@pages/myRestaurants';
import { AddRestaurantPage } from '@pages/addRestaurant';
import { MyRestaurantPage } from '@pages/myRestaurant';
import { h } from 'vue';
import { AddDishPage } from '@pages/addDIsh';

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
	},
	{
		path: '/restaurants/:restaurantId/buy-promotion',
		component: h({
			template: `<h1>Buy Promotion</h1>`,
		}),
		meta: {

			// @TODO динамическое
			title: 'Add dish | BanEats',
		},
	},
];