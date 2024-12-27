<script setup lang="ts">
import HomeHeader from './HomeHeader.vue';
import { useMe } from '@features/auth';
import { EmptyPage } from '@shared/ui';
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { USER_ROLE } from '@entities/user';

const route = useRoute();
const router = useRouter();

const { user, error, loading } = useMe();

watchEffect(() => {
	if (!user.value) {
		return;
	}

	if (route.path !== '/') {
		return;
	}

	switch (user.value.role) {
		case USER_ROLE.client:
			return router.push('/restaurants');
		case USER_ROLE.owner:
			return router.push('/my-restaurants');
		case USER_ROLE.admin:
			return router.push('/admin-panel');
		case USER_ROLE.delivery:
			return router.push('/delivery');
		default:
			return router.push('/edit-profile');
	}
});

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