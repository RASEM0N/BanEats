import { CoreEntity } from '@shared/lib/types';
import { IRestaurant } from '@entities/restaurant';
import { IOrder } from '@entities/order';

export interface IUser extends CoreEntity {
	email: string;
	password: string,
	role: USER_ROLE;
	isVerified: boolean;

	restaurant: IRestaurant
	orders: IOrder[]
	rides: IOrder[]
}

export enum USER_ROLE {
	admin = 'admin',
	client = 'client',
	owner = 'owner',
	delivery = 'delivery',
}
