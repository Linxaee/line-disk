import { ref } from "vue";
import router from "@/router";
import { menuItem } from "../types";
import localCache from "@/utils/localCache";
export function useListItems(emit: any, menuItems: menuItem[]) {
	// 当前激活的index
	const activeIndex = ref(0);

	const handleMenuChange = (item: menuItem) => {
		// 切换激活index
		activeIndex.value = item.id;
		// 存入local
		localCache.setCache("activeIndex", activeIndex.value);
		// 发送菜单改变事件
		emit("menuChange", item);
		// 路由跳转
		router.push(item.path);
	};

	const initMenu = () => {
		// 获取激活index
		activeIndex.value = parseInt(localCache.getCache("activeIndex") ?? "1") ?? 1;
		// 获取激活item
		const activeItem = menuItems.find(item => item.id === activeIndex.value);
		// 发送菜单改变事件
		emit("menuChange", activeItem);
		// 路由跳转
		router.push(activeItem!.path);
	};
	return { activeIndex, handleMenuChange, initMenu };
}
