import { defineStore } from "pinia";
import { ref } from "vue";
import { subMenuItem } from "@/components/navMenu";
import { menuItem, menuConfig } from "@/components/navMenu";
interface IBreadcrumb {
	title: string;
	path: string;
}
export const useNavHeaderStore = defineStore(
	"navHeader",
	() => {
		// 第一个菜单项
		const firstMenu = ref(menuConfig.menuItems[0]);
		// 面包屑数组
		const breadcrumbs = ref([firstMenu.value]);
		// 第一个二级菜单项
		const firstSubMenu = ref(null as subMenuItem | null);
		// 当前激活菜单项(默认第一个)
		const activeSubMenu = ref(null as subMenuItem | null);

		function pushCrumb(crumb: any) {
			breadcrumbs.value.push(crumb);
		}
		function changeFirstSubMenu(menu: subMenuItem) {
			firstSubMenu.value = menu;
		}
		function changeActiveSubMenu(menu: subMenuItem) {
			activeSubMenu.value = menu;
		}
		return {
			firstSubMenu,
			activeSubMenu,
			breadcrumbs,
			changeFirstSubMenu,
			changeActiveSubMenu,
			pushCrumb,
		};
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					// 自定义存储的 key，默认是 store.$id
					key: "activeSubMenu",
					paths: ["activeSubMenu", "breadcrumbs"],
				},
			],
		},
	}
);
