import { Query, Resolver } from '@nestjs/graphql';
import { AuthPublic } from '@/modules/auth/decorators/auth-public.decorator';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';

@Resolver()
export class AppResolver {
	@AuthPublic()
	@Query(() => String, { name: 'testHello' })
	hello(): string {
		return 'Hello';
	}

	@AuthPublic()
	@Query(() => String, { name: 'testWithException' })
	withException(): string {
		throw new Error('Some error for test');
	}

	@AuthPublic()
	@Query(() => String, { name: 'testWithUberEatsException' })
	withUberEatsException(): string {
		throw new UberEastsException({
			errorCode: UBER_EATS_ERROR.no_rights,
		});
	}
}
