import { createRouter, createWebHistory } from 'vue-router';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { actualizeTitle, requiredAuth, role } from './guards';
import { NotFoundPage } from '@pages/404';
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
