import { MockComponent, MockComponentDeep } from '@/shared/lib/tests/mock-component';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { DataSource, EntityManager } from 'typeorm';

export interface MockQueryRunner extends Omit<MockComponent<QueryRunner>, 'manager'> {
	manager: MockComponent<EntityManager>;
}

export interface MockDataSource extends MockComponentDeep<DataSource> {
	_mockQueryRunner: MockComponentDeep<QueryRunner>;
}

export const createMockDataSource = (): MockDataSource => {
	const queryRunner: MockQueryRunner = {
		connect: jest.fn(),
		startTransaction: jest.fn(),
		commitTransaction: jest.fn(),
		release: jest.fn(),
		rollbackTransaction: jest.fn(),
		manager: {
			save: jest.fn(),
		},
	};

	return {
		createQueryRunner: () => queryRunner,
		_mockQueryRunner: {},
	};
};
