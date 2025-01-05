<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0)
const count2 = ref(0)
</script>
<template>
	<h1>
		- Count static.<br>
		------ вызывается и рендарится 1 раз (и все что внутри него)<br>
		------ достигается за того, что не зависимостей у него в виде v-bind: и { }<br>
		------ можно ручками сделать 1 рендер через v-once
	</h1>

	<h1 class="py-5">
		- Count №1: {{ count }}. <mark>ЕДИНСТВЕННЫЙ КТО ПЕРЕНДАРИТСЯ</mark>
		<button class="border border-black rounded-s p-2" @click="count++">
			Increment
		</button>
	</h1>

	<h1>
		- Count №2: {{ count2 }}. При изменение count вызовется по новой <b>console.log)</b><br>
		------ В такого нету. Там конкретно изменится только зависимые элементы
		{{ console.log(`Count №2`) }}
	</h1>
	<br><br><br><br>
	<p class="px-2"><i>Смотрим Render Code в Vue Devtools чтоб понять, как отрендарится компонент.<br>Компоненты с кэшированием</i> <b>_cache[3] || (_cache[3] = _createElementVNode</b> вызовутся 1 раз, как и их внутрянка</p>
</template>