import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { InMemoryCache, ApolloClient, createHttpLink, from } from '@apollo/client/core';
import { router } from './router';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from '@features/auth';

const httpLink = createHttpLink({ uri: __APP_URL__ });
const authLink = setContext((_, { headers }) => {
	const token = getAuthToken();

	if (!token) {
		return headers;
	}

	return { ...headers, authorization: `Bearer ${token}` };
});

// https://apollo.vuejs.org/guide/installation.html
const apolloClient = new ApolloClient({
	devtools: { enabled: __IS_DEV__ },
	cache: new InMemoryCache(),
	link: from([authLink, httpLink]),
});

createApp(App)
	.use(createPinia())
	.use(router)
	.provide(DefaultApolloClient, apolloClient)
	.mount('#app');
