import { CoreEntity } from '@shared/lib/types';
import { IUser } from '@entities/user';
import { IRestaurant, IRestaurantDish } from '@entities/restaurant';

export interface IOrder extends CoreEntity {
	customer?: IUser;
	driver?: IUser;

	restaurant: IRestaurant;
	dish: IRestaurantDish;
	items: IOrderItem[];

	total: number;
	status: ORDER_STATUS;
}

export interface IOrderItem extends CoreEntity {
	dish: IRestaurantDish;
	options: IOrderItemOption[];
}

export interface IOrderItemOption {
	name: string;
	choice?: string;
}

export enum ORDER_STATUS {
	pending = 'pending',
	cooked = 'cooked',
	cooking = 'cooking',
	pickedUp = 'pickedUp',
	delivered = 'delivered',
}