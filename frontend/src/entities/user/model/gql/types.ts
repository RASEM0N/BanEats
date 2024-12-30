import { IUser } from '../types';

export type IUserFragment = Pick<
	IUser,
	'id' | 'role' | 'email' | 'isVerified'
>