import { useLazyQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import {
	RestaurantsQueryResult,
	RestaurantsQueryVariables,
	RestaurantsQuery,
} from './schema';

export const useRestaurants = () => {

	// используем useLazyQuery ибо
	// есть проблемы с пагинцией и кэшированием

	// при использование fetchMore
	// - некорректно работа кэширование - всегда запросы отправляется
	// - не меняется variables - всегда начальное значение отправляется
	// с этим всегда страницы 1-ой загрузки показыется.
	// В тот же policy fields read(prev, new, { args: { page } })
	// в качестве аргумент всегда начальное значение отправляется

	// https://github.com/apollographql/apollo-client/issues/7430
	const {
		result,
		loading,
		load,
	} = useLazyQuery<
		RestaurantsQueryResult,
		RestaurantsQueryVariables
	>(RestaurantsQuery,
		{ page: NaN },
		{
			fetchPolicy: 'cache-first',
		},
	);

	const categories = computed(() => result.value?.RestaurantCategoryGetAll?.categories ?? []);
	const restaurants = computed(() => result.value?.RestaurantGetAll.restaurants ?? []);
	const restaurantsPagination = computed(() => ({
		totalCount: result.value?.RestaurantGetAll.totalCount ?? 0,
		totalPages: result.value?.RestaurantGetAll.totalPages ?? 0,
	}));

	return {
		result,
		loading,
		categories,
		restaurants,
		restaurantsPagination,
		load: ({ page, query }: RestaurantsQueryVariables) => load(null, { page, query }),
	};
};