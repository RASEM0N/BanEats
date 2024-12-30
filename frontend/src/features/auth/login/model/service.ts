import { useMutation } from '@vue/apollo-composable';
import {
	LoginMutationResult,
	LoginMutationVars,
	LOGIN_MUTATION,
} from './schema';
import { setAuthToken } from '@entities/auth';

export const useLogin = () => {
	const { mutate, ...mutation } = useMutation<
		LoginMutationResult,
		LoginMutationVars
	>(LOGIN_MUTATION, { fetchPolicy: 'network-only' });

	return {
		...mutation,
		login: async (values: LoginMutationVars): Promise<LoginMutationResult> => {
			const result = await mutate(values);
			const data = result?.data;
			if (!data) {
				throw new Error('Data in empty');
			}

			setAuthToken(data.AuthLogin.token);
			return data;
		},
	};
};