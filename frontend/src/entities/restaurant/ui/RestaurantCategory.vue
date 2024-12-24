<script lang="ts" setup>
import { RestaurantsQueryResult } from '@pages/restaurants/model/query';

// @TODO да это жестко
interface Props {
	category: RestaurantsQueryResult['RestaurantCategoryGetAll']['categories'][0];
}

const { category } = defineProps<Props>();
</script>
<template>
	<router-link :to="`/restaurants/category/${category.slug}`">
		<div class="flex flex-col group items-center cursor-pointer">
			<div class="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
				 :style="{ backgroundImage: `url(${category.coverImage})` }"
			></div>
			<span class="mt-1 text-sm text-center font-medium">
				{{ category.name }}
			</span>
		</div>
	</router-link>
</template>