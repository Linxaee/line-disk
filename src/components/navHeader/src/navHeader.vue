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
		<ul class="actions">
			<li class="search">
				<span class="icon">
					<el-icon :size="24">
						<Search />
					</el-icon>
				</span>
			</li>
			<li class="uploadNew">
				<LinDropDown :dropDownConfig="dropDownConfig"
					><span class="icon">
						<el-icon :size="20" color="white">
							<Upload />
						</el-icon> </span
				></LinDropDown>
			</li>
			<!-- <li class="clear"></li> -->
		</ul>
	</header>
</template>

<script setup lang="ts">
import LinDropDown from "@/components/linDropDown";

import { menuItem, subMenuItem } from "@/components/navMenu";

import { dropDownConfig } from "./config/dropDowm.config";

import router from "@/router";
import appStore from "@/store";
import { Search, Upload } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";

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
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 20px;
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
	.actions {
		@include flexCenter(row);
		li {
			min-width: 32px;
			margin: 5px;
			transition: 0.2s all linear;
			&:nth-child(1),
			&:nth-child(2) {
				@include circle(32px);
				.icon {
					@include flexCenter(row);
					height: 32px;
					cursor: pointer;
				}
			}
			&:nth-child(1) {
				background-color: transparent;
				&:hover {
					background: $hoverBgColor;
				}
			}
			&:nth-child(2) {
				background: linear-gradient(129.12deg, #446dff 0%, rgba(99, 125, 255, 0.75) 100%);
				&:hover {
					background: linear-gradient(129.12deg, #365bde 0%, #526efa 100%);
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
