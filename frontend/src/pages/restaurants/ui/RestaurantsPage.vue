<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useRestaurants } from '../model/useRestaurants';
import { Pagination } from '@shared/ui/';
import Restaurant from './Restaurant.vue';
import RestaurantCategory from './RestaurantCategory.vue';
import { refPage } from '../lib/page';
import { onMounted } from 'vue';

const router = useRouter();
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
	await router.push({ query: { page } });
	await load(page);
};

onMounted(() => {
	load(page.value);
});

</script>
<template>
	<div>
		<form class="bg-gray-800 w-full py-40 flex items-center justify-center">
			<input
				type="search"
				class="input rounded-md border-0 w-3/4 md:w-3/12"
				placeholder="Search restaurants..."
			/>
		</form>
		<div class="max-w-screen-2xl mx-auto mt-8"
			 v-show="result && !loading"
		>
			<div class="flex justify-around max-w-sm mx-auto">
				<router-link v-for="category in categories"
							 :key="category.id"
							 :to="`/category/${category.slug}`"
				>
					<restaurant-category :category="category" />
				</router-link>
			</div>
			<div class="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 mx-2">
				<restaurant
					v-for="value in restaurants"
					:key="value.id"
					:restaurant="value" />
			</div>
			<pagination
				:total-pages="restaurantsPagination.totalPages"
				:total-count="restaurantsPagination.totalCount"
				:load="loadMore"
				v-model="page"
				v-slot="{ page, totalPages }"
			>
				<span>Page {{ page }} of {{ totalPages }}</span>
			</pagination>
		</div>
	</div>
</template>
<style></style>