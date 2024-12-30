import gql from 'graphql-tag';

export const USER = gql`
	fragment UserFragment on User {
		id
		email
		isVerified
		role
	}
`