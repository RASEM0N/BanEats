import { User, UserRole } from '../../entities/user.entity';

export type MockUserData = Omit<User, 'isValidPassword'>;
export const createMockUserData = (data?: Partial<MockUserData>): MockUserData => {
	return {
		id: 1,
		email: 'putin-love@mail.ru',
		role: UserRole.client,
		password: '123456',
		isVerified: true,
		createdAt: new Date(),
		updatedAt: new Date(),
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
