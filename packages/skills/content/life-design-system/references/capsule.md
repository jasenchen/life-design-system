# 胶囊 (Capsule)

在用户需要在一组互斥的选项中做出**单项选择**（如筛选条件、视图切换、分类过滤）时使用胶囊。胶囊本质上是单选按钮（radio）的视觉化包装，强调"已选中/未选中"的强对比状态。

## 如何识别胶囊

可能的胶囊通常表现为：

- 圆角矩形（半圆形端部）的小型可点击控件，标签简短。
- 在筛选区、列表顶部、抽屉内部以"组"的形式横向排列。
- 选中态使用 Primary 颜色边框 + 浅色填充，未选中态为透明/弱边框背景。
- 一组中**有且仅有一个**处于选中态。
- 与 Tab 不同：胶囊本身不切换页面级内容区，而是用于筛选当前列表/区块的数据。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的** **`<Capsule>`** **组件（如果是在 React 项目中）。**
- 胶囊用于**互斥的单选**场景；多选场景请使用 Checkbox 或 Tag。
- 同一组胶囊使用相同 `name`，确保单选语义正确。
- 标签应简短、名词或形容词为主（如"全部"、"进行中"、"已完成"），避免使用动词。
- 一组中通常包含一个"全部 / 默认"选项作为初始选中项。
- 一组胶囊数量建议控制在 2-7 个；选项过多时改用 Select 或多级筛选。
- 切换胶囊后应即时反馈对应内容的变化，避免再额外配一个"应用"按钮。

## 常见布局

- **列表筛选区**：列表顶部一行胶囊，用于按状态/分类切换列表数据。
- **抽屉/卡片头部**：与标题同行或紧邻标题下方，提供局部维度切换。
- **图表时间维度**：日 / 周 / 月 / 年 切换。
- **表单分支选择**：在简洁的"选 1 项"问答中替代 RadioGroup，呈现更轻盈。
- 多个胶囊组成胶囊组时，每个胶囊之间的间距为--pacing-3x

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Capsule>` 组件，以避免尺寸和状态类名遗漏问题。

```tsx
import { Capsule } from '@life-ds/components-web';
import { useState } from 'react';

const [value, setValue] = useState('all');

// ✅ 正确：使用 React 组件，name 一致 + 受控 value
<Capsule
  name="status"
  value="all"
  label="全部"
  checked={value === 'all'}
  onChange={() => setValue('all')}
/>
<Capsule
  name="status"
  value="processing"
  label="进行中"
  checked={value === 'processing'}
  onChange={() => setValue('processing')}
/>
<Capsule
  name="status"
  value="done"
  label="已完成"
  checked={value === 'done'}
  onChange={() => setValue('done')}
/>

// ❌ 错误：在 React 中手动拼接类名
<span className="lds-capsule lds-capsule--default-size">全部</span>
```

### Capsule 组件 API

| 属性         | 类型                                     | 默认值              | 说明                         |
| ---------- | -------------------------------------- | ---------------- | -------------------------- |
| `size`     | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 胶囊尺寸                       |
| `label`    | `React.ReactNode`                      | —                | 胶囊文案，必填                    |
| `name`     | `string`                               | —                | 同一组胶囊必须使用相同 `name`，以保证单选语义 |
| `value`    | `string`                               | —                | 当前胶囊代表的值                   |
| `checked`  | `boolean`                              | —                | 是否选中（受控）                   |
| `disabled` | `boolean`                              | `false`          | 是否禁用                       |
| `onChange` | `(e) => void`                          | —                | 选中状态变化回调                   |

> 其余属性继承自原生 `<input type="radio">`。

***

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，使用组件库胶囊时，除了基础的 `.lds-capsule`，**必须**组合对应的尺寸类名，否则会导致高度和内边距缺失！

| 尺寸名称             | 类名组合                                      | 目标高度 | 适用场景              |
| :--------------- | :---------------------------------------- | :--- | :---------------- |
| **Large (大)**    | `.lds-capsule .lds-capsule--large`        | 48px | 突出的筛选场景、营销/活动配置面板 |
| **Default (默认)** | `.lds-capsule .lds-capsule--default-size` | 40px | 绝大部分页面的常规筛选（默认选项） |
| **Small (小)**    | `.lds-capsule .lds-capsule--small`        | 36px | 卡片内、抽屉内、紧凑的局部筛选   |

**示例代码**：

```html
<!-- ✅ 正确：使用 label 包裹 input + .lds-capsule -->
<label class="lds-capsule-wrapper">
  <input type="radio" name="status" value="all" checked />
  <span class="lds-capsule lds-capsule--default-size">全部</span>
</label>
<label class="lds-capsule-wrapper">
  <input type="radio" name="status" value="processing" />
  <span class="lds-capsule lds-capsule--default-size">进行中</span>
</label>

<!-- ❌ 错误：缺失尺寸类名，高度塌陷 -->
<span class="lds-capsule">全部</span>
```

> `.lds-capsule-wrapper` 内的 `<input type="radio">` 默认通过 CSS 隐藏，仅 `.lds-capsule` 作为视觉呈现层。

## 实现要点

在实现胶囊时，请确保代码涵盖以下状态：

- 默认 (Default)：透明/弱填充背景，弱边框
- 悬停 (Hover)：边框/填充加深，但不抢占选中态视觉
- 聚焦 (Focus)：保留键盘可访问的聚焦轮廓
- 选中 (Checked)：使用 Primary 颜色边框（1.5px）和浅色填充，文字使用 Primary 色
- 禁用 (Disabled)：使用 disable token 降低对比度，禁止 hover/active 反馈

胶囊是单选语义控件，**必须**基于 `<input type="radio">` 实现，以保证键盘可达性、表单提交语义、屏幕阅读器播报均正确。

## 与相关组件的区别

- **Tabs（capsule 变体）**：用于切换页面/区块的**主内容**，是导航语义；Capsule 用于在当前区块内**筛选数据**，是表单语义。
- **Tag**：用于**展示**分类、状态，通常不可选；Capsule 是可点击的选择控件。
- **Button**：触发**动作**（动词），Capsule 表达**选择**（名词/状态）。
- **Checkbox / Tag 多选**：多选场景使用 Checkbox 或可切换 Tag，不要使用多个 Capsule。

## 兜底策略

如果模式不明确：

- 当需要"在几个互斥选项中选 1 个"且选项数 ≤ 7 时，优先选择胶囊。
- 选项数过多 → 改用 Select；多选 → 改用 Checkbox 或 Tag。
- 保持一组胶囊的尺寸与外观一致，不要混用 large 与 small。
- 除非流程明确要求，否则避免发明自定义胶囊行为（如长按、双击等）。

