import { createHttpLink, from } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from '@features/auth';

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

export const link = from([authLink, httpLink]);