import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LoginDto, LoginOutput } from './dtos/login.dto';
import { AuthPublic } from './decorators/auth-public.decorator';

@Resolver()
export class AuthorizationResolver {
	constructor(@Inject() private readonly authorizationService: AuthorizationService) {}

	@AuthPublic()
	@Mutation(() => LoginOutput, { name: 'authorizationLogin' })
	async login(@Args() { email, password }: LoginDto): Promise<LoginOutput> {
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
