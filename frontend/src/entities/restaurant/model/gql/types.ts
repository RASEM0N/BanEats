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

export type IRestaurantWithDishesFragment = Pick<
	IRestaurant,
	'id' | 'name' | 'coverImage' | 'address' | 'category' | 'dishes'
>

export type IRestaurantCategoryFragment = Pick<
	IRestaurantCategory,
	'id' | 'name' | 'slug' | 'coverImage'
>

export type IRestaurantDishFragment = Pick<
	IRestaurantDish,
	'id' | 'name' | 'price' | 'description' | 'photo' | 'options'
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

// --------------  --------------  --------------

export interface RestaurantGetQueryResult {
	RestaurantGet: {
		restaurant: IRestaurantWithDishesFragment
	};
}

export interface RestaurantGetQueryVars {
	restaurantId: number;
}

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
	restaurantId: string;
	options: Omit<IRestaurantDishOptionFragment, 'choices'>[];
}


