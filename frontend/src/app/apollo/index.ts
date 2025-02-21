import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient } from '@apollo/client/core';
import { cache } from './cache';
import { link } from './links';
import gql from 'graphql-tag';

// https://apollo.vuejs.org/guide/installation.html

// оптимизация apollo client
// https://habr.com/ru/articles/745848/

export const providerKey = DefaultApolloClient;
export const apolloClient = new ApolloClient({
	devtools: { enabled: import.meta.env.DEV },
	link,
	cache,
});

if (import.meta.env.DEV) {
	// @ts-ignore
	window.apollo = { client: apolloClient, cache, gql };

	// apollo.cache.data.data
	// apollo.cache.storeReader.knownResults
}