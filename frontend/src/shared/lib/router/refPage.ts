import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

export const refPage = (value: number = 1) => {
	const route = useRoute();
	const router = useRouter();
	const page = ref(normalizeQuery(route.query['page'], value));

	watch(() => route.query['page'] as string, (newPage: string) => {
		page.value = normalizeQuery(newPage, value);
	});

	watch(page, (page) => {
		const query = normalizeQuery(route.query['page'], value);

		if (query !== page) {
			router.push({ query: { page } });
		}
	});

	return page;
};

const normalizeQuery = (query?: any, value: number = 1) => {
	const numQuery = Number(query);
	return isNaN(numQuery) ? value : numQuery;
};