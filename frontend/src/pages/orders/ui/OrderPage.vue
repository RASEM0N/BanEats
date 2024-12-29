<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

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
const orderId = +route.params.orderId;

// @TODO надо везде
// @TODO обработку ошибок сделать и загрузки
const { result } = useQuery<GetOrderQueryResult, GetOrderQueryVars>(gql`
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

const order = computed(() => result.value?.OrderGet.order);

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
				<span class=" text-center mt-5 mb-3 text-2xl text-lime-600">
					Status: {{ order.status }}
				</span>
			</div>
		</div>
	</div>
</template>