import { Query, Resolver } from '@nestjs/graphql';
import { BAN_EATS_ERROR, BanEastsException } from '@baneats/common/error';

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

	@Query(() => String, { name: 'testWithBanEatsException' })
	withBanEatsException(): string {
		throw new BanEastsException({
			errorCode: BAN_EATS_ERROR.no_rights,
		});
	}
}
