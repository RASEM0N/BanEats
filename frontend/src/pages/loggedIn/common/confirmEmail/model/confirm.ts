import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useMe } from '@features/auth';
import { computed } from 'vue';

interface MutationVariables {
	code: string;
}

export const useConfirmEmail = () => {
	const { user } = useMe();

	if (!user.value) {
		throw new Error('User is empty');
	}

	const isVerified = computed(() => user.value?.isVerified ?? false);
	const { mutate, error, loading, onDone } = useMutation<void, MutationVariables>(gql`
        mutation UserVerifyEmailMutation($code: String!) {
            UserVerifyEmail(code: $code)
        }
	`, {
		fetchPolicy: 'network-only',
	});


	onDone((_, { client: { cache } }) => {
		// https://www.apollographql.com/docs/react/caching/cache-interaction

		cache.modify<typeof user.value>({
			id: cache.identify(user.value!),
			fields: { isVerified: () => true },
		});

		// Также изменяет состояние как и выше
		// только без запросов gql

		// cache.writeFragment({
		// 	id: cache.identify(user.value!),
		// 	fragment: gql`
		//         fragment ConfirmEmailUser on User {
		//             isVerified
		//         }
		// 	`,
		// 	data: {
		// 		isVerified: true,
		// 	},
		// });
	});

	return {
		error,
		loading,
		isVerified,
		confirm: (code: string) => mutate({ code }),
	};
};