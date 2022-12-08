import { ref } from "vue";
import router from "@/router";
import { menuItem } from "../types";
export function useListItems() {
	// 当前激活的index
	const activeIndex = ref<number>(0);

	const handleClick = (item: menuItem) => {
		activeIndex.value = item.id;
		router.push(item.path);
	};

	return { activeIndex, handleClick };
}
