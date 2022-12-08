export type LinOptional<T> = {
	[P in keyof T]?: T[P];
};
