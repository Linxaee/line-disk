<template>
	<div class="subAlbum">
		<el-empty description="回收站为空" class="empty">
			<span style="color: rgb(144, 147, 153)">回收站内容保存10天，到期后自动删除</span>
		</el-empty>
		<LinTable
			ref="linTableRef"
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
			<template #fileSize="scope">
				<span class="size">{{ fileSizeTransfer(scope.row.fileSize) }}</span>
			</template>
		</LinTable>
	</div>
</template>

<script setup lang="ts">
import LinTable from "@/components/linTable";
// import ToolBar from "@/components/toolBar";

import { columnConfig } from "./config/columnItems.config";
import { tableConfig } from "./config/table.config";
// import { toolBarConfig } from "./config/toolBar.config";

import { fileSizeTransfer } from "@/utils";

import { useTableData } from "./hooks/useTableData";

const { tableData, documentStore, linTableRef, handleSelectionChange } = useTableData();
</script>

<style lang="scss" scoped>
.subAlbum {
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
