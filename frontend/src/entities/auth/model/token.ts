import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const LC_AUTH_KEY = 'auth:authorization_key';

export const useAuthToken = () => useQuery<void, { token: string }>(gql`query { token @client }`);

export const getAuthToken = (): string => {
	return localStorage.getItem(LC_AUTH_KEY) ?? '';
};

export const setAuthToken = (token: string) => {
	localStorage.setItem(LC_AUTH_KEY, token);
};

export const resetAuthToken = () => {
	localStorage.removeItem(LC_AUTH_KEY);
};
