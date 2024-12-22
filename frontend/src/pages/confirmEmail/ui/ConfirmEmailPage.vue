<script lang="ts" setup>
import { useConfirmEmail } from '../model/confirm';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';
import { useRenderConfirm } from '../lib/useRenderConfirm';

const route = useRoute();
const router = useRouter();
const code = route.query.code as string;

const { confirm, error, loading, isVerified } = useConfirmEmail();
const { renderResult, startVerifiedRedirect } = useRenderConfirm({
	loading,
	error,
	isVerified,
	seconds: 3,
	code,
});

onMounted(() => {
	code && confirm(code);
});

watch(isVerified, (value) => {
	value && startVerifiedRedirect().then(() => router.push('/'));
});

</script>
<template>
	<div class="mt-52 flex flex-col items-center justify-center">
		<h2 :class="['text-lg mb-1 font-medium', renderResult.cssClass]">
			{{ renderResult.title }}
		</h2>
		<h4 class="text-gray-700 text-sm">
			{{ renderResult.description }}
			<span v-if="renderResult.highlighted" class="font-bold">{{ renderResult.highlighted }}</span>
		</h4>
	</div>
</template>