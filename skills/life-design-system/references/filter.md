# 筛选器 (Filter)

在用户需要缩小数据范围、查找特定内容或根据特定条件控制列表/表格显示结果时使用筛选器。

## 默认选择：筛选器组

在绝大多数场景中，优先使用 `@life-ds/components-web` 的 `FilterGroup` 作为默认筛选容器，用于承载多个 `Filter` 组件，并实现统一的对齐、间距与响应式布局（grid）。

## 何时需要“查询 / 重置”

- 当筛选项数量 **小于等于 3 个** 时：一般 **不配置** “查询 / 重置”按钮，通常在筛选项变更后立即触发刷新（或由页面自行决定触发时机）。
- 当筛选项数量 **较多**（需要多条件组合）时：才配置“查询 / 重置”，以避免频繁请求并提升可控性。

## 如何识别筛选器

可能的筛选器通常表现为：

- 带有下拉箭头、漏斗图标或搜索图标的按钮或输入框。
- 位于表格顶部、列表上方或页面侧边栏中的条件选择区域。
- 带有明确属性标签（如“状态”、“日期”、“类型”）的下拉菜单、级联选择器或单选/多选框组。
- 选中后显示在列表顶部的过滤标签（Tag/Chip），通常带有“清除”或“x”图标以方便快速取消。

## 最佳实践

- **优先使用 @life-ds/components-web 提供的 React** **`Filter`** **组件渲染“筛选-元件”。**
- **大多数情况下优先使用** **`FilterGroup`** **承载多个** **`Filter`，不要手写 grid/间距。**
- 默认展示最常用的核心筛选条件，将次要条件收纳在“展开/高级筛选”中。
- 清晰展示当前已生效的筛选条件（特别是当筛选面板收起时），并提供一键“清空”或“重置”操作。
- 对于简单的单项筛选，建议选中后立即触发列表刷新（实时查询）；如果条件复杂或查询成本高，应提供明确的“查询”按钮。
- 保持筛选条件在页面刷新、返回列表或在详情页间切换时的状态记忆。
- 选项列表如果过长，应在筛选器内部提供搜索功能。

## 常见布局

- **基础过滤栏**：位于列表/表格顶部，通常包含 1-3 个高频下拉筛选和一个主操作（如新建）或搜索框，水平排列。
- **高级筛选面板**：在基础过滤栏下方展开，或以抽屉（Drawer）/弹窗（Modal）形式呈现，包含多个复杂的网格化表单项。
- **侧边栏筛选**：位于页面左侧或右侧的垂直区域，适用于电商、复杂数据大盘等需要频繁多维度组合筛选的场景。
- **表头内嵌筛选**：直接在表格列标题上提供漏斗图标，点击弹出该列专属的筛选弹窗。

## React 示例（推荐）

```tsx
import React from 'react';
import { FilterGroup, Filter } from '@life-ds/components-web';

export function FilterGroupDemo() {
  return (
    <FilterGroup>
      <Filter
        type="select"
        label="状态"
        placeholder="请选择"
        onClick={() => {}}
      />
      <Filter
        type="input"
        label="关键词"
        placeholder="请输入"
        value=""
        onChange={() => {}}
      />
      <Filter
        type="date"
        label="日期"
        placeholder="请选择"
        onClick={() => {}}
      />
    </FilterGroup>
  );
}
```

## React 示例（筛选项较多，带“查询 / 重置”）

```tsx
import React from 'react';
import { FilterGroup, Filter } from '@life-ds/components-web';

export function FilterGroupWithActionsDemo() {
  return (
    <FilterGroup
      onQuery={() => {}}
      onReset={() => {}}
    >
      <Filter type="input" label="关键词" placeholder="请输入" value="" onChange={() => {}} />
      <Filter type="select" label="状态" placeholder="请选择" onClick={() => {}} />
      <Filter type="select" label="类型" placeholder="请选择" onClick={() => {}} />
      <Filter type="date" label="日期" placeholder="请选择" onClick={() => {}} />
      <Filter type="time" label="时间" placeholder="请选择" onClick={() => {}} />
    </FilterGroup>
  );
}
```

## 注意事项

- 默认用 `FilterGroup` 做容器：不要自己写 `display: grid` / `grid-template-columns` 去拼筛选区。
- `Filter` 是基础单元：不要手工拼装 `.lds-filter` DOM 结构和 class。
- “查询 / 重置”仅在筛选项较多时启用；小于等于 3 个筛选项时一般不需要操作按钮。

**禁止示例**：

```html
<!-- ❌ 禁止：React 项目不要手工拼装 .lds-filter DOM / 类名 -->
<div class="lds-filter">...</div>
```

## 实现要点

在实现筛选器时，请确保代码涵盖以下状态：

- 默认/未选择 (Default/Unselected)
- 悬停 (Hover)
- 聚焦/展开 (Focus/Expanded)
- 已选择/激活 (Selected/Active - 筛选器按钮应有视觉反馈表明当前有条件生效)
- 禁用 (Disabled)
- 选项加载中 (Loading - 异步拉取下拉选项数据时)
- 无匹配结果 (Empty State - 当筛选条件过于严苛导致无数据时的空状态提示)

如果无法直接使用标准筛选组合，请使用仓库中现有的最接近的表单组件组合，并保持层级、对齐方式、间距和状态行为的一致性。

## 兜底策略

如果模式不明确：

- 选择最基础的标准下拉选择器（Select）或搜索输入框作为兜底筛选方案。
- 保留原始界面的筛选维度意图。
- 除非业务逻辑极其特殊，否则避免发明自定义的复杂筛选交互弹窗或面板。

