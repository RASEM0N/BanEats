import { NavigationGuardWithThis } from 'vue-router';
import { getAuthToken } from '@features/auth';

export const actualizeTitle: NavigationGuardWithThis<void> = (to, _, next) => {
	document.title = String(to.meta.title ?? document.title);
	next();
};

export const requiredAuth: NavigationGuardWithThis<void> = (to, _, next) => {

	// кейс по умолчанию - сайтам не нажна авторизация
	if (to.meta.requiredAuth == undefined) {
		return next();
	}

	// для страницы требуется авторизация + мы авторизированы уже
	if (to.meta.requiredAuth && getAuthToken()) {
		return next();
	}

	// мы просто авторизированы
	if (to.meta.requiredAuth) {
		return next({
			path: '/login',
			query: { redirect: to.fullPath },
		});
	}

	// если мы авторизированы уже
	// и заходим на с айты которым не нужна авторизация
	if (getAuthToken()) {
		return next({ path: '/' });
	}

	return next();
};