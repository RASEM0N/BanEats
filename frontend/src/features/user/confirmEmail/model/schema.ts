import gql from 'graphql-tag';

export const USER_VERIFY_EMAIL_MUTATION = gql`
    mutation UserVerifyEmailMutation($code: String!) {
        UserVerifyEmail(code: $code)
    }
`;

export interface UserVerifyEmailMutationVars {
	code: string;
}