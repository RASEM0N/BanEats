import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { MY_RESTAURANTS_QUERY, MyRestaurantQueryResult } from '@entities/restaurant';
import {
	RESTAURANT_GET_QUERY,
	RESTAURANT_CATEGORY_QUERY,
	RestaurantGetQueryResult,
	RestaurantGetQueryVars,
	RestaurantCategoryQueryResult,
	RestaurantCategoryQueryVars,
} from './schema';

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

export const useRestaurantCategoryGet = ({ page = 1, slug }: RestaurantCategoryQueryVars) => {
	const query = useQuery<
		RestaurantCategoryQueryResult,
		RestaurantCategoryQueryVars
	>(RESTAURANT_CATEGORY_QUERY, { page, slug });

	const category = computed(() => query.result.value?.RestaurantCategoryGetBySlug.category!);
	const restaurants = computed(() => query.result.value?.RestaurantCategoryGetBySlug.restaurants!);

	return {
		...query,
		category,
		restaurants,
	};
};