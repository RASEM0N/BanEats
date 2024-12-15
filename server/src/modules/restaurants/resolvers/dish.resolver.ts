import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from '@/modules/authorization/decorators/role.decorator';
import { AuthUser } from '@/modules/authorization/decorators/auth-user.decorator';
import { User, USER_ROLE } from '@/modules/users/entities/user.entity';
import { CoreOutputWithoutData } from '@ubereats/common/dto';

import { DeleteDishArgs } from '../dto/dish-delete.dto';
import { DishService } from '../services/dish.service';
import { CreateDishArgs, CreateDishOutput } from '../dto/dish-create.dto';
import { UpdateDishArgs, UpdateDishOutput } from '../dto/dish-update.dto';

@Resolver()
export class DishResolver {
	constructor(private readonly dishService: DishService) {}

	@Roles([USER_ROLE.admin])
	@Mutation(() => CreateDishOutput, { name: 'RestaurantDishCreate' })
	async create(
		@AuthUser() user: User,
		@Args() args: CreateDishArgs,
	): Promise<CreateDishOutput> {
		const dish = await this.dishService.create(user, args);
		return { data: { dish } };
	}

	@Roles([USER_ROLE.admin])
	@Mutation(() => UpdateDishOutput, { name: 'RestaurantDishUpdate' })
	async update(
		@AuthUser() user: User,
		@Args() args: UpdateDishArgs,
	): Promise<UpdateDishOutput> {
		const dish = await this.dishService.update(user, args);
		return { data: { dish } };
	}

	@Roles([USER_ROLE.admin])
	@Mutation(() => CoreOutputWithoutData, { name: 'RestaurantDishDelete' })
	async delete(
		@AuthUser() user: User,
		@Args() args: DeleteDishArgs,
	): Promise<CoreOutputWithoutData> {
		await this.dishService.delete(user, args);
		return {};
	}
}
