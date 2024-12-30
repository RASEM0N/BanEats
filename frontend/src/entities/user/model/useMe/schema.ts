import gql from 'graphql-tag';
import { IUserFragment } from '../gql/types';
import { USER } from '../gql/fragments';

// --------------  --------------  --------------

export const USER_ME_QUERY = gql`
    query UserMeQuery {
        UserMe {
            user {
                ...UserFragment
            }
        }
    }
	${USER}
`

// --------------  --------------  --------------

export interface UserMeQueryResult {
	UserMe: {
		user: IUserFragment
	};
}