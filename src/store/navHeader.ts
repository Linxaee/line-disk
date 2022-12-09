import { defineStore } from "pinia";
import { ref } from "vue";
import { subMenuItem } from "@/components/navMenu";
export const useNavHeaderStore = defineStore("navHeader", () => {
	// 第一个二级菜单项
	const firstSubMenu = ref(null as subMenuItem | null);
	// 当前激活菜单项(默认第一个)
	const activeSubMenu = ref(null as subMenuItem | null);

	function changeFirstSubMenu(menu: subMenuItem) {
		firstSubMenu.value = menu;
	}
	function changeActiveSubMenu(menu: subMenuItem) {
		activeSubMenu.value = menu;
	}
	return { firstSubMenu, activeSubMenu, changeFirstSubMenu, changeActiveSubMenu };
});
