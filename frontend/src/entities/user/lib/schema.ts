import { nativeEnum, string } from 'zod';
import { USER_ROLE } from '../model/types';

export const email = string().email();
export const password = string().min(10).max(40);
export const role = nativeEnum(USER_ROLE);
