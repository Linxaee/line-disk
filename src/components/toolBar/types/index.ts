export type effectType = "dark" | "light";
export type clickCb = (item: toolBarItem, scope?: any) => void;
/**
 * @interface 图标上方气泡的配置项类型接口
 * @link https://element-plus.gitee.io/zh-CN/component/tooltip.html#%E5%B1%9E%E6%80%A7
 */
export interface tooltipConfig {
	/**
	 * @description 显示的内容,默认'示例'
	 */
	content?: string;
	/**
	 * @description 背景颜色,默认dark
	 */
	effect?: effectType;
	/**
	 * @description 显示位置,默认top
	 */
	placement?: string;
	/**
	 * @description 延迟关闭，单位毫秒,默认10
	 */
	hideAfter?: number;
	/**
	 * @description 在触发后多久显示内容,单位毫秒,默认10
	 */
	showAfter?: number;
}
/**
 * @interface 工具栏单个item配置项类型接口
 */
export interface toolBarItem {
	/**
	 * @description Element-Plus中的Icon组件名(首字母大写)
	 */
	icon: string;
	/**
	 * @description 展示的颜色,默认白
	 */
	color?: string;
	/**
	 * @description 图标的大小,默认18
	 */
	size?: number;
	/**
	 * @description 图标上方气泡的配置项
	 */
	tooltipConfig?: tooltipConfig;
	/**
	 * @description 点击的回调函数
	 */
	clickCallBack?: clickCb;
}
export interface IToolBarConfig {
	toolBarItems: toolBarItem[];
	style?: any;
}
