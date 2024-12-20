import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { router } from './router';
import { apolloClient, providerKey } from './apollo';


createApp(App)
	.use(createPinia())
	.use(router)
	.provide(providerKey, apolloClient)
	.mount('#app');
