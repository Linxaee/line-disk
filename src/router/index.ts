import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{ path: "/", redirect: "/driver" },
	{
		path: "/driver",
		name: "driver",
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "document",
				name: "document",
				component: () => import("@/views/document/document.vue"),
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
				path: "recycleBin",
				name: "recycleBin",
				component: () => import("@/views/recycleBin/recycleBin.vue"),
			},
		],
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

export default router;
