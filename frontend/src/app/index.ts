import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { InMemoryCache, ApolloClient, createHttpLink, HttpLink } from '@apollo/client/core';

// https://apollo.vuejs.org/guide/installation.html
const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	devtools: {
		enabled: true,
		name: 'UberEatsClient',
	},
	// @TODO из ENV получать
	uri: 'http://localhost:8000/graphql',
});

// @TODO почему с этеми не работает нормально
// console.log(createHttpLink({ uri: 'http://localhost:8000/graphql' }));
// console.log(new HttpLink({ uri: 'http://localhost:8000/graphql' }));

createApp(App)
	.use(createPinia())
	.provide(DefaultApolloClient, apolloClient)
	.mount('#app');
