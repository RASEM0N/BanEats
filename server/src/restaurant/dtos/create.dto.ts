import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
	@Field(() => String)
	@IsString()
	@Length(5, 100)
	name: string;

	@Field(() => Boolean)
	@IsBoolean()
	isVegan: boolean;

	@Field(() => String)
	@IsString()
	@Length(5, 255)
	address: string;

	@Field(() => String)
	@IsString()
	@Length(5, 255)
	ownersName: string;

	@Field(() => String)
	@IsString()
	@Length(5, 100)
	category: string;
}
