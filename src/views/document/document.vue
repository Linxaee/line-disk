<template>
	<div class="document">
		<LinTable
			:tableData="tableData"
			:columnList="columnItems"
			:tableConfig="tableConfig"
			@selectionChange="handleSelectionChange"
		>
			<!-- createTime插槽添加v-format-time指令 -->
			<template #createTime="scope">
				<span class="name" v-format-time="'YYYY-MM-DD HH:MM'">{{ scope.row.createTime }}</span>
			</template>
		</LinTable>
	</div>
</template>

<script setup lang="ts">
import LinTable from "@/components/linForm";

import { columnItems } from "./config/columnItems.config";
import { tableConfig } from "./config/tableConfig.config";

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
</style>
