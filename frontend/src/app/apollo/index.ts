import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient } from '@apollo/client/core';
import { cache } from './cache';
import { link } from './links';
import gql from 'graphql-tag';

// https://apollo.vuejs.org/guide/installation.html

export const providerKey = DefaultApolloClient;
export const apolloClient = new ApolloClient({
	devtools: { enabled: __IS_DEV__ },
	link,
	cache,
});

if (__IS_DEV__) {
	// @ts-ignore
	window.apollo = { client: apolloClient, cache, gql };
}