/**
 * 一级菜单类型接口
 */
export interface actionItem {
	id: number;
	size?: string;
	icon: string;
	color?: string;
	type: number;
}

/**
 * 二级菜单配置类型接口
 */
export interface IHeaderConfig {
	actionItems: actionItem[];
}
