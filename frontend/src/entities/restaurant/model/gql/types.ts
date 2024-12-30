import {
	IRestaurant,
	IRestaurantCategory,
	IRestaurantDish,
	IRestaurantDishChoice,
	IRestaurantDishOption,
} from '../types';

// --------------  --------------  --------------

export type IRestaurantFragment = Pick<
	IRestaurant,
	'id' | 'name' | 'coverImage' | 'address' | 'category'
>

export type IRestaurantCategoryFragment = Pick<
	IRestaurantCategory,
	'id' | 'name' | 'slug' | 'coverImage'
>

export type IRestaurantDishFragment = Pick<
	IRestaurantDish,
	'id' | 'name' | 'price' | 'description' | 'photo'
>

export type IRestaurantDishOptionFragment = Pick<
	IRestaurantDishOption,
	'extra' | 'name' | 'choices'
>

export type IRestaurantDishChoiceFragment = Pick<
	IRestaurantDishChoice,
	'name' | 'extra'
>

// --------------  --------------  --------------

export interface MyRestaurantQueryResult {
	RestaurantGetAllMy: {
		restaurants: IRestaurantFragment[]
	};
}

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


