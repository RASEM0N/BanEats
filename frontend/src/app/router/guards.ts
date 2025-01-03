import { NavigationGuardWithThis } from 'vue-router';
import { getAuthToken } from '@entities/auth';
import { me } from '@entities/user';
import { apolloClient } from '@app/apollo';

export const actualizeTitle: NavigationGuardWithThis<void> = (to, _, next) => {
	document.title = String(to.meta.title ?? document.title);
	next();
};

export const requiredAuth: NavigationGuardWithThis<void> = (to, _, next) => {

	// кейс по умолчанию - сайтам не нажна авторизация
	if (to.meta.requiredAuth == undefined) {
		return next();
	}

	// заходим туда где должна быть авторизация
	if (to.meta.requiredAuth) {
		return getAuthToken()
			? next()
			: next({ path: '/login', query: { redirect: to.fullPath } });
	}

	// заходим туда где не дожна быть авторизация
	if (getAuthToken()) {
		return next({ path: '/' });
	}

	return next();
};

export const role: NavigationGuardWithThis<void> = async (to, _, next) => {

	// спокойно пропускаем все чему не надо роли
	if (!to.meta.role) {
		return next();
	}

	try {

		const { data: { UserMe: { user } } } = await me(apolloClient);

		if (to.meta.role === user.role) {
			return next();
		}

		return next('/');
	} catch (e) {

		// тут относительно ошибки должно быть... Ладно
		next('/404');
	}
};