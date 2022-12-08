import { IMenuConfig } from "../types";
export const menuConfig: IMenuConfig = {
	menuItems: [
		{
			id: 1,
			title: "文件",
			icon: "Document",
			path: "/driver/document",
		},
		{
			id: 2,
			title: "相册",
			icon: "Picture",
			path: "/driver/album",
		},
		{
			id: 3,
			title: "收藏夹",
			icon: "Star",
			path: "/driver/starred",
		},
		{
			id: 4,
			title: "回收站",
			icon: "Delete",
			path: "/driver/recycleBin",
		},
	],
};
