<script setup lang="ts">
interface Props {
	canClick?: boolean;
	isLoading?: boolean;
}

const { canClick = true, isLoading = false } = defineProps<Props>();
</script>
<template>
	<button :class="['btn', {
		'bg-gray-300 pointer-events-none': !canClick
	}]">
		<template v-if="isLoading">Loading...</template>
		<slot v-else></slot>
	</button>
</template>
