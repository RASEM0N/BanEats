import { useQuery } from '@vue/apollo-composable';
import { RestaurantsQueryResult, RestaurantsQueryVariables, RestaurantsQuery } from './query';
import { computed } from 'vue';

export const useRestaurants = (page: number = 1) => {
	const {
		result,
		loading,
		fetchMore,
	} = useQuery<
		RestaurantsQueryResult,
		RestaurantsQueryVariables
	>(RestaurantsQuery, {
		page,
	});

	const categories = computed(() => result.value?.RestaurantCategoryGetAll.categories ?? []);
	const restaurants = computed(() => result.value?.RestaurantGetAll.restaurants ?? []);
	const pagination = computed(() => ({
		totalCount: result.value?.RestaurantGetAll.totalCount ?? 0,
		totalPages: result.value?.RestaurantGetAll.totalPages ?? 0,
	}));

	return {
		result,
		loading,
		categories,
		restaurants,
		pagination,
		fetchMore: (page: number) => fetchMore({ variables: { page } }),
	};
};