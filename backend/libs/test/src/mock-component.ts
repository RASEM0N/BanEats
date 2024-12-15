type TObject = {
	[k in string | number | symbol]: any;
};

export type MockComponent<T> = {
	[key in keyof T]?: jest.Mock;
};
export type MockComponentDeep<T> = {
	[key in keyof T]?: T[key] extends TObject ? MockComponentDeep<T[key]> : jest.Mock;
};
