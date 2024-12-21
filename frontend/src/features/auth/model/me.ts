import { USER_ROLE } from '@entities/user';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { computed } from 'vue';

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
        query {
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
	return { ...query, user };
};