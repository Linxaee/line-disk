import { IToolBarConfig } from "@/components/toolBar/types";
import { useToolBarClick } from "../hooks/useToolBarClick";
const { handleCancelSelect, handleDelete, handleRecover } = useToolBarClick();
export const toolBarConfig: IToolBarConfig = {
	toolBarItems: [
		{
			icon: "Refresh",
			color: "white",
			size: 18,
			tooltipConfig: {
				content: "恢复",
				effect: "dark",
				placement: "top",
			},
			clickCallBack: handleRecover,
		},

		{
			icon: "Delete",
			color: "white",
			size: 18,
			tooltipConfig: { content: "删除" },
			clickCallBack: handleDelete,
		},
		{
			icon: "Remove",
			color: "white",
			size: 18,
			tooltipConfig: { content: "移除多选" },
			clickCallBack: handleCancelSelect,
		},
	],
	style: {},
};
