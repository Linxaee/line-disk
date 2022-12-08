<template>
	<div class="main">
		<el-container class="mainContent">
			<el-aside>
				<nav-menu :collapse="isCollapse" />
			</el-aside>
			<el-container class="page">
				<el-header class="pageHeader">
					<nav-header @foldChange="handleFoldChange" />
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

const isCollapse = ref(false);
const handleFoldChange = (isFold: boolean) => {
	isCollapse.value = isFold;
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
	height: 48px !important;
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
}
</style>
