import { RouteRecordRaw } from 'vue-router';
import { MyRestaurantsPage } from '@pages/myRestaurant';

export const ownerRoutes: RouteRecordRaw[] = [
	{
		path: '/my-restaurants',
		component: MyRestaurantsPage,
	},
];