import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
	@Query(() => String)
	hello(): Promise<string> {
		return Promise.resolve('Hello');
	}
}
