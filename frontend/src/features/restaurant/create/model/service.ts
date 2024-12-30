import { useMutation } from '@vue/apollo-composable';
import {
	MyRestaurantQueryResult,
	MY_RESTAURANTS_QUERY,
} from '@entities/restaurant';

import {
	RESTAURANT_CREATE_MUTATION,
	RestaurantCreateMutationResult,
	RestaurantCreateMutationVars,
} from './schema';

export const useRestaurantCreate = () => {
	const { mutate, ...mutation } = useMutation<
		RestaurantCreateMutationResult,
		RestaurantCreateMutationVars
	>(RESTAURANT_CREATE_MUTATION, {
		fetchPolicy: 'network-only',
		update: (cache, result) => {
			const restaurant = result.data?.RestaurantCreate.restaurant;
			const resultQuery = cache.readQuery<MyRestaurantQueryResult>({ query: MY_RESTAURANTS_QUERY });

			if (!resultQuery || !restaurant) {
				return;
			}

			cache.writeQuery<MyRestaurantQueryResult>({
				query: MY_RESTAURANTS_QUERY,
				data: {
					RestaurantGetAllMy: {
						...resultQuery.RestaurantGetAllMy,
						restaurants: resultQuery.RestaurantGetAllMy.restaurants.concat(restaurant),
					},
				},
			});
		},
	});

	return {
		...mutation,
		create: (params: RestaurantCreateMutationVars) => mutate(params),
	};
};