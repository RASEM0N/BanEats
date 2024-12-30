import gql from 'graphql-tag';
import { USER, IUserFragment, IUser } from '@entities/user';

export const UPDATE_USER_MUTATION = gql`
    mutation EditUserMutation($email: String $password: String) {
        UserUpdate(email: $email password: $password) {
            user { ...UserFragment }
        }
    }
    ${USER}
`;


export type UpdateUserMutationVars = Partial<Pick<IUser, 'email' | 'password'>>

export interface UpdateUserMutationResult {
	UserUpdate: { user: IUserFragment };
}

