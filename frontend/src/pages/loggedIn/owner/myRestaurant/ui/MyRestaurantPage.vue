<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { RestaurantDish } from '@features/entites';


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
			dishes: {
				id: number
				name: string
				description: string
				price: number
				options: {
					name: string
					extra: number
				}[]
			}[]
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
				dishes {
					id
					name
					description
					price
					options {
						name
						extra
					}
				}
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

			<!--@TODO лень пиздец делать -->
			<router-link :to="`/restaurants/${restaurant.id}/buy-promotion`" class="text-white bg-lime-700 py-3 px-10">
				Buy Promotion
			</router-link>
			<div class="mt-10">
				<div v-if="restaurant.dishes.length"
					 class="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10"
				>
					<restaurant-dish
						v-for="dish in restaurant.dishes"
						:dish="dish"
						:key="dish.id"
					/>
				</div>
				<h4 v-else class="text-xl mb-5">
					Please upload a dish!
				</h4>
			</div>

			<!--@TODO лень пиздец делать -->
			<div class="mt-20 mb-10">
				<h4 class="text-center text-2xl font-medium">Sales</h4>
				<div class=" max-w-lg w-full mx-auto">
					Diagrams...
				</div>
			</div>
		</div>
	</div>
</template>