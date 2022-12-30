import { menuItem } from "@/components/navMenu";

import appStore from "@/store";
import { storeToRefs } from "pinia";
import router from "@/router";

export function useMenuChange(menuItems: menuItem[], emit?: any) {
	const navMenuStore = appStore.navMenuStore;
	// 第一个菜单项/当前激活的菜单项
	const { firstMenu, activeMenu } = storeToRefs(navMenuStore);

	/**
	 * @description 切换至待激活菜单对象对应的路由路由
	 * @param item 待激活菜单对象
	 */
	const handleMenuChange = (item: menuItem) => {
		router.push(item.path);
		navMenuStore.changeActiveMenu(item);
		emit("menuChange", item);
	};

	return { activeMenu, firstMenu, handleMenuChange };
}
