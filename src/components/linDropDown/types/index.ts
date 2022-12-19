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
	icon: string;
	disabled?: boolean;
	divided?: boolean;
	context: string;
	type: itemType;
	attrs?: any;
}
export interface IDropDownConfig {
	trigger?: triggerType;
	size?: sizeType;
	placement?: placementType;
	dropDownItemList: dropDownItem[];
}
