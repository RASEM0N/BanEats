import gql from 'graphql-tag';
import {
	RESTAURANT,
	RESTAURANT_WITHOUT_CATEGORY,
	RESTAURANT_CATEGORY,
	RESTAURANT_DISH,
	IRestaurantCategoryWithCountFragment,
	IRestaurantWithDishesFragment,
	IRestaurantWithoutCategoryFragment,
} from '@entities/restaurant';

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

export const RESTAURANT_CATEGORY_QUERY = gql`
    query RestaurantCategoryQuery($page: Float!, $slug: String!) {
        RestaurantCategoryGetBySlug(page: $page, slug: $slug) {
            category {
                ...RestaurantCategoryFragment
                restaurantCount
            }
            restaurants {
                ...RestaurantWithoutCategoryFragment
            }
        }
    }
    ${RESTAURANT_CATEGORY}
    ${RESTAURANT_WITHOUT_CATEGORY}
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

// --------------  --------------  --------------

export interface RestaurantCategoryQueryResult {
	RestaurantCategoryGetBySlug: {
		category: IRestaurantCategoryWithCountFragment
		restaurants: IRestaurantWithoutCategoryFragment[]
	};
}

export interface RestaurantCategoryQueryVars {
	page: number;
	slug?: string;
}