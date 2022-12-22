export type triggerType = "hover" | "click" | "contextmenu";
export type sizeType = "large" | "default" | "small";
export type itemType = 1 | 2;
export type placementType =
	| "bottom"
	| "auto"
	| "auto-start"
	| "auto-end"
	| "top"
	| "right"
	| "left"
	| "top-start"
	| "top-end"
	| "bottom-start"
	| "bottom-end"
	| "right-start"
	| "right-end"
	| "left-start"
	| "left-end";
export interface dropDownItem {
	/**
	 * @description ep中的图标
	 */
	icon: string;
	/**
	 * @description 是否禁用
	 */
	disabled?: boolean;
	/**
	 * @description 是否展示分割线
	 */
	divided?: boolean;
	/**
	 * 展示的文字内容
	 */
	context: string;
	/**
	 * 该项的类型，1为普通项，2为标题分割项
	 */
	type: itemType;
	/**
	 * 其它属性，style等
	 */
	attrs?: any;
}
export interface IDropDownConfig {
	/**
	 * @description 触发方式
	 */
	trigger?: triggerType;
	/**
	 * @description 大小
	 */
	size?: sizeType;
	/**
	 * @description 挂载位置
	 */
	placement?: placementType;
	/**
	 * @description 菜单项数组
	 */
	dropDownItemList: dropDownItem[];
}
