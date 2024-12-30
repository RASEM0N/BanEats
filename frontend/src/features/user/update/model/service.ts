import { useMutation } from '@vue/apollo-composable';
import {
	UpdateUserMutationResult,
	UpdateUserMutationVars,
	UPDATE_USER_MUTATION,
} from './schema';

export const useUpdateUser = () => {
	const { mutate, ...mutation } = useMutation<
		UpdateUserMutationResult,
		UpdateUserMutationVars
	>(UPDATE_USER_MUTATION, {
		fetchPolicy: 'network-only',
		update: (cache, result) => {
			const user = result.data?.UserUpdate.user;
			if (!user) {
				return;
			}
			cache.modify<UpdateUserMutationResult['UserUpdate']['user']>({
				id: cache.identify(user),
				fields: {
					email: () => user.email,
					isVerified: () => user.isVerified,
				},
			});
		},
	});

	return {
		...mutation,
		update: (params: UpdateUserMutationVars) => mutate(params),
	};
};