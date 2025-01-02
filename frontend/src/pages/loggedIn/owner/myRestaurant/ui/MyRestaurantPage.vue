<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { RestaurantDish } from '@entities/restaurant';
import { useRestaurantGet } from '@features/restaurant/get';

const route = useRoute();
const { restaurant, error } = useRestaurantGet(+route.params.restaurantId);

</script>
<template>
	<div>
		<h2 v-if="error">{{ error }}</h2>
		<div
			class="bg-gray-700 py-28 bg-center bg-cover"
			v-if="restaurant"
			:style="{ backgroundImage: `url(${restaurant?.coverImage})`}"
		>
			<div class="container mt-10">
				<h2 class="text-4xl font-medium mb-10">
					{{ restaurant.name }}
				</h2>
				<router-link :to="`/restaurants/${restaurant.id}/add-dish`" class="mr-8 text-white bg-gray-800 py-3 px-10">
					Add Dish
				</router-link>

				<!--@TODO лень пиздец делать -->
				<router-link :to="`/restaurants/${restaurant.id}/buy-promotion`" class="text-white bg-lime-700 py-3 px-10">
					Buy Promotion
				</router-link>
				<div class="mt-10">
					<div v-if="restaurant.dishes?.length"
						 class="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10"
					>
						<restaurant-dish
							v-for="dish in restaurant.dishes"
							:dish="dish"
							:key="dish.id"
						/>
					</div>
					<h4 v-else class="text-xl mb-5 text-white">
						Please upload a dish!
					</h4>
				</div>

				<!--@TODO лень пиздец делать -->
				<div class="mt-20 mb-10">
					<h4 class="text-center text-2xl font-medium">Sales</h4>
					<div class=" max-w-lg w-full mx-auto">
						Diagrams...
					</div>
				</div>
			</div>
		</div>
	</div>
</template>