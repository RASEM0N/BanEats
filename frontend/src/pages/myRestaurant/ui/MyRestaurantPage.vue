<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import { computed } from 'vue';


// @TODO надо блять в модуль это вынести
// а то ебать шлак такой

// это потом сделаю
// пока что лень
interface MyRestaurantPageQueryVars {
	id: string;
}

interface MyRestaurantPageQueryResult {
	RestaurantGet: {
		restaurant: {
			id: number
			coverImage: string
			name: string
			address: string
		}
	};
}

const route = useRoute();
const restaurantId = String(route.params.restaurantId);
const { result } = useQuery<MyRestaurantPageQueryResult, MyRestaurantPageQueryVars>(gql`
	query MyRestaurantPageQuery($id: ID!) {
		RestaurantGet(restaurantId: $id) {
			restaurant {
				id
				coverImage
				name
				address
			}
		}
	}
`, {
	id: restaurantId,
});

const restaurant = computed(() => result.value?.RestaurantGet.restaurant!);

</script>
<template>
	<div>
		<div
			class="bg-gray-700 py-28 bg-center bg-cover"
			v-if="restaurant"
			:style="{ backgroundImage: `url(${restaurant.coverImage})`}"
		></div>
		<div class="container mt-10">
			<h2 class="text-4xl font-medium mb-10">
				{{ restaurant.name }}
			</h2>
			<router-link :to="`/restaurants/${restaurant.id}/add-dish`" class="mr-8 text-white bg-gray-800 py-3 px-10">
				Add Dish
			</router-link>
			<router-link :to="`/restaurants/${restaurant.id}/buy-promotion`" class="text-white bg-lime-700 py-3 px-10">
				Buy Promotion
			</router-link>
			<div class="mt-10">
				<h4 class="text-xl mb-5">Please upload a dish!</h4>
			</div>
		</div>
	</div>
</template>