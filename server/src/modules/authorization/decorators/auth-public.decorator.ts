import { SetMetadata } from '@nestjs/common';

export const META_KEY = Symbol.for('auth-public');
export const AuthPublic = () => SetMetadata(META_KEY, true);
