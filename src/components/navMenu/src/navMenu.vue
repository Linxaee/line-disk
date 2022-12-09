<template>
	<div class="navMenu">
		<div class="sideTop">
			<!-- 顶部logo -->
			<div class="topWrapper">
				<span class="logo">
					<img src="@/assets/img/guaLogo.png" alt="" />
					<span class="title">瓜瓜云盘</span>
				</span>
			</div>
			<!-- 顶部菜单 -->
			<ul class="topMenu">
				<template v-for="item in menuItems" :key="item.id">
					<li
						class="menuItem"
						:class="activeMenu.id === item.id ? 'activeItem' : ''"
						@click="handleMenuChange(item)"
					>
						<span class="iconContainer">
							<el-icon class="icon"> <component :is="item.icon"></component></el-icon>
						</span>
						<span class="title">{{ item.title }}</span>
					</li>
				</template>
			</ul>
		</div>
		<!-- 信息部分 -->
		<div class="sideBottom"></div>
		<!-- 折叠按钮 -->
		<div class="collapseBtn"></div>
	</div>
</template>

<script setup lang="ts">
import { menuConfig } from "./config/menuConfig";
import { menuItem } from "./types";
import { useWatchRoute } from "./hooks/useWatchRoute";

const menuItems = menuConfig.menuItems;

/**
 * @emits menuChange: 激活菜单改变
 */
const emit = defineEmits<{
	(event: "menuChange", item: menuItem): void;
}>();

const { activeMenu, handleMenuChange } = useWatchRoute(menuItems, emit);
</script>

<style lang="scss" scoped>
.navMenu {
	width: 240px;
	// 顶部logo
	.topWrapper {
		@include flexCenter(row);
		.logo {
			@include flexCenter(row);
			width: 100%;

			margin-left: -25px;
			padding: 0 10px;
			img {
				@include square(100px);
			}
			.title {
				@include fontSW(26px, 600);

				margin-left: -15px;
			}
		}
	}
	// 顶部菜单
	.topMenu {
		@include flexCenter(column);
		.menuItem {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			position: relative;

			width: 216px;

			padding: 12px 30px;

			border-radius: 10px;

			transition: all 0.2s linear;
			.icon {
				font-size: 26px;

				margin-right: 16px;
				margin-top: 2px;
			}
			.title {
				font-size: 110%;

				margin-bottom: 2px;
			}
			&:hover {
				background-color: $hoverBgColor;
			}
		}
	}
}
.activeItem {
	background-color: $activeBgColor;
}
</style>
