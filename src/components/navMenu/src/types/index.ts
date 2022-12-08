export interface menuItem {
	id: number;
	title: string;
	icon: string;
	path: string;
}
export interface IMenuConfig {
	menuItems: menuItem[];
}
