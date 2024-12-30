import gql from 'graphql-tag';
import { USER_ROLE } from '@entities/user';

// --------------  --------------  --------------

// @TODO User fragment
export const USER_ME_QUERY = gql`
    query UserMeQuery {
        UserMe {
            user {
                id
                email
                role
                isVerified
            }
        }
    }
`

// --------------  --------------  --------------

// @TODO User fragment
export interface UserMeQueryResult {
    UserMe: {
        user: {
            id: number,
            email: string
            role: USER_ROLE,
            isVerified: boolean
        }
    };
}