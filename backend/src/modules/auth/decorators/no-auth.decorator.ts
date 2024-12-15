import { SetMetadata } from '@nestjs/common';

// Должны быть обязательно не аунтефицировованы
// - для регистрации, входа и т.д...
export const META_KEY = Symbol.for('no-authentication');
export const NoAuth = () => SetMetadata(META_KEY, true);
