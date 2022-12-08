import { ref, watch } from "vue";

import router from "@/router";
import { useRoute } from "vue-router";

import { menuItem } from "../types";
import { pathMapToMenu } from "@/utils";

export function useListItems(emit: any, menuItems: menuItem[]) {
	// 当前激活的menu
	const activeMenu = ref<menuItem>(menuItems[0]);
	// 路由对象
	const route = useRoute();

	// 传入待激活菜单对象
	const handleMenuChange = (item: menuItem) => {
		// 切换激活菜单
		activeMenu.value = pathMapToMenu(menuItems, item.path);
		// 发送菜单改变事件
		emit("menuChange", item);
		// 路由跳转
		router.push(item.path);
	};

	// 监听路由路径,保证刷新后菜单在对应的路由
	watch(
		() => route.path,
		newPath => {
			activeMenu.value = pathMapToMenu(menuItems, newPath);
		},
		{
			immediate: true,
		}
	);
	return { activeMenu, handleMenuChange };
}
