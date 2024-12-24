import { useRouter } from 'vue-router';

type NavigationCallback = Parameters<ReturnType<typeof useRouter>['options']['history']['listen']>[0]

export const onHistory = (callback: NavigationCallback) => {
	const router = useRouter();

	router.options.history.listen((to, from, information) => {
		callback(to, from, information);
	});
};

export const onHistoryBack = (callback: NavigationCallback) => {
	onHistory((to, from, information) => {
		if (information.direction === 'back') {
			callback(to, from, information);
		}
	});
};

export const onHistoryForward = (callback: NavigationCallback) => {
	onHistory((to, from, information) => {
		if (information.direction === 'forward') {
			callback(to, from, information);
		}
	});
};