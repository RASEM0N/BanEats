import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { setAuthToken } from './auth';

interface Result {
	AuthLogin: {
		token: string,
	};
}

interface Variables {
	email: string;
	password: string;
}

export const useLogin = () => {
	const gqlMutation = useMutation<Result, Variables>(gql`
        mutation LoginMutation($email: String!, $password: String!) {
            AuthLogin(email: $email, password: $password) {
                token
            }
        }
	`, { fetchPolicy: 'network-only' });

	return {
		...gqlMutation,
		mutate: async (values: Variables): Promise<Result> => {
			const result = await gqlMutation.mutate(values);
			const data = result?.data;
			if (!data) {
				throw new Error('Data in empty');
			}

			setAuthToken(data.AuthLogin.token);
			return data;
		},
	};
};