import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

interface MutationVariables {
	email?: string,
	password?: string
}

interface MutationResult {
	UserUpdate: {
		user: {
			id: number,
			email: string
			isVerified: string
		}
	};
}

export const useEditUser = () => {
	const { error, loading, mutate } = useMutation<MutationResult, MutationVariables>(gql`
        mutation EditUserMutation($email: String $password: String) {
            UserUpdate(email: $email password: $password) {
                user {
                    id,
                    email,
                    isVerified
                }
            }
        }
	`, {
		fetchPolicy: 'network-only',
		update: (cache, result) => {
			const user = result.data?.UserUpdate.user;
			if (!user) {
				return;
			}
			cache.modify<MutationResult['UserUpdate']['user']>({
				id: cache.identify(user),
				fields: {
					email: () => user.email,
					isVerified: () => user.isVerified,
				},
			});
		},
	});

	return {
		error,
		loading,
		mutate,
	};
};