<script lang="ts" setup>
import { watch } from 'vue';

interface Props {
	totalPages: number;
}

const { totalPages, load } = defineProps<Props>();
const page = defineModel({ default: 1 });
const emits = defineEmits(['prev', 'next', 'load']);


const prev = () => {
	emits('prev');
	page.value--;
};

const next = () => {
	emits('next');
	page.value++;
};

watch(page, (value) => emits('load', value));

</script>
<template>
	<div class="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
		<button @click="prev"
				:class="['focus:outline-none font-medium text-4xl', {
					 'opacity-30 pointer-events-none': page === 1
				 }]"
		>
			&larr;
		</button>
		<slot :page="page" :total-pages="totalPages"></slot>
		<button @click="next"
				:class="['focus:outline-none font-medium text-4xl', {
					'opacity-40 pointer-events-none': page === totalPages
				}]"
		>
			&rarr;
		</button>
	</div>
</template>