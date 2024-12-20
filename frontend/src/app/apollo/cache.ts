import { InMemoryCache, defaultDataIdFromObject } from '@apollo/client/core';
import { getAuthToken, setAuthToken } from '@features/auth';

export const cache = new InMemoryCache({
	typePolicies: {
		LoginOutput: {
			fields: {
				token: {
					merge: (_: string, newValue: string) => {
						setAuthToken(newValue);
						return newValue;
					},
				},
			},
		},

		Query: {
			fields: {

				// query { isLoggedIn @client token @client }
				isLoggedIn: () => !!getAuthToken(),
				token: () => getAuthToken(),
			},
		},
	},

	// Уже по умолчанию настроено в ApolloClient
	// __typename:id или _id
	// https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-identifier-generation-globally
	dataIdFromObject: (responseObject) => {

		console.log(responseObject);

		switch (responseObject.__typename) {
			case 'User':
				return `User:${responseObject.id}:${responseObject.email}`;

			case 'Restaurant':
				return `Restaurant:${responseObject.id}`;

			default:
				return defaultDataIdFromObject(responseObject);
		}
	},
});
