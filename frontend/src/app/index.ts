import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { router } from './router';
import { apolloClient, providerKey } from './apollo';
import { createHead } from '@unhead/vue';


createApp(App)
	.use(createHead())
	.use(createPinia())
	.use(router)
	.provide(providerKey, apolloClient)
	.mount('#app');
