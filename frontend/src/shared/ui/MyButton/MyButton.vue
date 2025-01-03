<script setup lang="ts">
interface Props {
	canClick?: boolean;
	isLoading?: boolean;
}

// https://ru.vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure

// У всех props деструктурированных работает реактивность
// - это получается за счет того, что комплируется в

// export default {
// props: {
// 		canClick: { type: Boolean, required: true },
// 		isLoading: { type: Boolean, default: true },
// },
// setup(props) {
// 		...
// }

const { canClick = true, isLoading = false } = defineProps<Props>();
</script>
<template>
	<button :class="['btn', {
		'bg-gray-300': !canClick,
		'pointer-events-none': !canClick || isLoading
	}]">
		<template v-if="isLoading">Loading...</template>
		<slot v-else></slot>
	</button>
</template>
