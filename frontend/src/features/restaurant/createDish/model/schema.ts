import gql from 'graphql-tag';
import {
    IRestaurantDishFragment,
    IRestaurantDishOptionFragment,
    RESTAURANT_DISH
} from '@entities/restaurant';

// --------------  --------------  --------------

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

// --------------  --------------  --------------

export interface RestaurantDishCreateMutationResult {
    RestaurantDishCreate: {
        dish: IRestaurantDishFragment
    };
}

export interface RestaurantDishCreateMutationVars {
    name: string;
    description: string;
    price: number;
    restaurantId: number;
    options: Omit<IRestaurantDishOptionFragment, 'choices'>[];
}