import { menuItem } from "@/components/navMenu";
const firstMenu: menuItem | undefined = undefined;
/**
 * 给出当前路径，获取当前路径对应的菜单对象
 * @param userMenu 全部的菜单对象
 * @param curPath 当前的路径
 * @param breadcrumbs 面包屑数组
 * @returns 匹配到的菜单对象
 */
export function pathMapToMenu(
	userMenu: menuItem[],
	curPath: string
	// breadcrumbs?: IBreadcrumb[]
): menuItem {
	for (const menu of userMenu) {
		if (menu.path === curPath) return menu;
	}
	return userMenu[0];
}

/**
 *
 * @param userMenus 全部的菜单对象
 * @param curPath 当前的路径
 * @returns 面包屑数组
 */
// export function pathMapBreadcrumbs(userMenus: any[], curPath: string) {
// 	const breadcrumbs: IBreadcrumb[] = [];
// 	pathMapToMenu(userMenus, curPath, breadcrumbs);
// 	return breadcrumbs;
// }

// export function mapMenusToPermissions(userMenus: any[]) {
// 	const permissions: string[] = [];

// 	const _recurseGetPermission = (menus: any[]) => {
// 		for (const menu of menus) {
// 			if (menu.type === 1 || menu.type === 2) {
// 				_recurseGetPermission(menu.children ?? []);
// 			} else if (menu.type === 3) {
// 				permissions.push(menu.permission);
// 			}
// 		}
// 	};
// 	_recurseGetPermission(userMenus);

// 	return permissions;
// }

// export { firstMenu };
