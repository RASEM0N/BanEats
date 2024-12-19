<script setup lang="ts"></script>
<template>
	<header></header>
	<router-view v-slot="{ Component }">
		<component :is="Component"></component>
	</router-view>
</template>
<style></style>