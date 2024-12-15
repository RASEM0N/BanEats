import { SetMetadata } from '@nestjs/common';

// @TODO все кто используют должны быть описаны в description
export const META_KEY = Symbol.for('auth-public');
export const AuthPublic = () => SetMetadata(META_KEY, true);
