<template>
	<div class="document">
		<LinTable
			:tableData="tableData"
			:columnConfig="columnConfig"
			:tableConfig="tableConfig"
			@selectionChange="handleSelectionChange"
		>
			<!-- createTime插槽添加v-format-time指令 -->
			<template #createTime="scope">
				<span class="name" v-format-time="'YYYY-MM-DD HH:MM'">{{
					scope.row.createTime
				}}</span>
			</template>
		</LinTable>

		<transition
			name="animate__animated animate__bounce animate__delay"
			enter-active-class="animate__fadeInUp"
			leave-active-class="animate__fadeOutDown"
		>
			<!-- 有选中的文件时才显示 -->
			<ToolBar
				:toolBarConfig="toolBarConfig"
				v-show="documentStore.selectedFileList.length"
			></ToolBar>
		</transition>
	</div>
</template>

<script setup lang="ts">
import LinTable from "@/components/linTable";
import ToolBar from "@/components/toolBar";

import { columnConfig } from "./config/columnItems.config";
import { tableConfig } from "./config/table.config";
import { toolBarConfig } from "./config/toolBar.config";

import { LinFileItem } from "@/api/requests/types";

import appStore from "@/store";

const documentStore = appStore.documentStore;
const tableData = documentStore.displayedFileList;

/**
 * @desc 选择数组改变后储存到store中
 */
const handleSelectionChange = (files: LinFileItem[]) => {
	documentStore.selectedFileList = files;
};
</script>

<style lang="scss" scoped>
.document {
	height: 100%;
}
.animate__animated.animate__bounce {
	--animate-duration: 0.3s;
}
</style>
