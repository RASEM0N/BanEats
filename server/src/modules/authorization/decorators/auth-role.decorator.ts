import { USER_ROLE } from '@/modules/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const META_KEY = 'available-user-roles';
export const AuthRoles = (roles: USER_ROLE[]) => SetMetadata(META_KEY, roles);
