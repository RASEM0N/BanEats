import { Query, Resolver } from '@nestjs/graphql';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';

@Resolver()
export class AppResolver {
	@Query(() => String, { name: 'testHello' })
	hello(): string {
		return 'Hello';
	}

	@Query(() => String, { name: 'testWithException' })
	withException(): string {
		throw new Error('Some error for test');
	}

	@Query(() => String, { name: 'testWithUberEatsException' })
	withUberEatsException(): string {
		throw new UberEastsException({
			errorCode: UBER_EATS_ERROR.no_rights,
		});
	}
}
