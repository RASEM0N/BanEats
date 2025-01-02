import { createRouter, createWebHistory } from 'vue-router';
import { LoginPage } from '@pages/loggedOut/login';
import { RegisterPage } from '@pages/loggedOut/register';
import { NotFoundPage } from '@pages/common/404';
import { actualizeTitle, requiredAuth, role } from './guards';
import { authRoutes } from './auth';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		...authRoutes,
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
router.beforeEach(role);
