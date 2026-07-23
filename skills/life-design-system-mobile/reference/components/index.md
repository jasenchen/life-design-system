# 移动端组件

`@life-ds/components-mobile` 当前已发布 `Button`。其余组件尚未发布；在组件文档落地前，不得假定存在任何包导出或属性。

## 当前实现原则

1. 先检查业务项目中是否已有同一套移动端封装。
2. 已发布组件必须优先使用 `@life-ds/components-mobile` 的 React API。
3. 没有等效组件时，只实现当前页面需要的最小结构，并避免扩展为没有文档约束的通用组件库。

## 组件沉淀顺序

建议优先建立以下移动端基础组件及其文档：

- 页面容器与顶部导航
- 底部导航与固定底部操作区
- [Button](button.md)
- Cell、List、Card、Tag
- Input、Textarea、Selector、Switch、Checkbox、Radio
- Dialog、Sheet、Toast、Popover
- Form、Empty、Loading、Result

图标与 Token 规范仍使用共享文档，不在移动端组件目录中复制或改写：

- [Token](../../../_shared/reference/foundations/tokens.md)
- [颜色](../../../_shared/reference/foundations/colors.md)
- [图标](../../../_shared/reference/components/icon.md)
