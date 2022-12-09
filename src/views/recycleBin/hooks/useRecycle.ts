import { useNavHeaderStore } from "@/store/navHeader";
import { menuConfig } from "@/components/navMenu";
import router from "@/router/index";

export function useRecycle() {
	function initPage() {
		const menuItems = menuConfig.menuItems;
		const navHeaderStore = useNavHeaderStore();
		const curMenu = menuItems[3].children![0];
		if (navHeaderStore.activeSubMenu === null) {
			navHeaderStore.changeActiveSubMenu(curMenu);
			router.push(curMenu.path);
		}
	}
	return { initPage };
}
