<script lang="ts" setup>

interface Props {
	isSelected?: boolean;
	isSelectedOption?: (dishId: number, options: any[]) => boolean;

	dish: {
		id: number
		name: string,
		description: string,
		price: number
		options?: { name: string, extra: number }[]
	};
}

const emits = defineEmits(['click', 'clickOption']);
const {
	dish,
	isSelected = false,
	isSelectedOption = () => false,
} = defineProps<Props>();
</script>
<template>
	<div :class="['px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all', {
		'border-gray-800': isSelected,
		'hover:border-gray-800': !isSelected
	}]">
		<div class="mb-5">
			<h3 class="text-lg font-medium">
				<span>{{ dish.name }}</span>
				<button
					@click="emits('click')"
					:class="['ml-3 py-1 px-3 focus:outline-none text-sm text-white', {
						'bg-red-500': isSelected,
						'bg-lime-600': !isSelected
					}]"
				>
					{{ isSelected ? 'Remove' : 'Add' }}
				</button>
			</h3>
			<h4 class="font-medium">{{ dish.description }}</h4>
		</div>
		<span>{{ dish.price }}</span>
		<div v-if="dish.options?.length">
			<h5 class="mt-8 mb-3 font-medium">Dish Options:</h5>
			<div class="grid gap-2 justify-start">
				<div v-for="(option, idx) in dish.options"
					 :key="idx"
					 @click="emits('clickOption', dish, option)"
					 :class="['flex items-center', {
					 'border-gray-800': isSelected && isSelectedOption(dish.id, dish.options)
				 }]"
				>
					<span class="mr-2">{{ option.name }}</span>
					<span class="text-sm opacity-75">({{ option.extra }})</span>
				</div>
			</div>
		</div>
	</div>
</template>