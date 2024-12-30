import { nativeEnum, string } from 'zod';
import { USER_ROLE } from '../model/types';

export const userSchema = {
	email: string().email().min(4).max(40),
	password: string().min(10).max(40),
	role: nativeEnum(USER_ROLE),
};