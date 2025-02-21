import { InMemoryCache, defaultDataIdFromObject } from '@apollo/client/core';
import { getAuthToken, setAuthToken } from '@entities/auth';

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
				// query { token @client }
				token: () => getAuthToken(),
			},
		},
	},

	// Уже по умолчанию настроено в ApolloClient
	// __typename:id или _id
	// https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-identifier-generation-globally
	dataIdFromObject: (responseObject) => {
		switch (responseObject.__typename) {
			case 'User':
				return `User:${responseObject.id}`;

			case 'Restaurant':
				return `Restaurant:${responseObject.id}`;

			default:
				return defaultDataIdFromObject(responseObject);
		}
	},
});
