import { useQuery } from '@vue/apollo-composable';
import { RESTAURANT_GET_QUERY, RestaurantGetQueryResult, RestaurantGetQueryVars } from './schema';
import { computed } from 'vue';
import { MY_RESTAURANTS_QUERY, MyRestaurantQueryResult } from '@entities/restaurant';

export const useRestaurantGet = (restaurantId: number) => {
	const query = useQuery<
		RestaurantGetQueryResult,
		RestaurantGetQueryVars
	>(RESTAURANT_GET_QUERY, { restaurantId });

	return {
		...query,
		restaurant: computed(() => query.result.value?.RestaurantGet.restaurant!),
	};
};

export const useRestaurantGetMyAll = () => {
	const query = useQuery<MyRestaurantQueryResult>(MY_RESTAURANTS_QUERY);

	return {
		...query,
		restaurants: computed(() => query.result.value?.RestaurantGetAllMy.restaurants),
	};
};