import { useQuery } from '@vue/apollo-composable';
import { RESTAURANT_GET_QUERY } from '../gql/schemas';
import { RestaurantGetQueryResult, RestaurantGetQueryVars } from '../gql/types';
import { computed } from 'vue';

export const useRestaurantGet = (restaurantId: number) => {
	const query = useQuery<
		RestaurantGetQueryResult,
		RestaurantGetQueryVars
	>(RESTAURANT_GET_QUERY, { restaurantId });

	const restaurant = computed(() => query.result.value?.RestaurantGet.restaurant!);

	return {
		...query,
		restaurant,
	};
};