import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { USER_ROLE } from '@entities/user';

interface Result {
	UserCreate: {
		user: {
			email: string,
			role: USER_ROLE
		};
	};
}

interface Variables {
	email: string,
	password: string,
	role: USER_ROLE
}

export const useRegister = () => {
	const gqlMutation = useMutation<Result, Variables>(gql`
        mutation RegisterMutation(
            $email: String!,
            $password: String!,
            $role: USER_ROLE!
        ) {
            UserCreate(
                email: $email,
                password: $password,
                role: $role
            ) {
                user {
                    email
                    role
                }
            }
        }
	`);

	return {
		...gqlMutation,
		mutate: async (values: Variables): Promise<Result> => {
			const result = await gqlMutation.mutate(values);
			const data = result?.data;

			if (!data) {
				throw new Error('Data is empty');
			}

			return data;
		},
	};
};