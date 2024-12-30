import gql from 'graphql-tag';
import { IRestaurantFragment, RESTAURANT } from '@entities/restaurant';

// --------------  --------------  --------------

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

// --------------  --------------  --------------

export interface RestaurantCreateMutationResult {
	RestaurantCreate: {
		restaurant: IRestaurantFragment
	};
}

export interface RestaurantCreateMutationVars {
	name: string;
	address: string;
	categoryName: string;
	coverImage: string;
}
