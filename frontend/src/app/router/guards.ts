import { NavigationGuardWithThis } from 'vue-router';
import { getAuthToken } from '@features/auth';

export const actualizeTitle: NavigationGuardWithThis<void> = (to, _, next) => {
	document.title = String(to.meta.title ?? document.title);
	next();
};

export const requiredAuth: NavigationGuardWithThis<void> = (to, _, next) => {
	if (to.meta.requiredAuth) {

		if (getAuthToken()) {
			return next();
		}

		// @TODO изменение путей и теже router-link
		// как по мне лучше использовать без path
		// а name у роута, к которому хочешь перейти

		return {
			path: '/login',
			query: { redirect: to.fullPath },
		};
	}
	next();
};