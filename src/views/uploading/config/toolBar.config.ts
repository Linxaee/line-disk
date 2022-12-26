import { IToolBarConfig, toolBarItem } from "@/components/toolBar/types";
import { useToolBarClick } from "../hooks/useToolBarClick";
const { handleVideoPlay, handleVideoPause } = useToolBarClick();
export const toolBarConfig: IToolBarConfig = {
	toolBarItems: [
		{
			icon: "VideoPlay",
			color: "black",
			size: 18,
			tooltipConfig: {
				content: "继续",
				effect: "dark",
				placement: "top",
			},
			clickCallBack: handleVideoPlay,
		},
		{
			icon: "VideoPause",
			color: "black",
			size: 18,
			tooltipConfig: {
				content: "暂停",
				effect: "dark",
				placement: "top",
			},
			clickCallBack: handleVideoPause,
		},
		{
			icon: "Close",
			color: "black",
			size: 18,
			tooltipConfig: { content: "取消任务" },
			clickCallBack(item) {
				console.log(item);
			},
		},
		{
			icon: "Folder",
			color: "black",
			size: 18,
			tooltipConfig: { content: "在本地文件夹打开" },
			clickCallBack(item) {
				console.log(item);
			},
		},
	],
};
