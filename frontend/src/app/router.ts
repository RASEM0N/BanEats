import { createRouter, createWebHistory } from 'vue-router';
import { RestaurantsPage } from '@pages/restaurants';
import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { getAuthToken } from '@features/auth';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: {
				path: '/login',
			},
			meta: {
				title: 'Home | BanEats',
			},
		},
		{
			path: '/login',
			component: LoginPage,
			meta: {
				title: 'Login | BanEats',
			},
		},
		{
			path: '/register',
			component: RegisterPage,
			meta: {
				title: 'Register | BanEats',
			},
		},
		{
			path: '/restaurants',
			component: RestaurantsPage,
			meta: { requiredAuth: true },
		},
	],
});


router.beforeEach((to, _, next) => {
	document.title = String(to.meta.title ?? document.title);
	next();
});

router.beforeEach((to, _, next) => {

	if (to.meta.requiredAuth) {

		if (getAuthToken()) {
			return next();
		}

		return { redirect: '/login', query: { redirect: to.fullPath } };
	}
	next();
});