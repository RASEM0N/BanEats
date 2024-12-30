import { RouteRecordRaw } from 'vue-router';
import { ConfirmEmailPage } from '@pages/loggedIn/common/confirmEmail';
import { EditProfilePage } from '@pages/loggedIn/common/editProfile';
import { OrderPage } from '@pages/loggedIn/common/orders';

export const commonRoutes: RouteRecordRaw[] = [
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
	{
		path: '/orders/:orderId',
		component: OrderPage,
		meta: {
			title: 'Order | BanEats',
		},
	},
];