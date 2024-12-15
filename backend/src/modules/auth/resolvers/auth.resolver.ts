import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginArgs, LoginOutput } from '../dto/auth-login.dto';
import { NoAuth } from '../decorators/no-auth.decorator';

@Resolver()
export class AuthResolver {
	constructor(private readonly authorizationService: AuthService) {}

	@NoAuth()
	@Mutation(() => LoginOutput, { name: 'AuthLogin' })
	async login(@Args() { email, password }: LoginArgs): Promise<LoginOutput> {
		const { user, token } = await this.authorizationService.login({
			email,
			password,
		});

		return { data: { user, token } };
	}
}
