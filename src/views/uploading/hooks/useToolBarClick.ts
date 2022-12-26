import appStore from "@/store";
import { clickCb } from "@/components/toolBar/types";
export function useToolBarClick() {
	const uploadStore = appStore.uploadStore;
	/**
	 * @description 清除多选
	 */
	const handleVideoPlay: clickCb = (item, scope) => {
		console.log(scope);

		const file = uploadStore.getFile(scope.row.uid);
		file.isPause = false;
	};
	const handleVideoPause: clickCb = (item, scope) => {
		const file = uploadStore.getFile(scope.row.uid);
		file.isPause = true;
	};

	return { handleVideoPlay, handleVideoPause };
}
