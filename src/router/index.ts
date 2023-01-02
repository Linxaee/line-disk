import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{ path: "/", redirect: "/driver/document/common" },
	{
		path: "/driver",
		name: "driver",
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "document",
				name: "document",
				component: () => import("@/views/document/document.vue"),
				redirect: "/driver/document/common",
				children: [
					{
						path: "common",
						name: "common",
						component: () => import("@/views/document/common/common.vue"),
					},
					{
						path: "folder/:folderId",
						name: "folder",
						meta: { isFolder: true },
						component: () => import("@/views/document/folder/folder.vue"),
					},
				],
			},
			{
				path: "album",
				name: "album",
				component: () => import("@/views/album/album.vue"),
			},
			{
				path: "starred",
				name: "starred",
				component: () => import("@/views/starred/starred.vue"),
			},
			{
				path: "uploading",
				name: "uploading",
				component: () => import("@/views/uploading/uploading.vue"),
			},
			{
				path: "recycleBin",
				name: "recycleBin",
				redirect: "/driver/recycleBin/document",
				component: () => import("@/views/recycleBin/recycleBin.vue"),
				children: [
					{
						path: "document",
						name: "subDocument",
						component: () => import("@/views/recycleBin/subDocument/subDocument.vue"),
					},
					{
						path: "album",
						name: "subAlbum",
						component: () => import("@/views/recycleBin/subAlbum/subAlbum.vue"),
					},
				],
			},
		],
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

export default router;
