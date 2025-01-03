<script lang="ts" setup>
import { computed, watch } from 'vue';

interface Props {
	totalPages: number;
}

const { totalPages } = defineProps<Props>();
const page = defineModel({ default: 1 });
const emits = defineEmits<{
	prev: [page: number],
	next: [page: number],
	load: [page: number]
}>();

const calcPage = computed(() => totalPages < 1 ? 0 : page.value);

const prev = () => emits('prev', --page.value)
const next = () => emits('next', ++page.value)

watch(page, (value) => emits('load', value));

</script>
<template>
	<div class="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
		<button @click="prev"
				data-action="prev"
				:class="['focus:outline-none font-medium text-4xl', {
					 'opacity-30 pointer-events-none': calcPage <= 1
				 }]"
		>
			&larr;
		</button>
		<slot :page="calcPage" :total-pages="totalPages"></slot>
		<button @click="next"
				data-action="next"
				:class="['focus:outline-none font-medium text-4xl', {
					'opacity-40 pointer-events-none': calcPage === totalPages
				}]"
		>
			&rarr;
		</button>
	</div>
</template>