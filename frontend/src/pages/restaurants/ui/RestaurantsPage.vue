<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useRestaurants } from '../model/useRestaurants';
import { Pagination } from '@shared/ui';
import Restaurant from './Restaurant.vue';
import RestaurantCategory from './RestaurantCategory.vue';


const route = useRoute();
const router = useRouter();
const initPage = isNaN(Number(route.query.page)) ? 1 : Number(route.query.page);

const {
	loading,
	categories,
	restaurants,
	pagination,
	result,
	fetchMore,
} = useRestaurants(initPage);

// @TODO болванка
const loadMore = (page: number) => {
	fetchMore(page);
	router.push({ query: { page } });
};

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
		<template v-if="result && !loading">
			<div class="max-w-screen-2xl mx-auto mt-8">
				<div class="flex justify-around max-w-sm mx-auto">
					<router-link v-for="category in categories"
								 :key="category.id"
								 :to="`/category/${category.slug}`"
					>
						<restaurant-category :category="category" />
					</router-link>
				</div>
			</div>
			<div class="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
				<restaurant
					v-for="value in restaurants"
					:key="value.id"
					:restaurant="value" />
			</div>
			<pagination
				:init-page="initPage"
				:total-pages="pagination.totalPages"
				:total-count="pagination.totalCount"
				:load="loadMore"
				v-slot="{ page, totalPages }"
			>
				<span>Page {{ page }} of {{ totalPages }}</span>
			</pagination>
		</template>
	</div>
</template>
<style></style>