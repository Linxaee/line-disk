<template>
	<header class="navHeader">
		<div class="pageTitle">
			<div class="title">{{ activeMenu.title }}</div>
			<ul class="tabs" v-if="activeMenu.children">
				<template v-for="subMenu in activeMenu.children" :key="subMenu.title">
					<li
						:class="activeSubMenu?.subTitle === subMenu.subTitle ? 'active' : ''"
						@click="handleSubMenuChange(subMenu)"
					>
						{{ subMenu.subTitle }}
					</li>
				</template>
			</ul>
		</div>
		<div class="actions"></div>
	</header>
</template>

<script setup lang="ts">
import { menuItem, subMenuItem } from "@/components/navMenu";

import router from "@/router";

import appStore from "@/store";
import { storeToRefs } from "pinia";
// 路由对象
const navHeaderStore = appStore.navHeaderStore;
const { activeSubMenu } = storeToRefs(navHeaderStore);

defineProps<{
	activeMenu: menuItem;
}>();

/**
 * @desc 切换激活的二级菜单
 * @param activeSubMenu 激活的二级菜单
 */
const handleSubMenuChange = (activeSubMenu: subMenuItem) => {
	navHeaderStore.changeActiveSubMenu(activeSubMenu);
	router.push(activeSubMenu.path);
};
</script>

<style lang="scss" scoped>
.navHeader {
	padding: 0 30px;
	.pageTitle {
		@include flexCenter(row);
		.title {
			@include fontSW(18px, 700);
		}
		.tabs {
			@include flexCenter(row);

			margin-left: 30px;
			li {
				@include fontSW(12px, 500);

				height: 24px;
				line-height: 24px;

				padding: 0 8px;

				color: $deActiveColor;

				border-radius: 5px;

				transition: all 0.2s linear;

				cursor: pointer;

				&:nth-child(n + 2) {
					margin-left: 8px;
				}

				&:hover {
					background-color: $hoverBgColor;
				}
			}
		}
	}
}
.active {
	color: $activeColor !important;
	background-color: $activeBgColor;
}
</style>
