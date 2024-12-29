import { createHttpLink, from, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from '@features/auth';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({ uri: __APP_URL__ });
const authLink = setContext((_, { headers }) => {
	const token = getAuthToken();

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const wsLink = new WebSocketLink({
	uri: __APP_WS__,
	options: {
		reconnect: true,
		connectionParams: () => {
			const token = getAuthToken();
			return {
				'authorization': token ? `Bearer ${token}` : '',
			};
		},
	},
});

export const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);

		// https://dev.to/gdsckiitdev/build-a-chat-app-with-graphql-subscriptions-typescript-part-3-30dd
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	from([wsLink, authLink, httpLink]),
);