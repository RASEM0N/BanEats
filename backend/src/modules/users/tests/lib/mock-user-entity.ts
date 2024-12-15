import { User, USER_ROLE } from '../../entities/user.entity';

export type MockUserData = Omit<User, 'isValidPassword'>;
export const createMockUserData = (data?: Partial<MockUserData>): MockUserData => {
	// @TODO
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return {
		id: 1,
		email: 'putin-love@mail.ru',
		role: USER_ROLE.client,
		password: '123456',
		isVerified: true,
		createdAt: new Date(),
		updatedAt: new Date(),
		restaurant: [],
		...data,
	};
};

export const createMockUserEntity = (data?: Partial<MockUserData>): User => {
	const mockData = createMockUserData(data);
	const user = new User();

	Object.entries(mockData).forEach(([k, v]) => {
		user[k] = v;
	});

	return user;
};
