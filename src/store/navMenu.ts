import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import { menuItem, menuConfig } from "@/components/navMenu";
export const useNavMenuStore = defineStore(
	"navMenu",
	() => {
		// 第一个菜单项
		let firstMenu = {
			id: 1,
			title: "文件",
			icon: "Document",
			path: "/driver/document/common",
			type: 1,
		};

		// 当前激活菜单项(默认第一个)
		const activeMenu = ref(firstMenu);

		function changeFirstMenu(menu: menuItem) {
			firstMenu = menu;
		}
		function changeActiveMenu(menu: menuItem) {
			activeMenu.value = menu;
		}
		return { firstMenu, activeMenu, changeFirstMenu, changeActiveMenu };
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					// 自定义存储的 key，默认是 store.$id
					key: "activeMenu",
					paths: ["activeMenu"],
				},
			],
		},
	}
);
