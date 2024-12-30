import { useMutation } from '@vue/apollo-composable';
import { RESTAURANT_DISH_CREATE_MUTATION } from '../gql/schemas';
import { RestaurantDishCreateMutationResult, RestaurantDishCreateMutationVars } from '../gql/types';

export const useRestaurantDishAdd = () => {
	const mutation = useMutation<
		RestaurantDishCreateMutationResult,
		RestaurantDishCreateMutationVars
	>(RESTAURANT_DISH_CREATE_MUTATION);

	return {
		...mutation,
		mutate: (params: RestaurantDishCreateMutationVars) => mutation.mutate(params),
	};
};