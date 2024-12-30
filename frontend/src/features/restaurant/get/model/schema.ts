import gql from 'graphql-tag';
import { IRestaurantWithDishesFragment, RESTAURANT, RESTAURANT_DISH } from '@entities/restaurant';

export const RESTAURANT_GET_QUERY = gql`
    query RestaurantQuery($restaurantId: ID!) {
        RestaurantGet(restaurantId: $restaurantId) {
            restaurant {
                ...RestaurantFragment
                dishes {
                    ...RestaurantDishFragment
                }
            }
        }
    }
    ${RESTAURANT}
    ${RESTAURANT_DISH}
`;

// --------------  --------------  --------------

export interface RestaurantGetQueryResult {
	RestaurantGet: {
		restaurant: IRestaurantWithDishesFragment
	};
}

export interface RestaurantGetQueryVars {
	restaurantId: number;
}