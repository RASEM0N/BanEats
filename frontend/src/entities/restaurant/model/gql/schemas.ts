import gql from 'graphql-tag';
import { RESTAURANT, RESTAURANT_DISH } from './fragments';

export const RESTAURANT_CREATE_MUTATION = gql`
    mutation RestaurantCreateMutation(
        $name: String!,
        $address: String!,
        $categoryName: String!
        $coverImage: String!
    ) {
        RestaurantCreate(
            name: $name,
            categoryName: $categoryName,
            address: $address,
            coverImage: $coverImage
        ) {
            restaurant { ...RestaurantFragment }
        }
    }
    ${RESTAURANT}
`;

export const MY_RESTAURANTS_QUERY = gql`
    query MyRestaurantsQuery {
        RestaurantGetAllMy {
            restaurants { ...RestaurantFragment }
        }
    }
    ${RESTAURANT}
`;

export const RESTAURANT_GET_QUERY = gql`
    query MyRestaurantQuery($restaurantId: ID!) {
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


export const RESTAURANT_DISH_CREATE_MUTATION = gql`
    mutation RestaurantDishCreateMutation(
        $name: String!
        $description: String!
        $price: Float!
        $restaurantId: Float!
        $options: [DishOptionInput!]
    ) {
        RestaurantDishCreate(
            name: $name
            price: $price
            description: $description
            restaurantId: $restaurantId
            options: $options
        ) {
            dish {
                ...RestaurantDishFragment
            }
        }
    }
    ${RESTAURANT_DISH}
`;