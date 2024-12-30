import gql from 'graphql-tag';

export const ORDER_ITEM_OPTION = gql`
	fragment OrderItemOptionFragment on OrderItemOption {
		name
		choice
	}
`

export const ORDER_ITEM = gql`
	fragment OrderItemFragment on OrderItem {
		id
		...OrderItemOptionFragment
	}
	${ORDER_ITEM_OPTION}
`

export const ORDER = gql`
	fragment OrderFragment on Order {
		id
		total
		status
		items {
			...OrderItemFragment
        }
	}
	${ORDER_ITEM}
`

