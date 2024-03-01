import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { META_KEY as USER_ROLE_KEY } from '../decorators/auth-role.decorator';
import { META_KEY as PUBLIC_KEY } from '../decorators/auth-public.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/users.service';
import { JwtService } from '@/modules/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly userService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
		const roles = this.reflector.get<USER_ROLE[]>(
			USER_ROLE_KEY,
			context.getHandler(),
		);

		if (isPublic) {
			return true;
		}

		const gqlContext = GqlExecutionContext.create(context).getContext();
		const authToken = gqlContext.authToken;

		if (!authToken) {
			return false;
		}

		const userId = +this.jwtService.verify(authToken);
		const user = await this.userService.get(userId);

		return this.isValidRole(user, roles);
	}

	private isValidRole(user: User, roles: USER_ROLE[]): boolean {
		// Если не передали роли, то все подходят
		if (!roles) {
			return true;
		}

		// чтоб пустышки не передавали
		if (!roles.length) {
			throw new Error('Список Ролей не должны быть пустым');
		}

		// а тут уже проверяем на то, что роль текущего пользователя
		// входит в список доступных ролей
		return roles.includes(user.role);
	}
}
