import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';

interface RestaurantQueryVariables {
	id: number;
}

interface RestaurantQueryResult {
	RestaurantGet: {
		restaurant: {
			id: number
			name: string
			coverImage: string
			address: string
			category: {
				id: number
				name: string
			},

			dishes: {
				id: number
				name: string
				description: string
				price: number
				options: {
					name: string
					extra: number
				}
			}[]
		};
	};
}


// @TODO надо с ресторанами фрагменты использовать
// тогда вроде кэшироватся нормально будет

export const useRestaurant = (restaurantId: number) => {
	const { result, loading, error } = useQuery<RestaurantQueryResult, RestaurantQueryVariables>(gql`
        query RestaurantQuery($id: ID!) {
            RestaurantGet(restaurantId: $id) {
                restaurant {
                    id
                    name
                    coverImage
                    address
                    category {
                        id
                        name
                    }
                    dishes {
                        id
                        name
                        description
                        price
                        options {
                            name
                            extra
                        }
                    }
                }
            }
        }
	`, { id: restaurantId });

	const restaurant = computed(() => result.value?.RestaurantGet.restaurant);

	return {
		restaurant,
		loading,
		error,
	};
};