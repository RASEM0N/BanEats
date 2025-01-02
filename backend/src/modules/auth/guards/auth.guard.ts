import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles, META_KEY as USER_ROLE_KEY } from '../decorators/role.decorator';
import { META_KEY as NO_AUTH_KEY } from '../decorators/no-auth.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { BAN_EATS_ERROR, BanEastsException } from '@baneats/common/error';
import { BearerToken, SHARED_COMPONENTS } from '@/core/shared.module';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		@Inject(SHARED_COMPONENTS.bearerToken) private readonly bearerToken: BearerToken,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const isNoAuth = this.isNoAuth(ctx);
		const roles = this.getRoles(ctx);

		if (roles && isNoAuth) {
			throw new BanEastsException({ errorCode: BAN_EATS_ERROR.server_error });
		}

		if (isNoAuth) {
			const isHasToken = !!this.getAuthToken(ctx);

			if (isHasToken) {
				throw new BanEastsException({
					errorCode: BAN_EATS_ERROR.must_not_be_login,
				});
			}

			return true;
		}

		if (roles) {
			const { user } = GqlExecutionContext.create(ctx).getContext();
			const isValid = this.isValidRole(user, roles);

			if (!isValid) {
				throw new BanEastsException({ errorCode: BAN_EATS_ERROR.no_rights });
			}

			return true;
		}

		return true;
	}

	private isValidRole(user: User, roles: AllowedRoles[]): boolean {
		if (!user) {
			throw new BanEastsException({ errorCode: BAN_EATS_ERROR.fail_login });
		}

		// @TODO слишком простая логика
		// по права на ROLE.client должно
		// подходить и для ROLE.Admin т.к. админ все впитывает в себя

		// @TODO где в других местах еще такая проверка есть

		return roles.includes('any') || roles.includes(user.role);
	}

	private isNoAuth(ctx: ExecutionContext): boolean {
		return Boolean(this.reflector.get<boolean>(NO_AUTH_KEY, ctx.getHandler()));
	}

	private getRoles(ctx: ExecutionContext): USER_ROLE[] | undefined {
		return this.reflector.get<USER_ROLE[]>(USER_ROLE_KEY, ctx.getHandler());
	}

	private getAuthToken(ctx: ExecutionContext): string | undefined {
		return this.bearerToken.extractInitToken(
			GqlExecutionContext.create(ctx).getContext().bearerToken,
		);
	}
}
