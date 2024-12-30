<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { Restaurant } from '@entities/restaurant';
import { gqlSchema } from '@entities/restaurant';
import { MyRestaurantQueryResult } from '@entities/restaurant';

const { result } = useQuery<MyRestaurantQueryResult>(gqlSchema.MY_RESTAURANT_QUERY);
const restaurants = computed(() => result.value?.RestaurantGetAllMy.restaurants);

</script>
<template>
	<div>
		<div class="max-w-screen-2xl mx-auto mt-32">
			<h2 class="text-4xl font-medium mb-10">My Restaurants</h2>
			<template v-if="restaurants">
				<template v-if="!restaurants.length">
					<h4 class="text-xl mb-5">You have no restaurants.</h4>
				</template>

				<router-link class="link" to="/add-restaurant">
					Create one
				</router-link>

				<div class="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 mx-2">
					<restaurant
						v-for="value in restaurants"
						:key="value.id"
						:restaurant="value" />
				</div>
			</template>
		</div>
	</div>
</template>