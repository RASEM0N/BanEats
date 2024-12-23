import { useRoute } from 'vue-router';
import { ref } from 'vue';

export const refPage = (value: number = 1) => {
	const route = useRoute();
	const page = Number(route.query['page']);

	return ref(isNaN(page) ? value : page);
};