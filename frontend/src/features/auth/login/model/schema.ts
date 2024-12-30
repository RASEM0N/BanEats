import gql from 'graphql-tag';

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

export interface LoginMutationVars {
    email: string;
    password: string;
}