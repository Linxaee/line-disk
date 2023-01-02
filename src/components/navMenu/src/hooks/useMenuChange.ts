import { menuItem } from "@/components/navMenu";

import appStore from "@/store";
import { storeToRefs } from "pinia";
import router from "@/router";
import { useRoute } from "vue-router";
import { watch } from "vue";

export function useMenuChange(menuItems: menuItem[], emit?: any) {
	const route = useRoute();
	const navMenuStore = appStore.navMenuStore;
	const navHeaderStore = appStore.navHeaderStore;
	const indexStore = appStore.indexStore;
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

	// 监听路由路径,保证刷新后菜单在对应的路由
	watch(
		() => route,
		(newRoute) => {
			// 监听路由是否是文件夹
			const { folderId } = newRoute.params;
			const { isFolder } = route.meta;
			navHeaderStore.isFolder = !!isFolder;
			navHeaderStore.folderId = isFolder ? parseInt(folderId as string) : 0;
			// indexStore.reloadApp();
		},
		{
			immediate: true,
			deep: true,
		}
	);
	return { activeMenu, firstMenu, handleMenuChange };
}
