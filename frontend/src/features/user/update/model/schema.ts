
// @TODO user fragments plz...

import gql from 'graphql-tag';

export const UPDATE_USER_MUTATION = gql`
    mutation EditUserMutation($email: String $password: String) {
        UserUpdate(email: $email password: $password) {
            user {
                id,
                email,
                isVerified
            }
        }
    }
`;


export interface UpdateUserMutationVars {
	email?: string,
	password?: string
}

export interface UpdateUserMutationResult {
	UserUpdate: {
		user: {
			id: number,
			email: string
			isVerified: string
		}
	};
}

