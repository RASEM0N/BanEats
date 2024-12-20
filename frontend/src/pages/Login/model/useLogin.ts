import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

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
	`);

	return {
		...gqlMutation,
		mutate: async (values: Variables): Promise<Result> => {
			const result = await gqlMutation.mutate(values);
			const data = result?.data;
			if (!data) {
				throw new Error('Data in empty');
			}

			localStorage.setItem('AUTH_TOKEN', data.AuthLogin.token);
			return data;
		},
	};
};