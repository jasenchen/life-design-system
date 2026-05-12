# 组件 (Components)

在实现 UI 之前，请参考此文件从高保真图像中识别可能的组件，或从文本提示中选择正确的组件模式。

当仓库中已安装并使用了 `@Life-ds/components-web` 时，请识别并使用其中的组件。

此文件的核心在于组件识别和实现决策。优先选择少量的标准模式，而不是发明自定义 UI。请参考链接的组件参考文档以获取特定模式的指引。

## 操作指南

在观察图像或提示词时：

1. 将 UI 拆分为清晰的区域。
2. 识别每个区域中可能的组件。
3. 推断哪些部分是可复用的基础组件（Primitives），哪些部分是组合组件（Composition）。
4. 使用仓库现有的模式或 life-ds 等效组件进行实现。
5. 保持层级结构、间距节奏和状态行为。

## 如何识别图像中的组件

利用这些视觉线索来识别组件：

- 重复的行结构通常意味着列表容器（List Container），包含列表单元格（List Cells）或设置行（Settings Rows）。
- 一个占据主导地位的实心操作通常意味着主按钮（Primary Button）。
- 主操作附近的辅助性小操作通常意味着普通按钮（**Default** Button）或文本按钮（text Button）。
- 水平分段的同级选项通常意味着标签页（Tabs）。
- 悬浮或浮起的面板通常意味着底页（Sheets）、抽屉（Drawers）或模态框（Modals）。
- 重复的药丸形状通常指示标签（Chips）、药丸标签（Pills）或胶囊选项（Capsule ）。

如果一个界面实际上是由更简单的部分组合而成的，请不要将其整体视为一个自定义组件。

## 核心组件模式

首先关注这些模式，因为它们涵盖了大部分 TikTok 风格 UI 的实现工作：

- 按钮 (Button)
- 图标 (Icon)
- 顶部导航栏 (Navbar)
- 左侧菜单 (Menu)
- 标签页 (Tabs)
- 输入框 (Input)
- 筛选器 (Filter)
- 筛选器组 (FilterGroup)
- 页面标题区 (PageHeader)
- 表格 (Table)
- 分页器 (Pagination)
- 标签 (Tag)
- 多选框 (Checkbox)
- 选项 (Capsule)

如果 UI 可以用这些模式表示，请在引入自定义结构之前优先使用它们。

## 选择原则

- 优先选择现有模式，而非标新立异。
- 保持内容为主，UI 框架（Chrome）为辅。
- 让主要的行动点（CTA）清晰可见。
- 保持操作位置的稳定性。
- 在重复结构中保持一致的组件层级。
- 即使图像只显示了静态，也要推断生产代码所需的各种缺失状态。

## 模式参考 (Pattern References)

当 UI 明显匹配以下模式时，请必须阅读对应的文件：

- UI中需要按钮时：[button.md](button.md)；
- UI中需要图标时：[icon.md](icon.md)；
- UI中需要标签页时：[tabs.md](tabs.md)；
- UI中需要筛选器或筛选器组时：[filter.md](filter.md)；
- UI中需要表格时：[table.md](table.md)；
- UI中需要分页器时：[pagination.md](pagination.md)；
- UI中需要标签时：[tag.md](tag.md)；
- UI中需要多选框时：[checkbox.md](checkbox.md)；

## 兜底策略

如果组件定义模糊：

- 选择符合层级结构的最简单的标准模式。
- 保留原始界面的意图。
- 除非 UI 明确要求，否则避免发明自定义组件。
