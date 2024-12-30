import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { MyRestaurantQueryResult } from '../gql/types';
import { MY_RESTAURANTS_QUERY } from '../gql/schemas';

export const useMyRestaurants = () => {
	const { result, loading, error } = useQuery<MyRestaurantQueryResult>(MY_RESTAURANTS_QUERY);
	const restaurants = computed(() => result.value?.RestaurantGetAllMy.restaurants);

	return {
		loading,
		error,
		restaurants,
	};
};