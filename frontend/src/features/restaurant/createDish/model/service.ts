import {
	RestaurantDishCreateMutationResult,
	RestaurantDishCreateMutationVars,
	RESTAURANT_DISH_CREATE_MUTATION
} from './schema';
import { useMutation } from '@vue/apollo-composable';

export const useRestaurantDishCreate = () => {
	const { mutate, ...mutation } = useMutation<
		RestaurantDishCreateMutationResult,
		RestaurantDishCreateMutationVars
	>(RESTAURANT_DISH_CREATE_MUTATION);

	return {
		...mutation,
		create: (params: RestaurantDishCreateMutationVars) => mutate(params),
	};
};