import { PropType } from "vue";

export type InferDefault<P, T> = T extends null | number | string | boolean | symbol | Function
	? T | ((props: P) => T)
	: (props: P) => T;

export type NotUndefined<T> = T extends undefined ? never : T;

export type InferDefaults<T> = {
	[K in keyof T]?: InferDefault<T, NotUndefined<T[K]>>;
};

export type LinOptional<T> = {
	[P in keyof T]?: T[P];
};

export const definePropType = <T>(val: any): PropType<T> => val;
