<template>
	<div class="album">
		<el-empty
			description="暂时没有图片哦~"
			image="/src/assets/img/empty/noImg.png"
			class="empty"
		>
		</el-empty>
		<el-table></el-table>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.empty {
	height: 100%;
}
</style>
