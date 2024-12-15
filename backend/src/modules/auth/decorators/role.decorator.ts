import { USER_ROLE } from '@/modules/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

// @TODO все кто используют должны быть описаны в description
export const META_KEY = Symbol.for('allowed-roles');
export const Roles = (roles: USER_ROLE[]) => SetMetadata(META_KEY, roles);
