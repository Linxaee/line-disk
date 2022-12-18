<template>
	<div class="main">
		<el-container class="mainContent">
			<el-aside>
				<NavMenu :collapse="isCollapse" @menuChange="handleMenuChange" />
			</el-aside>
			<el-container class="page">
				<el-header class="pageHeader">
					<NavHeader :activeMenu="activeMenu" />
				</el-header>
				<el-main class="pageContent">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NavMenu from "@/components/navMenu";
import NavHeader from "@/components/navHeader";

import { menuItem } from "@/components/navMenu/src/types/index";

import appStore from "@/store";
import { storeToRefs } from "pinia";

// 当前激活的菜单
const navMenuStore = appStore.navMenuStore;
const { activeMenu } = storeToRefs(navMenuStore);
// navMenu是否折叠
const isCollapse = ref(false);

// const handleFoldChange = (isFold: boolean) => {
// 	isCollapse.value = isFold;
// };

/**
 *  @desc 接受到menuChange事件后的回调函数
 *  @param item 现激活的菜单对象
 */
const handleMenuChange = (item: menuItem) => {
	//修改navHeader
	activeMenu.value = item;
};
</script>

<style lang="scss" scoped>
.main {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.mainContent,
.page {
	height: 100%;
}

.pageContent {
	height: calc(100% - 48px);
}
.page-info {
	background-color: #fff;
}
.el-header,
.el-footer {
	display: flex;
	color: #333;
	text-align: center;
	align-items: center;
}

.el-header {
	height: 100px !important;
}

.el-aside {
	overflow-x: hidden;
	overflow-y: auto;
	text-align: left;
	cursor: pointer;
	background-color: rgb(245, 245, 246);
	transition: width 0.3s ease-in;
	scrollbar-width: none; /* firefox */
	-ms-overflow-style: none; /* IE 10+ */
	width: var(--el-aside-width);
	&::-webkit-scrollbar {
		display: none;
	}
}

.el-main {
	color: #333;
	text-align: center;
	background-color: #f0f2f5;
	padding: 0;
}
</style>
