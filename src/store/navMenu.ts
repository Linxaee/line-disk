import { defineStore } from "pinia";
import { ref } from "vue";
import { menuItem, menuConfig } from "@/components/navMenu";
export const useNavMenuStore = defineStore("navMenu", () => {
	// 第一个菜单项
	const firstMenu = ref(menuConfig.menuItems[0]);

	// 当前激活菜单项(默认第一个)
	const activeMenu = ref(firstMenu.value);

	function changeFirstMenu(menu: menuItem) {
		firstMenu.value = menu;
	}
	function changeActiveMenu(menu: menuItem) {
		activeMenu.value = menu;
	}
	return { firstMenu, activeMenu, changeFirstMenu, changeActiveMenu };
});
