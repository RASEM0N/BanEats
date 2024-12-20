<script setup lang="ts">
import { LogoIcon } from '@shared/ui/icons';

interface Props {
	name: string;
	link?: {
		to: string
		description: string
		toDescription: string
	};
}

const { name, link } = defineProps<Props>();
</script>
<template>
	<div class="h-screen flex items-center flex-col mt-10 lg:mt-28">
		<div class="w-full max-w-screen-sm flex flex-col px-5 items-center">
			<logo-icon class="w-52 mb-10" />
			<h4 class="w-full font-medium text-left text-3xl mb-5">
				{{ name }}
			</h4>
			<slot></slot>
			<div v-if="link">
				{{ link.description }}
				<router-link :to="link.to" class="link">{{ link.description }}</router-link>
			</div>
		</div>
	</div>
</template>
<style></style>