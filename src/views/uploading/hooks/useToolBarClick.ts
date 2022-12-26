import appStore from "@/store";
import { clickCb } from "@/components/toolBar/types";
export function useToolBarClick() {
	const uploadStore = appStore.uploadStore;
	/**
	 * @description 传输继续
	 */
	const handleVideoPlay: clickCb = (item, scope) => {
		const file = uploadStore.getFile(scope.row.uid);
		file.isPause = false;
		/**
		 * @TODO 启动断点续传
		 */
	};
	/**
	 * @description 传输暂停
	 */
	const handleVideoPause: clickCb = (item, scope) => {
		const file = uploadStore.getFile(scope.row.uid);
		file.isPause = true;
		/**
		 * @TODO 取消传输请求
		 */
	};

	return { handleVideoPlay, handleVideoPause };
}
