import gql from 'graphql-tag';
import {
	IRestaurantCategoryWithCountFragment,
	IRestaurantFragment, RESTAURANT,
	RESTAURANT_CATEGORY,
} from '@entities/restaurant';

export const RestaurantsQuery = gql`
    query RestaurantsQuery($page: Float!) {

        RestaurantCategoryGetAll {
            categories {
                ...RestaurantCategoryFragment
                restaurantCount
            }
        }

        RestaurantGetAll(page: $page) {
            totalCount
            totalPages
            page
            restaurants {
                ...RestaurantFragment
            }
        }
    }
	${RESTAURANT}
    ${RESTAURANT_CATEGORY}
`;

export type RestaurantsQueryVariables = {
	page?: number;
	query?: string
}

export interface RestaurantsQueryResult {
	RestaurantCategoryGetAll: {
		categories: IRestaurantCategoryWithCountFragment[]
	};

	RestaurantGetAll: {
		totalCount: number
		totalPages: number
		page: number

		restaurants: IRestaurantFragment[]
	};
}