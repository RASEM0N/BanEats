import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles, META_KEY as USER_ROLE_KEY } from '../decorators/role.decorator';
import { META_KEY as NO_AUTH_KEY } from '../decorators/no-auth.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { UserService } from '@/modules/users/services/user.service';
import { JwtService } from '@ubereats/jwt';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const isNoAuth = this.isNoAuth(ctx);
		const roles = this.getRoles(ctx);

		if (roles && isNoAuth) {
			throw new UberEastsException({ errorCode: UBER_EATS_ERROR.server_error });
		}

		if (isNoAuth) {
			return !this.getAuthToken(ctx);
		}

		if (roles) {
			try {
				const userId = +this.jwtService.verify(this.getAuthToken(ctx));
				const user = await this.userService.get(userId);

				return this.isValidRole(user, roles);
			} catch (e) {
				throw new UberEastsException({
					errorCode: UBER_EATS_ERROR.fail_login,
					message: e.message,
				});
			}
		}

		return true;
	}

	private isValidRole(user: User, roles: AllowedRoles[]): boolean {
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
		return GqlExecutionContext.create(ctx).getContext().authToken;
	}
}
