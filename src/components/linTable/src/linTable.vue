<template>
	<div class="linTable">
		<el-table
			ref="multipleTableRef"
			v-bind="tableConfig"
			:data="tableData"
			style="width: 100%; height: inherit"
			@selection-change="handleSelectionChange"
			@row-dblclick="handleRowDbClick"
		>
			<el-table-column type="selection" width="30" v-if="showSelection" />
			<!-- 遍历传入的列配置 -->
			<template v-for="item in columnConfig" :key="item.prop">
				<el-table-column v-bind="item" show-overflow-tooltip>
					<!-- 为各列预留插槽 -->
					<template #default="scope">
						<slot :name="item.slotName ?? item.prop" :row="scope.row">
							<!-- fileName插槽设置默认样式 -->
							<template v-if="item.prop == 'fileName'">
								<div class="nameContainer">
									<span class="icon">
										<img
											:src="
												fileNameToIconUrl(
													scope.row.fileName,
													scope.row.fileType
												)
											"
											alt=""
										/>
									</span>
									<span class="name">{{ scope.row[item.prop] }}</span>
								</div>
							</template>
							<span v-else>{{ scope.row[item.prop] ?? "" }}</span>
						</slot>
					</template>
				</el-table-column>
			</template>
			<template #empty>
				<slot name="empty"></slot>
			</template>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { ColumnItem } from "../types";
import { fileNameToIconUrl } from "@/utils";
import { LinFileItem } from "@/api/requests/types";

const multipleTableRef = ref();

withDefaults(
	defineProps<{
		tableData: any[];
		// 表格有关配置
		tableConfig?: any;
		// 是否展示选择
		showSelection?: boolean;
		// 列配置项
		columnConfig: ColumnItem[];
	}>(),
	{
		showSelection: true,
	}
);

const emit = defineEmits<{
	(e: "selectionChange", files: LinFileItem[]): void;
	(e: "rowDbClick", row: any, column: any, event: any): void;
}>();

/**
 * @description 发送被选择数组改变事件
 */
const handleSelectionChange = (files: LinFileItem[]) => {
	emit(
		"selectionChange",
		files.map((file) => toRaw(file))
	);
};
/**
 * @description 发送某行双击事件
 */
const handleRowDbClick = (row: any, column: any, event: any) => {
	emit("rowDbClick", row, column, event);
};
/**
 * @description 清除所有选项的函数
 */
const clearSelection = () => {
	multipleTableRef.value!.clearSelection();
};

/**
 * @description 对外暴露ElTable上的实例方法
 */
defineExpose({ clearSelection });
</script>

<style lang="scss" scoped>
.linTable {
	height: inherit;
}
.nameContainer {
	@include flexCenter(row);
	justify-content: flex-start;
	.icon {
		img {
			@include square($listImgSize);
		}
	}
	.name {
		height: 35px;
		line-height: 35px;
		margin-left: 20px;
	}
}
.el-table {
	padding: 0 30px;
}

:deep(.el-scrollbar__bar.is-horizontal) {
	height: 0 !important;
}
</style>
