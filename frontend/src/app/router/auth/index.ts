import { RouteRecordRaw } from 'vue-router';
import { HomePage } from '@pages/home';
import { commonRoutes } from './commonRoutes';
import { ownerRoutes } from './role/ownerRoutes';
import { deliveryRoutes } from './role/deliveryRoutes';
import { clientRoutes } from './role/clientRoutes';
import { adminRoutes } from './role/adminRoutes';
import { roleMeta } from './lib/roleMeta';
import { USER_ROLE } from '@entities/user';

export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: HomePage,
		meta: {
			title: 'BatEats',
			requiredAuth: true,
		},
		children: [
			...roleMeta(clientRoutes, USER_ROLE.client),
			...roleMeta(adminRoutes, USER_ROLE.admin),
			...roleMeta(ownerRoutes, USER_ROLE.owner),
			...roleMeta(deliveryRoutes, USER_ROLE.delivery),
			...commonRoutes,
		],
	},
];