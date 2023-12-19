import { Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
	constructor(@Inject() private readonly userService: UserService) {}
}
