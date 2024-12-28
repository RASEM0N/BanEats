import { RouteRecordRaw } from 'vue-router';
import { MyRestaurantsPage } from '@pages/myRestaurant';
import { AddRestaurantPage } from '@pages/addRestaurant';

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
];