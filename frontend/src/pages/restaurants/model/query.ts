import gql from 'graphql-tag';

export interface RestaurantsQueryVariables {
	page: number;
}

export interface RestaurantsQueryResult {
	RestaurantCategoryGetAll: {
		categories: {
			id: number
			name: string
			coverImage: string
			slug: string
			restaurantCount: number
		}[]
	};

	RestaurantGetAll: {
		totalCount: number
		totalPages: number

		restaurants: {
			id: number
			name: string
			coverImage: string
			address: string
			category: {
				id: number
				name: string
			},
		}[]
	};
}

export const RestaurantsQuery = gql`
    query RestaurantsQuery($page: Float!) {

        RestaurantCategoryGetAll {
            categories {
                id
                name
                coverImage
                slug
                restaurantCount
            }
        }

        RestaurantGetAll(page: $page) {
            totalCount
            totalPages
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