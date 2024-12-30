import { useQuery } from '@vue/apollo-composable';
import { USER_ME_QUERY, UserMeQueryResult } from './schema';
import { resetAuthToken } from '@entities/auth';
import { computed } from 'vue';

export const useMe = () => {
	const query = useQuery<UserMeQueryResult>(USER_ME_QUERY);

	query.onError((error: any) => {

		// @TODO пока что так
		if (error.cause?.statusCode === 20002) {
			resetAuthToken();
			(window as any).navigation.reload()
		}
	});

	return {
		...query,
		user: computed(() => query.result.value?.UserMe.user)
	};
};