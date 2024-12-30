import { number, string } from 'zod';

export const restaurant = {
	name: string().min(5).max(255),
	address: string().min(5).max(255),
};

export const restaurantCategory = {
	name: string().min(5).max(60),
	slug: string().min(5).max(60),
	coverImage: string().nullish(),
};

export const restaurantDish = {
	name: string().min(5).max(60),
	description: string().min(5).max(60),
	price: number().positive().int(),
	photo: string().nullish(),
};

export const restaurantDishOption= {
	name: string().min(5).max(60),
	extra: number().nullish(),
};

export const restaurantDishChoice = {
	name: string().min(5).max(60),
	extra: number().nullish(),
};