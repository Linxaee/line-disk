/**
 * @interface 列配置类型接口
 */
export interface ColumnItem {
	/**
	 * @prop 标签
	 */
	label: string;
	/**
	 * @prop 对应属性
	 */
	prop: string;
	/**
	 * @prop 最小宽度
	 */
	minWidth: string;
	/**
	 * @prop 宽度
	 */
	width?: string;
	/**
	 * @prop 自定义插槽名
	 */
	slotName?: string;
}
