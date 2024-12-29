<script lang="ts" setup>
import type { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import { computed, shallowRef } from 'vue';

// Расскоментить и из index.ts инициализацию убрать
// createYmapsOptions({
// 	apikey: import.meta.env.VITE_YANDEX_MAP_KEY,
// 	lang: import.meta.env.VITE_YANDEX_MAP_LANG,
// })


const map = shallowRef<YMap | null>();

// @TODO логика позиции текущей нужна
// пока что пиздец как сыро
const location = computed(() => {
	return {
		center: [37.617644, 55.755819],
		zoom: 9,
	};
});


</script>
<template>
	<div>
		<yandex-map
			v-model="map"
			:settings="{ location }"
			width="100%"
			height="500px"
		>
			<yandex-map-default-scheme-layer />
		</yandex-map>
	</div>
</template>