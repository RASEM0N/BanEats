import { USER_ROLE } from '@/modules/users/entities/user.entity';
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UBER_EATS_ERROR, UberEastsException } from '@ubereats/common/error';

type AnyRole = 'any';
export type AllowedRoles = USER_ROLE | AnyRole;

type ReturnValue = CustomDecorator<typeof META_KEY>;
type RolesFunction = {
	// через пизду сделана перегрузка
	(role: AnyRole): ReturnValue;
	(...roles: USER_ROLE[]): ReturnValue;
};

export const META_KEY = Symbol.for('allowed-roles');

// @TODO все кто используют должны быть
// описаны в description в Resolver-ов
export const Roles: RolesFunction = (value) => {
	if (value === 'any') {
		return SetMetadata(META_KEY, value);
	}

	if (!value.length) {
		throw new UberEastsException({ errorCode: UBER_EATS_ERROR.server_error });
	}

	return SetMetadata(META_KEY, value);
};
