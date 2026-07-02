# 标签 (Tag)

在用户需要对内容进行分类、标记属性、展示当前状态或将选中的属性作为过滤条件展示时使用标签。

## 如何识别标签

可能的标签通常表现为：

- 带有背景色或轻量边框的紧凑型圆角矩形或胶囊形状。
- 包含极简短的文本（通常是名词、属性或状态词）。
- 有时带有前缀图标（如状态圆点）或后缀图标（如用于移除的“x”图标）。
- 通常成组出现，排列在卡片、标题旁、表格的单元格内或搜索栏下方。

## 最佳实践

- **优先使用 life-ds 组件库中的标签（Tag）组件。**
- 标签文本应极其简短，通常建议为 1-3 个词或几个汉字。
- 善用颜色传达语义状态（如红色代表错误/拒绝/高危，绿色代表成功/完成，蓝色代表进行中/提示，橘色代表警告，灰色代表默认/中性分类）。
- 明确区分**只读标签**（仅用于展示状态或分类）和**可交互标签**（可点击筛选、可关闭）。
- 避免在同一个视图中滥用过多鲜艳颜色的标签（“彩虹病”），以免造成视觉焦点混乱；大多数普通分类优先使用默认的灰色或低饱和度标签（如 `outline-gray `或 `light-xx `样式）。
- 对于需要被移除的标签（如已选过滤条件），必须提供清晰的“关闭（Close）”图标及对应交互。

## 常见布局

- **状态指示**：位于表格的“状态”列，或详情页大标题的右侧/下方，直观展示当前单据状态。
- **内容分类**：在文章、卡片、商品或列表项的内部，成组水平排列，展示其所属的多个类目。
- **筛选条件展示（Filter Tags）**：在搜索栏或表格顶部，展示用户当前已选的过滤条件，通常带有可关闭的“x”图标，并可能伴随一个“清空”按钮。
- **数量/更新标记**：附着在侧边栏导航或选项卡旁，用于展示未读消息数或新增项（有时也被称为 Badge）。

## 标签样式变体 (Theme)

根据设计规范，标签提供了三种核心的视觉样式变体，请根据页面的视觉焦点需求进行选择：

1. **实色填充 (Fill)**：高对比度的实色背景，文本和图标为纯白色。**仅用于需要强烈视觉强调的核心状态或重要警示。**
2. **浅色填充 (Light)**：低饱和度的浅色背景，搭配同色系的深色文本和图标。**最常用的默认样式，适用于绝大部分分类和状态展示。**
3. **描边/浅色描边 (Outline)**：极浅色背景，带有彩色描边线和同色系文本。**适用于界面背景较复杂或需要进一步降低视觉权重的场景。**

每种样式均支持 5 种语义色：**蓝色（默认/进行中）、绿色（成功）、橘色（警告）、红色（错误/拒绝）、灰色（中性/失效）**。

## 标签尺寸规范 (Size)

在使用组件库标签时，**必须**组合对应的尺寸类名，以确保文本排版和高度符合设计规范。标签提供三种型号：

| 尺寸名称            | 目标高度 | 适用场景                          |
| :-------------- | :--- | :---------------------------- |
| **大号 (Large)**  | 36px | 页面级的核心状态展示、大面积的已选筛选条件区        |
| **中号 (Medium)** | 28px | 绝大部分常规列表/表格内的状态展示、卡片分类（默认选项）  |
| **小号 (Small)**  | 20px | 空间受限的列表、紧凑的标题旁辅助说明、极小空间内的徽标场景 |

**示例代码（React 组件，给 AI 生成代码用）**：

```tsx
import React from 'react';
import { Tag, Icon } from '@life-ds/components-web';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {/* 1) 最常用：淡色标签（Light） */}
      <Tag size="default-size" variant="light" color="blue">
        进行中
      </Tag>

      {/* 2) 强强调：填色标签（Fill），常用于关键状态 */}
      <Tag size="large" variant="fill" color="red">
        高风险
      </Tag>

      {/* 3) 低强调：描边标签（Outline） */}
      <Tag size="small" variant="outline" color="gray">
        默认
      </Tag>

      {/* 4) 左右图标可配置：leftIcon / rightIcon */}
      <Tag
        size="default-size"
        variant="light"
        color="orange"
        leftIcon={<Icon name="ic-sell-line" />}
        rightIcon={<Icon name="ic-error-line" />}
      >
        可配置图标
      </Tag>

      {/* 5) “关闭/删除”场景：仅展示右侧图标（通过 rightIcon 实现） */}
      <Tag size="default-size" variant="light" color="blue" rightIcon={<Icon name="ic-error-line" />}>
        筛选条件
      </Tag>

      {/* 6) 可交互标签：需要 onClick 才会呈现可交互样式 */}
      <Tag size="default-size" variant="light" color="green" onClick={() => console.log('clicked')}>
        可点击
      </Tag>
    </div>
  );
}
```

**API 速记（必须用组件，不要拼 className）**：

```ts
type TagProps = {
  size?: 'large' | 'default-size' | 'small';     // 大号/默认/小号
  variant?: 'fill' | 'light' | 'outline';        // 填色/淡色/描边
  color?: 'blue' | 'green' | 'orange' | 'red' | 'gray';
  leftIcon?: React.ReactNode;                    // 左侧图标（可选）
  rightIcon?: React.ReactNode;                   // 右侧图标（可选）
} & React.HTMLAttributes<HTMLSpanElement>;
```

```tsx
// ❌ 禁止：手写 className 组合（容易偏离 token/规范）
<span className="lds-tag lds-tag--red lds-tag--plain lds-tag--medium">已完成</span>
```

## 实现要点

在实现标签时，请确保代码涵盖以下状态（特别是可交互标签）：

- 默认 (Default)
- 悬停 (Hover) - 仅限可交互/可关闭标签
- 激活/选中 (Active/Selected) - 用于作为单选/多选控件使用的标签
- 可关闭 (Closable) - 包含关闭图标及正确的移除事件处理
- 禁用 (Disabled) - 仅限可交互标签
- 文本截断 (Truncation) - 确保当标签内容过长且空间受限时，正确使用省略号（`...`）截断并可能提供 Tooltip 提示。

如果无法直接使用标准标签，请使用仓库中现有的最接近的标签组件，并保持层级、圆角、间距和状态行为的一致性。

## 兜底策略

如果模式不明确：

- 选择最基础的标准标签变体：**浅色填充 (color-plain) 的灰色样式**。
- 保留原始界面的分类或状态表达意图。
- 除非流程明确要求，否则不要给纯用于展示的标签添加悬停或点击的交互行为。
