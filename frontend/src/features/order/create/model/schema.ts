import gql from 'graphql-tag';
import { IOrderItemOptionFragment } from '@entities/order';

export const ORDER_CREATE_MUTATION = gql`
    mutation CreateOrderMutation(
        $restaurantId: Float!
        $items: [CreateOrderItemArgs!]!
    ) {
        OrderCreate(
            restaurantId: $restaurantId
            items: $items
        ) {
            order {
                id
            }
        }
    }
`;

export interface OrderItem {
	dishId: number;
	options: IOrderItemOptionFragment[];
}

export interface OrderCreateMutationVars {
	restaurantId: number;
	items: OrderItem[];
}