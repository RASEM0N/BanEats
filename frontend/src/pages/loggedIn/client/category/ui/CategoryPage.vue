<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useRestaurantCategoryGet } from '@features/restaurant/get';

const route = useRoute();
const { category, restaurants } = useRestaurantCategoryGet({
	slug: String(route.params.slug),
	page: 1,
});

useHead({
	title: () => category.value
		? `Category ${category.value?.name} | BanEats`
		: `Category | BanEats`,
});

</script>
<template>
	<div>
		<div class="bg-gray-800 bg-center bg-cover py-48"
			 v-if="category"
			 :style="{ backgroundImage: `url(${category.coverImage})` }"
		>
			<div class="bg-white w-3/12 py-8 pl-2">
				<h4 class="text-4xl mb-3">{{ category.name }}</h4>
				<h5 class="text-sm font-light mb-2">
					{{ category.restaurantCount }}
				</h5>
			</div>
		</div>
		<div class="m-10 flex flex-wrap justify-center gap-5">
			<router-link v-for="value in restaurants"
						 :key="value.id"
						 :to="`/restaurants/${value.id}`"
			>
				<div
					class="relative w-[100px] h-[100px] rounded-[50%]"
					:style="{
					 	backgroundImage: `url(${value.coverImage})`,
					 	backgroundRepeat: 'no-repeat',
					 	backgroundPosition: 'center',
					 	backgroundSize: 'cover'
				 	}"
				>
					<span
						class="absolute h-full w-full flex justify-center items-center uppercase overflow-hidden bg-gray-950/[.4] text-white rounded-[50%] hover:bg-gray-950/[.2]">
						{{ value.name }}
					</span>
				</div>
			</router-link>
		</div>
	</div>
</template>