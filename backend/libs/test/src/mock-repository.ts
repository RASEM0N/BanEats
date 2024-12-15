import { Repository } from 'typeorm';
import { MockComponent } from './mock-component';

export type MockRepository<Entity> = MockComponent<Repository<Entity>>;
export const createMockRepository = <Entity>(): MockRepository<Entity> => {
	return {
		findOne: jest.fn(),
		find: jest.fn(),
		save: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	};
};
