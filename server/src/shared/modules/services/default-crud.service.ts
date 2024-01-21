export interface DefaultCRUD<T> {
	get(...args: any): T | Promise<T> | unknown;

	getAll(...args: any): T[] | Promise<T[]> | unknown;

	create(...args: any): T | Promise<T>;

	update(...args: any): T | Promise<T>;

	delete(...args: any): Promise<void>;
}
