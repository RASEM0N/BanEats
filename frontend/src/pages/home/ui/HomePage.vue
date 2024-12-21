<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { USER_ROLE } from '@entities/user';
import { LogoIcon } from '@shared/ui/icons';
import { computed } from 'vue';

interface QueryResult {
	UserMe: {
		user: {
			id: number,
			email: string
			role: USER_ROLE,
			isVerified: boolean
		}
	};
}

const { result, error, loading } = useQuery<QueryResult>(gql`
	query {
		UserMe {
			user {
				id
				email
				role
				isVerified
			}
		}
	}
`);

const user = computed(() => result.value?.UserMe.user);

</script>
<template>
	<template v-if="user">
		<header class="py-4">
			<div class="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
				<router-link to="/">
					<logo-icon class="w-44" />
				</router-link>
			</div>
		</header>
		<div>{{ user }}</div>
		<router-view></router-view>
	</template>
	<template v-else-if="loading">
		<div class="h-screen flex justify-center items-center">
			<span class="font-medium text-xl tracking-wide">Loading...</span>
		</div>
	</template>
	<template v-else>
		<div class="h-screen flex justify-center items-center">
			<span class="font-medium text-xl tracking-wide">Error {{ error }}</span>
		</div>
	</template>
</template>
<style></style>