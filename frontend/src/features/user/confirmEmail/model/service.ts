import { computed } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useMe, IUser } from '@entities/user';
import { USER_VERIFY_EMAIL_MUTATION, UserVerifyEmailMutationVars } from './schema';

export const useConfirmEmail = () => {

	const { user } = useMe();
	const {
		mutate,
		error,
		loading,
	} = useMutation<void, UserVerifyEmailMutationVars>(USER_VERIFY_EMAIL_MUTATION, {
		fetchPolicy: 'network-only',
		update: (cache) => {
			cache.modify<IUser>({
				id: cache.identify(user.value!),
				fields: { isVerified: () => true },
			});
		}
	});

	const isVerified = computed(() => user.value?.isVerified ?? false);


	return {
		error,
		loading,
		isVerified,
		confirm: (code: string) => mutate({ code }),
	};
};