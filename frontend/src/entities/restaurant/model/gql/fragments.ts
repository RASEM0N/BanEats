import gql from 'graphql-tag';

export const RESTAURANT = gql`
    fragment RestaurantFragment on Restaurant {
        id
        name
        coverImage
        address
        category {
            id
            name
        }
    }
`;

export const RESTAURANT_CATEGORY = gql`
    fragment RestaurantCategoryFragment on RestaurantsCategory {
        id
        name
        slug
        coverImage
    }
`;

export const RESTAURANT_DISH_CHOICE = gql`
    fragment RestaurantDishChoiceFragment on DishChoice {
        name
        extra
    }
`;

export const RESTAURANT_DISH_OPTION = gql`
    fragment RestaurantDishOptionFragment on DishOption {
        name
        extra
        choices {
            ...RestaurantDishChoiceFragment
        }
    }
    ${RESTAURANT_DISH_CHOICE}
`;

export const RESTAURANT_DISH = gql`
    fragment RestaurantDishFragment on RestaurantDish {
        id
        name
        price
        description
        photo
        options {
            ...RestaurantDishOptionFragment
        }
    }
    ${RESTAURANT_DISH_OPTION}
`;