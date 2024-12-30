<script lang="ts" setup>
import { IRestaurantFragment } from '../model/gql/types';

interface Props {
	restaurant: IRestaurantFragment
}

const { restaurant } = defineProps<Props>();
</script>
<template>
	<router-link :to="`/restaurants/${restaurant.id}`">
		<div class="flex flex-col">
			<div class="bg-cover bg-center mb-3 py-28"
				 :style="{ backgroundImage: `url(${restaurant.coverImage})` }"
			></div>
			<h3 class="text-xl">
				{{ restaurant.id }}: {{ restaurant.name }}
			</h3>
			<span class="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
				{{ restaurant.category?.name }}
			</span>
		</div>
	</router-link>
</template>