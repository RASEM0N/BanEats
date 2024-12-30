import gql from 'graphql-tag';
import { USER_ROLE } from '@entities/user';

// --------------  --------------  --------------

export const REGISTER_MUTATION = gql`
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
            __typename
        }
    }
`;

// --------------  --------------  --------------

export interface RegisterMutationVars {
    email: string,
    password: string,
    role: USER_ROLE
}