export interface DefaultCRUD<T> {
	get(...args: any): T | Promise<T>;

	getAll(...args: any): T[] | Promise<T[]>;

	create(...args: any): T | Promise<T>;

	update(...args: any): T | Promise<T>;
}
