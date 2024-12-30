import { useMutation } from '@vue/apollo-composable';

import {
	MY_RESTAURANT_QUERY,
	RESTAURANT_CREATE_MUTATION,
} from '../gql/schemas';

import {
	RestaurantCreateMutationResult,
	RestaurantCreateMutationVars,
	MyRestaurantQueryResult,
} from '../gql/types';

export const useRestaurantCreate = () => {
	const mutation = useMutation<
		RestaurantCreateMutationResult,
		RestaurantCreateMutationVars
	>(RESTAURANT_CREATE_MUTATION, {
		fetchPolicy: 'network-only',
		update: (cache, result) => {
			const restaurant = result.data?.RestaurantCreate.restaurant;
			const resultQuery = cache.readQuery<MyRestaurantQueryResult>({ query: MY_RESTAURANT_QUERY });

			if (!resultQuery || !restaurant) {
				return;
			}

			cache.writeQuery<MyRestaurantQueryResult>({
				query: MY_RESTAURANT_QUERY,
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
		mutate: (params: RestaurantCreateMutationVars) => mutation.mutate(params),
	};
};