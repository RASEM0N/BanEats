import { useRoute } from 'vue-router';
import { ref } from 'vue';

const normalizeQuery = (query?: any, value: number = 1) => {
	const numQuery = Number(query);
	return isNaN(numQuery) ? value : numQuery;
};

export const refPage = (value: number = 1) => {
	const route = useRoute();

	// @todo надо отлаживать
	// тут логика чтоб при Назад/Вперед через стрелки Браузера
	// у нас обновлялось состояние

	// onHistory(() => {
	// 	page.value = normalizeQuery(
	// 		new URL(window.location.toString()).searchParams.get('page'),
	// 		value,
	// 	);
	// });

	return ref(normalizeQuery(route.query['page'], value));
};