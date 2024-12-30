export { default as Restaurant } from './ui/Restaurant.vue';
export { default as RestaurantCategory } from './ui/RestaurantCategory.vue';
export { default as RestaurantDish } from './ui/RestaurantDish.vue';

export * as validationSchema from './model/validation/schema';
export * as gqlSchema from './model/gql/schemas';

export * from './model/types';
export * from './model/gql/types';

// @TODO надо объеденить это все в объект
export * from './model/services/create'
export * from './model/services/getAllMy'
export * from './model/services/get'
export * from './model/services/update'
export * from './model/services/addDish'
