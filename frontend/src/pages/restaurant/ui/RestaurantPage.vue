<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useRestaurant } from '../model/useRestaurant';
import { useHead } from '@unhead/vue';

const route = useRoute();
const { restaurant } = useRestaurant(+route.params.restaurantId);

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
	</div>
</template>