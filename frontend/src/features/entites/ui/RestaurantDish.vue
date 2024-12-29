<script lang="ts" setup>

interface Props {
	dish: {
		id: number
		name: string,
		description: string,
		price: number
	}
}

const { dish } = defineProps<Props>()
</script>
<template>
	<div class="px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all">
		<div class="mb-5">
			<h3 class="text-lg font-medium ">{{ dish.name }}</h3>
			<h4 class="font-medium">{{ dish.description }}</h4>
		</div>
		<span>{{ dish.price }}</span>
	</div>
</template>