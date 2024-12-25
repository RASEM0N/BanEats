<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import { useHead } from '@unhead/vue';

const route = useRoute();
const slug = String(route.params.slug);

interface CategoryQueryVariables {
	page: number;
	slug: string;
}

interface CategoryQueryResult {
	RestaurantCategoryGetBySlug: {
		category: {
			id: number
			name: string
			coverImage: string
			restaurantCount: number
		}
		restaurants: {
			id: number
			name: string
			coverImage: string
			address: string
		}[]
	};
}

const { result } = useQuery<CategoryQueryResult, CategoryQueryVariables>(gql`
	query CategoryQuery($page: Float!, $slug: String!) {
		RestaurantCategoryGetBySlug(page: $page, slug: $slug) {
			category {
				id
				name
				coverImage
				restaurantCount
			}
			restaurants {
				id
                name
                coverImage
                address
			}
		}
	}
`, { slug, page: 1 });

const category = computed(() => result.value?.RestaurantCategoryGetBySlug.category);
const restaurants = computed(() => result.value?.RestaurantCategoryGetBySlug.restaurants);

useHead({
	title: () => category.value
		? `Category ${category.value?.name} | BanEats`
		: `Category | BanEats`
})

</script>
<template>
	<div>
		<div class="bg-gray-800 bg-center bg-cover py-48"
			 v-if="category"
			 :style="{ backgroundImage: `url(${category.coverImage})` }"
		>
			<div class="bg-white w-3/12 py-8 pl-2">
				<h4 class="text-4xl mb-3">{{ category.name }}</h4>
				<h5 class="text-sm font-light mb-2">
					{{ category.restaurantCount }}
				</h5>
			</div>
		</div>
		<ul>
			<li v-for="value in restaurants" :key="value.id">
				{{ value }}
			</li>
		</ul>
	</div>
</template>