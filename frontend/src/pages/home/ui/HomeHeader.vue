<script setup lang="ts">
import { LogoIcon } from '@shared/ui/icons';
import { useMe } from '@features/auth';

const { user } = useMe();
</script>
<template>
	<div v-if="!user?.isVerified" class="bg-red-500 p-3 text-center text-base text-white">
		<span>Please verify your email.</span>
	</div>
	<header class="py-4">
		<div class="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
			<nav>
				<router-link to="/">
					<logo-icon class="w-44" />
				</router-link>
			</nav>
			<nav>
				<router-link class="text-base font-bold" to="/my-profile">
					MY <span class="text-[#5FB709]">PROFILE</span>
				</router-link>
			</nav>
		</div>
	</header>
</template>
