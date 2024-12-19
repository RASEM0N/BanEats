import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { InMemoryCache, ApolloClient } from '@apollo/client/core';
import { router } from './router';

// https://apollo.vuejs.org/guide/installation.html
const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	uri: 'http://localhost:8000/graphql',
});

createApp(App)
	.use(createPinia())
	.use(router)
	.provide(DefaultApolloClient, apolloClient)
	.mount('#app');
