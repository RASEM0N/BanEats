import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginArgs, LoginOutput } from './dto/auth-login.dto';
import { AuthPublic } from './decorators/auth-public.decorator';

@Resolver()
export class AuthResolver {
	constructor(private readonly authorizationService: AuthService) {}

	@AuthPublic()
	@Mutation(() => LoginOutput, { name: 'AuthLogin' })
	async login(@Args() { email, password }: LoginArgs): Promise<LoginOutput> {
		const { user, token } = await this.authorizationService.login({
			email,
			password,
		});

		return { data: { user, token } };
	}
}
