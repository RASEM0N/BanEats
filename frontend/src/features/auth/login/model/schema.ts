import gql from 'graphql-tag';
import { IUser } from '@entities/user';

// --------------  --------------  --------------

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        AuthLogin(email: $email, password: $password) {
            token
        }
    }
`;

// --------------  --------------  --------------

export interface LoginMutationResult {
    AuthLogin: {
        token: string,
    };
}

export type LoginMutationVars = Pick<IUser, 'email' | 'password'>