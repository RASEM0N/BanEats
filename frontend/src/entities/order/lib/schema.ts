import { nativeEnum, number, string } from 'zod';
import { ORDER_STATUS } from '../model/types';

export const order = {
	total: number().positive(),
	status: nativeEnum(ORDER_STATUS),
};

export const orderItemOption = {
	name: string().min(5).max(60),
	choice: number().positive().nullish(),
};