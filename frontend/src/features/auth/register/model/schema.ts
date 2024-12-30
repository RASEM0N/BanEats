import gql from 'graphql-tag';
import { IUser} from '@entities/user';

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

export type RegisterMutationVars = Pick<IUser, 'email' | 'password' | 'role'>