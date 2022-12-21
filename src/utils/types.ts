import { PropType } from "vue";

export type LinOptional<T> = {
	[P in keyof T]?: T[P];
};

export const definePropType = <T>(val: any): PropType<T> => val;
