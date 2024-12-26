import { RouteRecordRaw } from 'vue-router';
import { ConfirmEmailPage } from '@pages/confirmEmail';
import { EditProfilePage } from '@pages/editProfile';
import { clientRoutes } from './clientRoutes';
import { ownerRoutes } from './ownerRoutes';
import { deliveryRoutes } from './deliveryRoutes';
import { adminRoutes } from './adminRoutes';

export const authRoutes: RouteRecordRaw[] = [
	...adminRoutes,
	...clientRoutes,
	...ownerRoutes,
	...deliveryRoutes,

	{
		path: '/confirm',
		component: ConfirmEmailPage,
		meta: {
			title: 'Confirm | BanEats',
		},
	},
	{
		path: '/edit-profile',
		component: EditProfilePage,
		meta: {
			title: 'Profile | BanEats',
		},
	},
];