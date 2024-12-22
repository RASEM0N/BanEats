import { USER_ROLE } from '@entities/user';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';
import { resetAuthToken } from '@features/auth';

interface QueryResult {
	UserMe: {
		user: {
			id: number,
			email: string
			role: USER_ROLE,
			isVerified: boolean
		}
	};
}

export const useMe = () => {
	const query = useQuery<QueryResult>(gql`
        query UserMeQuery {
            UserMe {
                user {
                    id
                    email
                    role
                    isVerified
                }
            }
        }
	`);

	const user = computed(() => query.result.value?.UserMe.user);

	query.onError((error: any) => {

		// @TODO пока что так
		// пиздец да... ну и похуй
		if (error.cause?.statusCode === 20002) {
			resetAuthToken();
			(window as any).navigation.reload()
		}
	});

	return { ...query, user };
};