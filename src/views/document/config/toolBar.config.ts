import { toolBarItem } from "@/components/toolBar/types";
export const toolBarConfig: toolBarItem[] = [
	{
		icon: "Download",
		color: "white",
		size: 18,
		tooltipConfig: {
			content: "下载",
			effect: "dark",
			placement: "top",
		},
	},
	{
		icon: "Link",
		color: "white",
		size: 18,
		tooltipConfig: { content: "分享" },
	},
	{
		icon: "Star",
		color: "white",
		size: 18,
		tooltipConfig: { content: "收藏" },
	},
	{
		icon: "Delete",
		color: "white",
		size: 18,
		tooltipConfig: { content: "删除" },
	},
	{
		icon: "Remove",
		color: "white",
		size: 18,
		tooltipConfig: { content: "移除多选" },
	},
];
