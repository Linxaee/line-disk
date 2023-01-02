import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
export const useIndexStore = defineStore("app", () => {
	const isRouterActive = ref(true);

	/**
	 * @description 刷新app的router-view
	 */
	const reloadApp = () => {
		isRouterActive.value = false;
		nextTick(() => {
			isRouterActive.value = true;
		});
	};
	return { isRouterActive, reloadApp };
});
