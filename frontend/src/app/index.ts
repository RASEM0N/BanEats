import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable';

// https://apollo.vuejs.org/guide/installation.html
// const apolloClient = new ApolloClient({
// 	cache: new InMemoryCache(),
//
// 	// @TODO вынести
// 	url: createHttpLink({ uri: 'http://localhost:8000/graphql' }),
// });

createApp(App)
	.use(createPinia())

	// https://apollo.vuejs.org/guide-composable/setup.html
	// .use(DefaultApolloClient, apolloClient)
	.mount('#app');
