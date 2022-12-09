import { menuItem, subMenuItem } from "@/components/navMenu";

/**
 * @desc 给出当前路径，获取当前路径对应的菜单对象
 * @param userMenu 全部的菜单对象
 * @param curPath 当前的路径
 * @returns 匹配到的菜单对象
 */
export function pathMapToMenu(navMenu: menuItem[], curPath: string): any {
	let activeMenu: menuItem | null = null;
	let activeSubMenu: subMenuItem | null = null;
	function _recurseGetMenu(curMenu: menuItem[] | subMenuItem[], curPath: string) {
		for (const menu of curMenu) {
			if (menu.path === curPath) {
				if (menu.type == 1) {
					activeMenu = menu as menuItem;
				} else {
					activeSubMenu = menu as subMenuItem;
					const newPath = curPath.split("/").slice(0, 3).join("/");
					_recurseGetMenu(navMenu, newPath);
				}
			}
			if ((menu as menuItem).children) {
				_recurseGetMenu((menu as menuItem).children!, curPath);
			}
		}
	}
	_recurseGetMenu(navMenu, curPath);

	return { activeMenu, activeSubMenu };
}
