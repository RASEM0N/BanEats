<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';

const route = useRoute();
const restaurantId = +route.params.restaurantId;

// @TODO надо с ресторанами фрагменты использовать
// тогда вроде кэшироватся нормально будет

interface RestaurantQueryVariables {
	id: number;
}

interface RestaurantQueryResult {
	RestaurantGet: {
		restaurant: {
			id: number
			name: string
			coverImage: string
			address: string
			category: {
				id: number
				name: string
			},
		};
	}
}

const { result, loading, error } = useQuery<RestaurantQueryResult, RestaurantQueryVariables>(gql`
	query RestaurantQuery($id: ID!) {
		RestaurantGet(restaurantId: $id) {
			restaurant {
				id
                name
                coverImage
                category {
                    id
                    name
                }
                address
			}
		}
	}
`, { id: restaurantId });

const restaurant = computed(() => result.value?.RestaurantGet.restaurant);

</script>
<template>
	{{ error }}
	<div>
		<div
			v-if="restaurant"
			class="bg-gray-800 bg-center bg-cover py-48"
			:style="{ backgroundImage: `url(${restaurant.coverImage})` }"
		>
			<div class="bg-white w-3/12 py-8 pl-2">
				<h4 class="text-4xl mb-3">{{ restaurant.name }}</h4>
				<h5 class="text-sm font-light mb-2">
					{{ restaurant.category?.name }}
				</h5>
				<h6 class="text-sm font-light">
					{{ restaurant.address }}
				</h6>
			</div>
		</div>
	</div>
</template>