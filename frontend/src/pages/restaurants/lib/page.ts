import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { onHistory } from '@shared/lib/router';

export const refPage = (value: number = 1) => {
	const route = useRoute();
	const router = useRouter();
	const page = ref(normalizeQuery(route.query['page'], value));

	// page.value обновляем значение, чтоб при Prev/Next перендарилось
	onHistory(() => {
		page.value = normalizeQuery(queryFromLocation(), value);
	});

	// Синхранизируем page.value с ?page= в URL
	watch(page, (page) => {
		const query = normalizeQuery(queryFromLocation(), value);

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

const queryFromLocation = () => {
	return new URL(window.location.toString()).searchParams.get('page');
};