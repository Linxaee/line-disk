import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{ path: "/", redirect: "/main" },
	{
		path: "/main",
		name: "main",
		component: () => import("@/layout/index.vue"),
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

export default router;
