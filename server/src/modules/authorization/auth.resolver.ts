import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginArgs, LoginOutput } from './dtos/auth-login.dto';
import { AuthPublic } from './decorators/auth-public.decorator';

@Resolver()
export class AuthResolver {
	constructor(private readonly authorizationService: AuthService) {}

	@AuthPublic()
	@Mutation(() => LoginOutput, { name: 'AuthLogin' })
	async login(@Args() { email, password }: LoginArgs): Promise<LoginOutput> {
		try {
			const { user, token } = await this.authorizationService.login({
				email,
				password,
			});

			return {
				isOk: true,
				data: {
					user,
					token,
				},
			};
		} catch (e) {
			return {
				isOk: false,
				message: e.message,
				errorCode: e.errorCode,
			};
		}
	}
}
