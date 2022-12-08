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
						:class="activeIndex === item.id ? 'activeItem' : ''"
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
import { useListItems } from "./hooks/useListItems";

const menuItems = menuConfig.menuItems;

const emit = defineEmits<{
	(event: "menuChange", item: menuItem): void;
}>();

const { activeIndex, handleMenuChange, initMenu } = useListItems(emit, menuItems);

// 初始化菜单
initMenu();
</script>

<style lang="scss" scoped>
$activeColor: rgb(227, 227, 230);
$hoverColor: rgb(236, 236, 238);
.navMenu {
	width: 240px;
	// 顶部logo
	.topWrapper {
		@include flexCenter(row);
		.logo {
			@include flexCenter(row);
			width: 100%;
			margin-left: -25px;
			padding: 10px;
			img {
				@include square(100px);
			}
			.title {
				font: {
					size: 26px;
					weight: 600;
				}
				margin-left: -15px;
			}
		}
	}
	// 顶部菜单
	.topMenu {
		@include flexCenter(column);
		.menuItem {
			position: relative;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 12px 30px;

			width: 216px;
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
				background-color: $hoverColor;
			}
		}
	}
}
.activeItem {
	background-color: $activeColor;
}
</style>
