import { useQuery } from '@vue/apollo-composable';
import { USER_ME_QUERY, UserMeQueryResult } from './schema';
import { resetAuthToken } from '@entities/auth';
import { computed } from 'vue';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';


// чтоб не привязыватся к vue - из любого места можно будет вызвать
// ну и + в пакет можно будет вынести и изать с оберткой в Angular или React
export const me = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
	return apolloClient.query<UserMeQueryResult>({ query: USER_ME_QUERY });
};

export const useMe = () => {
	const query = useQuery<UserMeQueryResult>(USER_ME_QUERY);

	query.onError((error: any) => {

		// @TODO пока что так
		if (error.cause?.statusCode === 20002) {
			resetAuthToken();
			(window as any).navigation.reload();
		}
	});

	return {
		...query,
		user: computed(() => query.result.value?.UserMe.user),
	};
};