<script lang="ts" setup>

interface Props {
	dish: {
		id: number
		name: string,
		description: string,
		price: number
		options: { name: string, extra: number }[]
	};
}

const { dish } = defineProps<Props>();
</script>
<template>
	<div class="px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all">
		<div class="mb-5">
			<h3 class="text-lg font-medium ">{{ dish.name }}</h3>
			<h4 class="font-medium">{{ dish.description }}</h4>
		</div>
		<span>{{ dish.price }}</span>
		<div v-if="dish.options?.length">
			<h5 class="mt-8 mb-3 font-medium">Dish Options:</h5>
			<div v-for="(option, idx) in dish.options"
				  :key="idx"
				  class="flex items-center"
			>
              <span class="mr-2">{{ option.name }}</span>
              <span class="text-sm opacity-75">({{ option.extra }})</span>
            </div>
		</div>
	</div>
</template>