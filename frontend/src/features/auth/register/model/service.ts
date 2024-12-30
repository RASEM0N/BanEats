import { useMutation } from '@vue/apollo-composable';
import { RegisterMutationVars, REGISTER_MUTATION } from './schema';

export const useRegister = () => {
	const {
		mutate,
		...mutation
	} = useMutation<void, RegisterMutationVars>(REGISTER_MUTATION, { fetchPolicy: 'network-only' });

	return {
		...mutation,
		register: async (values: RegisterMutationVars): Promise<void> => {
			const result = await mutate(values);
			const data = result?.data;

			if (!data) {
				throw new Error('Data is empty');
			}
		},
	};
};
