import { CoreEntity } from '@shared/lib/types';
import { IUser } from '@entities/user';
import { IOrder } from '@entities/order';

// ---- Entities ----

export interface IRestaurant extends CoreEntity {
	name: string,
	coverImage?: string,
	address: string
	category: IRestaurantCategory
	dishes: IRestaurantDish[]

	owner: IUser,
	ownerId: IUser['id']
	orders: IOrder[],
}

export interface IRestaurantCategory extends CoreEntity {
	name: string;
	slug: string;
	coverImage?: string;
	restaurants?: IRestaurant[];
}

export interface IRestaurantDish extends CoreEntity {
	name: string;
	description: string;
	price: number;
	phone: string;

	restaurantId: IRestaurant['id'];
	restaurant: IRestaurant;

	options?: IRestaurantDishOption[];
}

// ---- -------- ----

export interface IRestaurantDishOption {
	name: string;
	extra?: number;
	choices?: IRestaurantDishChoice[];
}

export interface IRestaurantDishChoice {
	name: string;
	extra?: number;
}