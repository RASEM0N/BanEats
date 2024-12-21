<script setup lang="ts">
import { LogoIcon } from '@shared/ui/icons';
</script>
<template>
	<header class="py-4">
		<div class="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
			<router-link to="/">
				<logo-icon class="w-44" />
			</router-link>
		</div>
	</header>
</template>
