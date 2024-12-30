import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { UserMeQueryResult, USER_ME_QUERY } from '@features/auth/me/model/schema';
import { resetAuthToken } from '@entities/auth';

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