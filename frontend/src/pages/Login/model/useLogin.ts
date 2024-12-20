import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export const useLogin = () => {
	return useMutation(gql`
        mutation LoginMutation($email: String!, $password: String!) {
            AuthLogin(email: $email, password: $password) {
                token
                user {
                    email
                }
            }
        }
	`);
};