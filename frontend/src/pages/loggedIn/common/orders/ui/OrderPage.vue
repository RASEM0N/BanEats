<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useMe } from '@entities/user';
import { USER_ROLE } from '@entities/user';

interface OrderUpdateSubscriptionVars {
	id: number;
}

interface OrderUpdateSubscriptionResult {
	OnOrderUpdate: {
		order: GetOrderQueryResult['OrderGet']['order']
	};
}

interface GetOrderQueryResult {
	OrderGet: {
		order: {
			id: number
			status: string
			total: number
			driver: {
				email: string
			}
			customer: {
				email: string
			}
			restaurant: {
				name: string
			}
		};
	};
}

interface GetOrderQueryVars {
	orderId: number;
}

const route = useRoute();
const { user } = useMe();
const orderId = +route.params.orderId;


const subscriptionGQL = gql`
	subscription OrderUpdateSubscription($id: ID!) {
		OnOrderUpdate(id: $id) {
			order {
				id
				status
				total
				driver {
					email
				}
				customer {
					email
				}
				restaurant {
					name
				}
			}
		}
	}
`;


// @TODO надо везде
// @TODO обработку ошибок сделать и загрузки
const { result, subscribeToMore } = useQuery<GetOrderQueryResult, GetOrderQueryVars>(gql`
	query GetOrderQuery($orderId: Float!) {
		OrderGet(orderId: $orderId) {
			order {
				id
				status
				total
				driver {
					email
				}
				customer {
					email
				}
				restaurant {
					name
				}
			}
		}
	}
`, { orderId });

// Можно через хук useSubscription обновлять данные
subscribeToMore<OrderUpdateSubscriptionVars, OrderUpdateSubscriptionResult>({
	document: subscriptionGQL,
	variables: {
		id: orderId,
	},
	updateQuery: (previousQueryResult, { subscriptionData }) => {
		const order = subscriptionData?.data?.OnOrderUpdate?.order;

		if (!order) {
			return previousQueryResult;
		}

		return {
			OrderGet: { order },
		};
	},
});

interface OrderUpdateMutateVars {
	id: number;
	status: string;
}

const { mutate: updateOrder } = useMutation<void, OrderUpdateMutateVars>(gql`
	mutation OrderUpdateMutate($id: ID!, $status: ORDER_STATUS!) {
		OrderUpdate(id: $id, status: $status) {
			__typename
		}
	}
`);

const order = computed(() => result.value?.OrderGet.order);

// @TODO надо кнопки блокировать

const cookingOrder = () => {
	updateOrder({ id: orderId, status: 'cooking' });
};

const cookedOrder = () => {
	updateOrder({ id: orderId, status: 'cooked' });
};

</script>
<template>
	<div v-if="order"
		 class="mt-32 container flex justify-center"
	>
		<div class="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
			<h4 class="bg-gray-800 w-full py-5 text-white text-center text-xl">
				Order #{{ orderId }}
			</h4>
			<h5 class="p-5 pt-10 text-3xl text-center ">
				{{ order.total }}
			</h5>
			<div class="p-5 text-xl grid gap-6">
				<div class="border-t pt-5 border-gray-700">
					Prepared By: <span class="font-medium">{{ order.restaurant.name }}</span>
				</div>
				<div class="border-t pt-5 border-gray-700 ">
					Deliver To: <span class="font-medium">{{ order.customer.email }}</span>
				</div>
				<div class="border-t border-b py-5 border-gray-700">
					Driver: <span class="font-medium">{{ order.driver?.email ?? 'Not yet.' }}</span>
				</div>
				<span class="text-center mt-5 mb-3 text-2xl text-lime-600">
					Status: {{ order.status }}
				</span>

				<!--TODO надо WS на изменение статуса заказа добавить-->
				<template v-if="user?.role === USER_ROLE.owner">
					<button v-if="order.status === 'pending'"
							@click="cookingOrder"
							class="btn">
						Accept Order
					</button>
					<button v-if="order.status === 'cooking'"
							@click="cookedOrder"
							class="btn"
					>
						Order Cooked
					</button>
				</template>
			</div>
		</div>
	</div>
</template>