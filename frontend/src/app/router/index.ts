import { createRouter, createWebHistory } from 'vue-router';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { actualizeTitle, requiredAuth } from '@app/router/guards';
import { HomePage } from '@pages/home';
import { NotFoundPage } from '@pages/404';
import { ConfirmEmailPage } from '@pages/confirmEmail';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
			meta: {
				title: 'BatEats',
				requiredAuth: true,
			},
			children: [
				{
					path: '/confirm',
					component: ConfirmEmailPage,
				},
			],
		},
		{
			path: '/login',
			component: LoginPage,
			meta: {
				title: 'Login | BanEats',
				requiredAuth: false,
			},
		},
		{
			path: '/register',
			component: RegisterPage,
			meta: {
				title: 'Register | BanEats',
				requiredAuth: false,
			},
		},
		{
			path: '/:pathMatch(.*)*',
			component: NotFoundPage,
			meta: {
				title: '404 | BanEats',
			},
		},
	],
});

router.beforeEach(actualizeTitle);
router.beforeEach(requiredAuth);