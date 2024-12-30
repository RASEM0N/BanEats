<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useRestaurant } from '../model/useRestaurant';
import { useHead } from '@unhead/vue';
import { RestaurantDish } from '@features/entites';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';

const route = useRoute();
const restaurantId = (+route.params.restaurantId);
const { restaurant } = useRestaurant(restaurantId);

const { mutate } = useMutation(gql`
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
`);

useHead({
	title: () => restaurant.value
		? `${restaurant.value.name} | BanEats`
		: window.document.title,
	meta: [
		{
			name: 'description',
			content: () => {
				const value = restaurant.value;
				return value
					? `${value.category.name} restaurant ${value.name} at the address ${value.address}`
					: 'restaurant | BanEats';
			},
		},
	],
});


const isStartSelectOrder = ref<boolean>(false);
const orders = ref<any[]>([]);

const selectDish = (dish: any) => {
	isSelected(dish)
		? addDishOrder(dish)
		: removeDishOrder(dish);
};

const isSelected = (dish: any): boolean => {
	return !!orders.value.find((v) => v.dishId === dish.id);
};

const addDishOrder = (dish: any) => {
	orders.value.push({ dishId: dish.id, options: [] });
};

const removeDishOrder = (dish: any) => {
	orders.value = orders.value.map((v) => v.id !== dish.id);
};

const isSelectOption = (dishId: number, option: any): boolean => {
	const dish = orders.value.find((v) => v.dishId === dishId);
	if (!dish) {
		return false;
	}

	return !!dish.options.find((v) => v === option);
};

const selectOption = (selectedDish: any, option: any) => {
	const dish = orders.value.find((v) => v.dishId === selectedDish.id);
	if (!dish) {
		return;
	}

	isSelectOption(selectedDish.dishId, option)
		? dish.push(option)
		: (dish.options = dish.options.filter((v) => v !== option));
};

const startOrder = () => {

	if (!orders.value.length) {
		toast('Can\'t place empty order', {
			position: toast.POSITION.TOP_RIGHT,
			type: toast.TYPE.ERROR
		})
	}

	// @TODO добавить проверку на данные
	mutate({ restaurantId, options: orders });
};

</script>
<template>
	<div>
		<div
			v-if="restaurant"
			class="bg-gray-800 bg-center bg-cover py-48"
			:style="{ backgroundImage: `url(${restaurant.coverImage})` }"
		>
			<div class="bg-white w-3/12 py-8 pl-2">
				<h4 class="text-4xl mb-3">{{ restaurant.name }}</h4>
				<h5 class="text-sm font-light mb-2">
					{{ restaurant.category?.name }}
				</h5>
				<h6 class="text-sm font-light">
					{{ restaurant.address }}
				</h6>
			</div>
		</div>
		<div class="container pb-32 flex flex-col items-end mt-20">
			<button v-if="!isStartSelectOrder"
					@click="isStartSelectOrder = true"
					class="btn px-10">
				Start Order
			</button>
			<div v-else class="flex items-center">
				<button @click="startOrder" class="btn px-10 mr-3">
					Confirm Order
				</button>
				<button @click="isStartSelectOrder = false" class="btn px-10 bg-black hover:bg-black">
					Cancel Order
				</button>
			</div>
			<div class="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
				<restaurant-dish
					@click="selectDish(dish)"
					@click-option="selectOption"
					v-for="dish in restaurant?.dishes"
					:dish="dish"
					:key="dish.id"
					:is-selected="isSelected(dish)"
					:is-selected-option="isSelectOption"
				/>
			</div>
		</div>
	</div>
</template>