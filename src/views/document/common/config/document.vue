<template>
	<div class="document">
		<LinTable
			ref="linTableRef"
			:tableData="documentStore.displayedFileList"
			:columnConfig="columnConfig"
			:tableConfig="tableConfig"
			@selectionChange="handleSelectionChange"
			@rowDbClick="handleRowDbClick"
		>
			<!-- createTime插槽添加v-format-time指令 -->
			<template #createTime="scope">
				<span>{{ scope.row.createTime }}</span>
			</template>
			<template #fileSize="scope">
				<span class="size">{{
					scope.row.fileType === 2 ? fileSizeTransfer(scope.row.fileSize) : ""
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
import { useRowClick } from "./hooks/useRowClick";

const { documentStore, linTableRef, handleSelectionChange } = useTableData();
const { handleRowDbClick } = useRowClick();
</script>

<style lang="scss" scoped>
.document {
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
