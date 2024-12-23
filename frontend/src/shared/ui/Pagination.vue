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
		<button class="focus:outline-none font-medium text-2xl"
				v-if="page > 1"
				@click="prev"
		>
			&larr;
		</button>
		<slot :page="page" :total-pages="totalPages"></slot>
		<button class="focus:outline-none font-medium text-2xl"
				v-if="page !== totalPages"
				@click="next"
		>
			&rarr;
		</button>
	</div>
</template>