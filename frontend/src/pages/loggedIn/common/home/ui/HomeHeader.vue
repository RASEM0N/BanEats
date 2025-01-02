<script setup lang="ts">
import { LogoIcon } from '@shared/ui/icons';
import { useMe } from '@entities/user';

const { user } = useMe();
</script>
<template>
	<transition>
		<div
			id="user-confirm-email"
			:class="[
			'bg-red-500 text-center text-base text-white',
			'transition-[height,padding] delay-300',
			{
				'verified': user?.isVerified,
				'no-verified': !user?.isVerified
			},
		]">
			<span>Please verify your email.</span>
		</div>
	</transition>
	<header class="py-4">
		<div class="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
			<nav>
				<router-link id="nav-home" to="/">
					<logo-icon class="w-44" />
				</router-link>
			</nav>
			<nav>
				<router-link id="nav-edit-profile" class="text-base font-bold" to="/edit-profile">
					MY <span class="text-[#5FB709]">PROFILE</span>
				</router-link>
			</nav>
		</div>
	</header>
</template>
<style scoped>
.verified {
	@apply p-0 h-0;
}

.no-verified {
	@apply p-3 h-12;
}
</style>