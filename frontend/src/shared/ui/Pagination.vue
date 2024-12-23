<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
	initPage: number,
	totalPages: number
	totalCount: number
	load: (page: number) => Promise<void>
}

const emits = defineEmits(['prev', 'next']);

const { initPage, totalPages, load } = defineProps<Props>();
const page = ref(initPage);

const prev = () => {
	emits('prev');
	page.value--;
};

const next = () => {
	emits('next');
	page.value++;
};

watch(page, (value) => load(value));

</script>
<template>
	<div class="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
		<button  @click="prev"
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