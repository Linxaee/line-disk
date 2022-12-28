## line-disk

---

一个兴趣使然的网盘项目

预期技术栈：

-   vue3
-   typescript
-   pinia
-   scss
-   element-plus
-   pnpm

TODO:

1. [ ] 回收站（文件）功能实现
2. [ ] 传输暂停、继续、取消实现

FIX:

1. [ ] 未加载数据时，空数据界面先出现，加载后移出导致页面闪烁。
2. [ ] 解析文件 HASH 时间过长，目前采用的 spark-md5 直接解析，300MB 需 3s 左右导致页面卡顿
3. [ ] 上传时进度条卡顿
