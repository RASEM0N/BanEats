import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@/modules/users/entities/user.entity';

export const AuthUserDecorator = createParamDecorator(
	(_, context: ExecutionContext): User => {
		const { user } = GqlExecutionContext.create(context).getContext();
		return user;
	},
);
