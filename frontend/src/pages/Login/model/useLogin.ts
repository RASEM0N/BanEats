import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

/**
 * @see https://vee-validate.logaretm.com/
 * - множество способов валидации формы (ленивая, агресивная и т.д...)
 * - взаимодействие с разными кейсами: touched, dirty ...
 */

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