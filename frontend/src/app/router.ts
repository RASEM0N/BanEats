import { createRouter, createWebHistory } from 'vue-router';
import { RestaurantsPage } from '@pages/Restaurants';
import { LoginPage } from '@pages/Login';
import { RegisterPage } from '@pages/Register';

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: LoginPage,
		},
		{
			path: '/register',
			component: RegisterPage,
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

	// @TODO тут еще должна быть логика для проверки
	// @TODO  если ли у нас пользователь сейчас или нет
	// чтоб не редиректило
	if (to.meta.requiredAuth) {
		return {
			redirect: '/',

			// Сохраняем результат, чтоб вернутся к нему позже
			query: { redirect: to.fullPath },
		};
	}
	next();
});