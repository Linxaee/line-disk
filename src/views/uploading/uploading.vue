<template>
	<div class="uploading">
		<LinTable :tableData="tableData" :columnConfig="columnConfig" :showSelection="false">
			<template #fileName="scope">
				<div class="nameContainer">
					<span class="icon">
						<img :src="fileNameToIconUrl(scope.row.name)" alt="" />
					</span>
					<span class="name">{{ scope.row.name }}</span>
				</div>
			</template>
		</LinTable>
	</div>
</template>

<script setup lang="ts">
import LinTable from "@/components/linTable";

import { computed, watch } from "vue";

import { columnConfig } from "./config/columnItems.config";

import appStore from "@/store";

import { fileNameToIconUrl } from "@/utils";

// 取出uploadStore
const uploadStore = appStore.uploadStore;
// 表格数据来源
const tableData = computed(() => {
	return uploadStore.arrFileList;
});

const data = [];
</script>

<style lang="scss" scoped>
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
</style>
