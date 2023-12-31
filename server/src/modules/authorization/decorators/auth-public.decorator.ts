import { SetMetadata } from '@nestjs/common';

export const META_KEY = 'is-public';
export const AuthPublic = () => SetMetadata(META_KEY, true);
