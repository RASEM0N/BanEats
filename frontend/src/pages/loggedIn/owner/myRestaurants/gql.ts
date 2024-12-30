import gql from 'graphql-tag';

// @TODO бан
export const MyRestaurantsQuery = gql`
    query MyRestaurantsQuery {
        RestaurantGetAllMy {
            restaurants {
                id
                name
                coverImage
                category {
                    id
                    name
                }
                address
            }
        }
    }
`;