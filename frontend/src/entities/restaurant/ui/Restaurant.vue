<script lang="ts" setup>
import { RestaurantsQueryResult } from '@pages/restaurants/model/query';

// @TODO да это жестко
interface Props {
	restaurant: RestaurantsQueryResult['RestaurantGetAll']['restaurants'][0];
}

const { restaurant } = defineProps<Props>();
</script>
<template>
	<div class="flex flex-col">
		<div class="bg-cover bg-center mb-3 py-28"
			 :style="{ backgroundImage: `url(${restaurant.coverImage})` }"
		></div>
		<h3 class="text-xl">
			{{ restaurant.id }}: {{ restaurant.name }}
		</h3>
		<span v-if="restaurant.category"
			  class="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
			{{ restaurant.category?.name }}
		</span>
	</div>
</template>