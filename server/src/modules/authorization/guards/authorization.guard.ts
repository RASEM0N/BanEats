import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const { user } = GqlExecutionContext.create(context).getContext();
		return !!user;
	}
}
