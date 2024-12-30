import { IOrder, IOrderItem, IOrderItemOption } from '../types';

export type IOrderFragment = Pick<
	IOrder,
	'id' | 'status' | 'total'
>

export type IOrderWithItemsFragment = Pick<
	IOrder,
	'id' | 'status' | 'total' | 'items'
>

export type IOrderItemFragment = Pick<
	IOrderItem,
	'id' | 'options'
>

export type IOrderItemOptionFragment = Pick<
	IOrderItemOption,
	'name' | 'choice'
>