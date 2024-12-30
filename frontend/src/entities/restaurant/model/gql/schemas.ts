import gql from 'graphql-tag';
import { RESTAURANT } from './fragments';

export const MY_RESTAURANTS_QUERY = gql`
    query MyRestaurantsQuery {
        RestaurantGetAllMy {
            restaurants { ...RestaurantFragment }
        }
    }
    ${RESTAURANT}
`;