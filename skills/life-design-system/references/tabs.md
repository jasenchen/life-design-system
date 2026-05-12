# 选项卡 (Tabs)

在用户需要在同一上下文或层级下的多个不同视图、数据集或功能模块之间进行平级切换时使用选项卡。

## 如何识别选项卡

可能的选项卡通常表现为：

- 位于页面顶部或容器顶部的一排水平排列的文本标签。
- 当前选中的标签通常有明显的视觉高亮（如底部有一条主色下划线，或文字加粗/变色）。
- 未选中的标签表现为较低强调度的文本。
- 点击不同标签时，下方的区域会切换显示不同的内容，但页面整体结构不发生大幅度跳跃。

## 最佳实践

- **优先使用 life-ds 组件库中的选项卡（Tabs）组件。**
- 选项卡应用于**平级内容**的切换，不应代表步骤（如向导）或层级关系（如面包屑）。
- 标签文本应简短且具有概括性，通常为 2-6 个字的名词，避免使用长句。
- 选项卡数量通常建议在 2 到 6 个之间。如果超过 6 个，应考虑在末尾使用“更多”下拉菜单，或者支持横向滚动。
- 确保切换选项卡时，仅更新对应的内容区域，而不刷新整个页面。
- 如果选项卡包含未读信息，可在标签文本旁边附加一个小型的徽标（Badge）或红点。

## 常见布局与层级样式

根据设计规范，选项卡在视觉和使用场景上分为三个核心层级（样式）：

1. **Primary (主导航/下划线样式)**
   - **视觉特征**：选中状态带有明显的底部下划线（Underlined），文字通常加粗。
   - **适用场景**：用于页面级别的主要导航（Main navigation），控制整个页面的核心视图切换。

2. **Capsule (胶囊/分段控件样式)**
   - **视觉特征**：整体被一个浅色圆角背景包裹，选中的标签像一个白色的滑块（Segmented control style）。
   - **适用场景**：用于卡片内部、弹窗内或局部区域的次级视图切换，视觉权重低于 Primary。

3. **Filter (过滤/标签样式)**
   - **视觉特征**：表现为一组独立的圆角矩形标签（Tag-like tabs），选中时整个标签背景色加深或改变。
   - **适用场景**：用于列表或数据表顶部的快速过滤（Quick filtering），通常作为第三层级的视图控制。

## 选项卡尺寸规范

在使用组件库选项卡时，根据不同的层级样式（Theme），需要选择合适的尺寸变体以保证视觉规范：

### 1. Primary 样式尺寸
通常用于页面级导航，高度较为宽裕。
| 尺寸名称 | 适用场景 |
| :--- | :--- |
| **Default (默认)** | 页面级别的核心视图切换，占据较大空间，视觉权重最高 |
| **Small (小号)** | 空间相对受限区块内的主导航切换 |

### 2. Capsule 样式尺寸
通常用于容器或卡片内部的次级导航。
| 尺寸名称 | 适用场景 |
| :--- | :--- |
| **Default (默认)** | 宽阔的卡片、独立模块或表单区块内部的核心次级切换 |
| **Small (小号)** | 弹窗内部、侧边栏或空间受限模块内的紧凑切换 |

### 3. Filter 样式尺寸
通常用于数据列表或表格顶部的快速过滤。
| 尺寸名称 | 适用场景 |
| :--- | :--- |
| **Default (默认)** | 独立的大型筛选/聚合页顶部，或常规数据列表的标准过滤项 |
| **Small (小号)** | 紧凑型表格、下拉面板内嵌的微型过滤标签 |

> **注意**：实际开发中，请严格按照 `life-ds` 组件库的 React API 使用 `Tabs` / `Tab` 组件。当前正确属性为 `variant="primary|capsule|filter"` 与 `size="large|small"`，不要再手写 HTML class 结构。

**示例代码**：

```tsx
import React from 'react';
import { Tabs, Tab } from '@life-ds/components-web';

export default function Demo() {
  return (
    <>
      {/* 1) Primary：一级导航 */}
      <Tabs variant="primary" size="large" defaultValue="pending">
        <Tab value="pending">未处理</Tab>
        <Tab value="processing">进行中</Tab>
        <Tab value="done">已完成</Tab>
      </Tabs>

      {/* 2) Capsule：胶囊切换 */}
      <Tabs variant="capsule" size="small" defaultValue="all">
        <Tab value="all">全部</Tab>
        <Tab value="online">线上</Tab>
        <Tab value="offline">线下</Tab>
      </Tabs>

      {/* 3) Filter：快筛标签 */}
      <Tabs variant="filter" size="small" defaultValue="all">
        <Tab value="all">全部商品</Tab>
        <Tab value="sale">促销中</Tab>
        <Tab value="disabled" disabled>
          已禁用
        </Tab>
      </Tabs>
    </>
  );
}
```

```tsx
// ❌ 禁止：手写 className / DOM 结构模拟 Tabs
<div className="lds-tabs lds-tabs--primary lds-tabs--default-size">...</div>
```

## 实现要点

在实现选项卡时，请确保代码涵盖以下状态：

- 默认 (Default) - 未选中的状态
- 悬停 (Hover) - 鼠标移入未选中标签时的反馈
- 激活/选中 (Active/Selected) - 当前选中的标签，通常伴随指示条或背景色变化
- 禁用 (Disabled) - 不可点击的标签，通常文字和指示器置灰
- 聚焦 (Focus) - 键盘导航时的聚焦状态（无障碍访问支持）

如果无法直接使用标准选项卡，请使用仓库中现有的最接近的选项卡组件，并保持排版、间距、指示器动画和状态行为的一致性。

## 兜底策略

如果模式不明确：

- 选择最基础的标准水平选项卡变体：**Primary 样式的 Default 尺寸**（带有底部高亮指示条）。
- 保持标签文本在一行内显示，不要换行。
- 除非有特殊的复杂交互需求，否则严格遵循上述三种样式的划分，避免发明混合样式。
