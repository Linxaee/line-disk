import { createRouter, createWebHistory } from "vue-router";

import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/home",
		name: "home",
		component: () => import("@/views/home.vue"),
	},
	{
		path: "/test",
		name: "test",
		component: () => import("@/views/test.vue"),
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

export default router;
