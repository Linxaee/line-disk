import { watch } from "vue";

import { useRoute } from "vue-router";

import { menuItem } from "@/components/navMenu";
import { pathMapToMenu } from "@/utils";

import appStore from "@/store";
import { storeToRefs } from "pinia";
import router from "@/router";

export function useWatchRoute(menuItems: menuItem[], emit?: any) {
	const navMenuStore = appStore.navMenuStore;
	const navHeaderStore = appStore.navHeaderStore;
	// 第一个菜单项/当前激活的菜单项
	const { firstMenu, activeMenu } = storeToRefs(navMenuStore);

	// 路由对象
	const route = useRoute();

	/**
	 * @desc 切换至待激活菜单对象对应的路由路由
	 * @param item 待激活菜单对象
	 */
	const handleMenuChange = (item: menuItem) => {
		router.push(item.path);
	};

	// 监听路由路径,保证刷新后菜单在对应的路由
	watch(
		() => route.path,
		newPath => {
			// 根据路径获取激活的菜单和二级菜单
			const { activeMenu, activeSubMenu } = pathMapToMenu(menuItems, newPath);
			navMenuStore.changeActiveMenu(activeMenu);
			navHeaderStore.changeActiveSubMenu(activeSubMenu);
			// 发送菜单改变事件
			emit("menuChange", activeMenu);
		},
		{
			immediate: true,
		}
	);
	return { activeMenu, firstMenu, handleMenuChange };
}
