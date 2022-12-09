/**
 * 一级菜单类型接口
 */
export interface menuItem {
	id: number;
	title: string;
	icon: string;
	path: string;
	type: number;
	children?: subMenuItem[];
}
/**
 * 二级菜单类型接口
 */
export interface subMenuItem {
	subTitle: string;
	path: string;
	type: number;
}
/**
 * 二级菜单配置类型接口
 */
export interface IMenuConfig {
	menuItems: menuItem[];
}
