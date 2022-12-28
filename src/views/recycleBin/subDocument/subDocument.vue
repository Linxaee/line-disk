<template>
	<div class="subDocument">
		<LinTable
			ref="linTableRef"
			:tableData="tableData"
			:columnConfig="columnConfig"
			:tableConfig="tableConfig"
			@selectionChange="handleSelectionChange"
		>
			<!-- createTime插槽添加v-format-time指令 -->
			<template #deleteTime="scope">
				<span class="name" v-format-time="'YYYY-MM-DD HH:MM'">{{
					scope.row.deleteTime
				}}</span>
			</template>
			<template #fileSize="scope">
				<span class="size">{{ fileSizeTransfer(scope.row.fileSize) }}</span>
			</template>
			<template #empty>
				<el-empty description="回收站为空" class="empty">
					<span style="color: rgb(144, 147, 153)"
						>回收站内容保存10天，到期后自动删除</span
					>
				</el-empty>
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
				v-show="subDocumentStore.selectedRecycleList.length"
				class="toolBar"
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

import { fileSizeTransfer } from "@/utils";

import { useTableData } from "./hooks/useTableData";

const { subDocumentStore, tableData, linTableRef, handleSelectionChange } = useTableData();

// console.log(subDocumentStore.selectedRecycleList.length);
</script>

<style lang="scss" scoped>
.subDocument {
	height: 100%;
}
.empty {
	height: 100%;
}
.animate__animated.animate__bounce {
	--animate-duration: 0.3s;
}
.toolBar {
	position: absolute;
	z-index: 9999;
	bottom: 50px;
	left: calc(50% - 110px + 120px);
}
</style>
