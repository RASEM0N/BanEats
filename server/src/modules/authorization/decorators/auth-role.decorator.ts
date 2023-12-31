import { UserRole } from '@/modules/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const META_KEY = 'available-user-roles';
export const AuthRoles = (roles: UserRole[]) => SetMetadata(META_KEY, roles);
