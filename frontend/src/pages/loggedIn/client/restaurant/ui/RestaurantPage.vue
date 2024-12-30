<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { RestaurantDish } from '@entities/restaurant';
import { toast } from 'vue3-toastify';
import { useRestaurantGet } from '@features/restaurant/get';
import { useOrderCreate } from '@features/order/create';
import { ref } from 'vue';

const route = useRoute();
const restaurantId = +route.params.restaurantId;
const isStartSelectOrder = ref<boolean>(false);
const { restaurant } = useRestaurantGet(restaurantId);
const {
	isValid,
	create,
	selectItem,
	selectItemOption,
	isSelectItem,
	isSelectItemOption,
} = useOrderCreate(restaurantId);

const createOrder = () => {
	if (!isValid()) {
		toast('Can\'t place empty order', {
			position: toast.POSITION.TOP_RIGHT,
			type: toast.TYPE.ERROR,
		});
	}

	create();
};

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
				<button @click="createOrder" class="btn px-10 mr-3">
					Confirm Order
				</button>
				<button @click="isStartSelectOrder = false" class="btn px-10 bg-black hover:bg-black">
					Cancel Order
				</button>
			</div>
			<div class="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
				<restaurant-dish
					@click="selectItem(dish.id)"
					@click-option="selectItemOption"
					v-for="dish in restaurant?.dishes"
					:dish="dish"
					:key="dish.id"
					:is-selected="isSelectItem(dish.id)"
					:is-selected-option="isSelectItemOption"
				/>
			</div>
		</div>
	</div>
</template>