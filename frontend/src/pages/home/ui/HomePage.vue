<script setup lang="ts">
import HomeHeader from './HomeHeader.vue';
import { useMe } from '@features/auth';
import { EmptyPage } from '@shared/ui';

const { user, error, loading } = useMe();

</script>
<template>
	<template v-if="user">
		<home-header />
		<router-view></router-view>
	</template>
	<empty-page v-else-if="loading">Loading...</empty-page>
	<empty-page v-else>Error {{ error }}</empty-page>
</template>
<style></style>