<script setup lang="ts">
import { onMounted } from 'vue';
import { useRestaurants } from '../model/service';
import { Pagination } from '@shared/ui/';
import { Restaurant, RestaurantCategory } from '@entities/restaurant';
import { refPage } from '@shared/lib/router';
import RestaurantsSearch from './RestaurantsSearch.vue';

const page = refPage();
const {
	loading,
	categories,
	restaurants,
	restaurantsPagination,
	result,
	load,
} = useRestaurants();

const loadMore = async (page: number) => {
	await load({ page });
};

const loadSearch = async (query: string) => {
	await load({ query });
};

onMounted(() => {
	loadMore(page.value);
});
</script>
<template>
	<div>
		<restaurants-search @search="loadSearch" />
		<div class="max-w-screen-2xl mx-auto mt-8" v-show="result && !loading">
			<div class="flex justify-around max-w-sm mx-auto">
				<restaurant-category
					v-for="category in categories"
					:key="category.id"
					:category="category" />
			</div>
			<div class="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 mx-2">
				<restaurant
					v-for="value in restaurants"
					:key="value.id"
					:restaurant="value" />
			</div>
			<pagination
				:total-pages="restaurantsPagination.totalPages"
				@load="loadMore"
				v-model="page"
				v-slot="{ page, totalPages }"
			>
				<span>Page {{ page }} of {{ totalPages }}</span>
			</pagination>
		</div>
	</div>
</template>
<style></style>