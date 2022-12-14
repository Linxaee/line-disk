## line-disk

---

一个兴趣使然的网盘项目

预期技术栈：

-   Vue3 & TypeScript
-   pinia
-   scss
-   element-plus
-   pnpm

TODO:

1. [ ] 相册功能实现
2. [x] ~~回收站（文件）功能实现~~ `已实现彻底删除文件、恢复文件`
3. [ ] 回收站（相册）功能实现
4. [ ] 下载、分享、收藏、收入回收站功能实现`已实现收入回收站`
5. [ ] 文件夹功能实现`已实现新建文件夹、文件夹内文件上传、文件夹嵌套、文件夹递归删除、文件夹整体上传`
6. [ ] 收藏功能实现
7. [ ] 文件、文件夹查重实现
8. [ ] 传输暂停、继续、取消实现
9. [ ] 更友好的界面提示
10. [ ] 添加文件十天到期自动删除功能

FIX:

1. [ ] 未加载数据时，空数据界面先出现，加载后移出导致页面闪烁。
2. [ ] 解析文件 HASH 时间过长，目前采用的 spark-md5 直接解析，300MB 需 3s 左右导致页面卡顿
3. [ ] 文件 HASH 相同文件名不同时未报错，会有一个直接无法上传
4. [x] ~~切换组件 toolBar 不折叠收回~~`beforeUnmount中重置一下已选数组`
5. [ ] 上传时进度条卡顿
6. [ ] table 默认排序设置无效
7. [ ] table 插槽添加 v-formatTime 指令导致该列排序失效
8. [x] ~~文件夹内刷新面包屑失效~~`store持久化`

MAYBE:

1. [ ] 切换列表和网格视图
2. [ ] 文件在线预览（图片，视频，文档）
3. [ ] 代码结构优化
