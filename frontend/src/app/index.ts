import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { apolloClient, providerKey } from './apollo';
import { createHead } from '@unhead/vue';
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify';
import './index.css';
import 'vue3-toastify/dist/index.css';
import { createYmaps } from 'vue-yandex-maps';


createApp(App)

	// https://vue3-toastify.js-bridge.com/get-started/installation.html
	.use(Vue3Toastify, { autoClose: 3000, position: 'top-right' } as ToastContainerOptions)

	// https://unhead.unjs.io/setup/vue/installation
	.use(createHead())

	// https://pinia.vuejs.org/introduction.html
	.use(createPinia())

	// https://router.vuejs.org/installation.html
	.use(router)

	// https://yandex-maps-unofficial.github.io/vue-yandex-maps/guide/vue3.html
	.use(createYmaps({
		apikey: import.meta.env.VITE_YANDEX_MAP_KEY,
		lang: import.meta.env.VITE_YANDEX_MAP_LANG,
	}))

	// https://apollo.vuejs.org/guide-composable/setup.html
	.provide(providerKey, apolloClient)



	// ...
	.mount('#app');
