import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthRoles } from '@/modules/authorization/decorators/auth-role.decorator';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { EmptyOutput } from '@ubereats/common/dtos';

import { DeleteDishArgs } from '../dtos/dish-delete.dto';
import { DishService } from '../services/dish.service';
import { CreateDishArgs, CreateDishOutput } from '../dtos/dish-create.dto';
import { UpdateDishArgs, UpdateDishOutput } from '../dtos/dish-update.dto';

@Resolver()
export class DishResolver {
	constructor( private readonly dishService: DishService) {}

	@AuthRoles([USER_ROLE.admin])
	@Mutation(() => CreateDishOutput, { name: 'restaurantDishCreate' })
	async create(
		@AuthUser() user: User,
		@Args() args: CreateDishArgs,
	): Promise<CreateDishOutput> {
		try {
			const dish = await this.dishService.create(user, args);
			return {
				isOk: true,
				data: {
					dish,
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

	@AuthRoles([USER_ROLE.admin])
	@Mutation(() => UpdateDishOutput, { name: 'restaurantDishUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() args: UpdateDishArgs,
	): Promise<UpdateDishOutput> {
		try {
			const dish = await this.dishService.update(user, args);
			return {
				isOk: true,
				data: {
					dish,
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

	@AuthRoles([USER_ROLE.admin])
	@Mutation(() => EmptyOutput, { name: 'restaurantDishDelete' })
	async delete(
		@AuthUser() user: User,
		@Args() args: DeleteDishArgs,
	): Promise<EmptyOutput> {
		try {
			await this.dishService.delete(user, args);
			return {
				isOk: true,
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
