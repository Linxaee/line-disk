type effectType = "dark" | "light";
type clickCb = (item: toolBarItem) => void;
/**
 * @interface 图标上方气泡的配置项类型接口
 * @link https://element-plus.gitee.io/zh-CN/component/tooltip.html#%E5%B1%9E%E6%80%A7
 */
export interface tooltipConfig {
	/**
	 * @desc 显示的内容,默认'示例'
	 */
	content?: string;
	/**
	 * @desc 背景颜色,默认dark
	 */
	effect?: effectType;
	/**
	 * @desc 显示位置,默认top
	 */
	placement?: string;
	/**
	 * @desc 延迟关闭，单位毫秒,默认10
	 */
	hideAfter?: number;
	/**
	 * @desc 在触发后多久显示内容,单位毫秒,默认10
	 */
	showAfter?: number;
}
/**
 * @interface 工具栏单个item配置项类型接口
 */
export interface toolBarItem {
	/**
	 * @desc Element-Plus中的Icon组件名(首字母大写)
	 */
	icon: string;
	/**
	 * @desc 展示的颜色,默认白
	 */
	color?: string;
	/**
	 * @desc 图标的大小,默认18
	 */
	size?: number;
	/**
	 * @desc 图标上方气泡的配置项
	 */
	tooltipConfig?: tooltipConfig;
	/**
	 * @desc 点击的回调函数
	 */
	clickCallBack?: clickCb;
}
export interface IToolBarConfig {
	toolBarItems: toolBarItem[];
	style?: any;
}
