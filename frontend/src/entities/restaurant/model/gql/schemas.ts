import gql from 'graphql-tag';
import { RESTAURANT } from './fragments';

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

export const MY_RESTAURANT_QUERY = gql`
    query MyRestaurantsQuery {
        RestaurantGetAllMy {
            restaurants { ...RestaurantFragment }
        }
    }
    ${RESTAURANT}
`;
