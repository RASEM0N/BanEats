<script setup lang="ts">
import HomeHeader from './HomeHeader.vue';
import { useMe, USER_ROLE } from '@entities/user';
import { EmptyPage } from '@shared/ui';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { user, error, loading } = useMe();

// Данную не вынести без потери:
// 1. HomePage должно показыватся пока информация о пользователе грузится
const redirectByRole = () => {
	const role = user.value?.role;
	const path = route.path;

	if (!role || path !== '/') {
		return;
	}

	switch (role) {
		case USER_ROLE.client:
			return router.push('/restaurants');
		case USER_ROLE.owner:
			return router.push('/my-restaurants');
		default: {
			return router.push('/404');
		}
	}
}

/** Загрузилась/Изменилась роль надо обновить наш роут */
watch(() => user.value?.role, redirectByRole);

/** Путь снова стал /. Допустим перешли по /login, когда авторизованы уже */
watch(() => route.path, redirectByRole)

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