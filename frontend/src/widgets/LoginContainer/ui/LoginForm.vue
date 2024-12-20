<script setup lang="ts">
interface Props {
	errors: string[];
}

const { errors } = defineProps<Props>();

</script>
<template>
	<form class="flex flex-col mt-5 w-full mb-5">
		<slot></slot>
		<span v-for="error in errors" class="font-medium text-red-500">{{ error }}</span>
	</form>
</template>
<style></style>