import { useMutation } from '@vue/apollo-composable';
import {
	RestaurantUpdateMutationVars,
	RestaurantUpdateMutationResult,
	RESTAURANT_UPDATE_MUTATION,
} from './schema';

export const useRestaurantUpdate = () => {
	const { mutate, ...mutation } = useMutation<
		RestaurantUpdateMutationResult,
		RestaurantUpdateMutationVars
	>(RESTAURANT_UPDATE_MUTATION);

	return {
		...mutation,

		// @TODO
		update: () => mutation
	}
};