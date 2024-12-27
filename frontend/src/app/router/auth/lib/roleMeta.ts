import { RouteRecordRaw } from 'vue-router';
import { USER_ROLE } from '@entities/user';

export const roleMeta = (routes: RouteRecordRaw[], role: USER_ROLE): RouteRecordRaw[] => {
	return routes.map((v) => {
		v.meta = { ...v.meta, role };
		return v;
	});
};