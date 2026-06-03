# 状态 (Status)

在详情页头部、统领信息区或流程结果页顶部需要突出展示“当前主状态 + 辅助说明”时，使用 `Status`。

`Status` 是一个轻量的状态摘要组件，通常由一行大号状态标题和一段两行内的副文案组成，不带卡片底板、不带标签描边，也不承担页面标题栏本身的导航职责。

## 如何识别 Status

典型的 `Status` 通常表现为：

- 位于详情页或配置页正文顶部，常出现在 `PageHeader` 下方、正文内容上方。
- 第一行是一个醒目的大号状态词，如“审核中”“已完成”“已失败”“未开始”。
- 第二行是补充说明，解释当前状态、下一步动作或失败原因，通常不超过两行。
- 通过标题颜色表达状态语义，常见为蓝、绿、橙、红、灰、黑 6 种。
- 整体是纯文本信息块，不是胶囊标签，不带图标、不带描边、不带实底色。

## 与其他组件的边界

- **不要把 `Status` 误当成 `Tag`**：`Tag` 是紧凑型状态标签，常用于表格单元格、标题旁辅助状态或筛选条件；`Status` 是详情页头部的统领状态，视觉权重更高。
- **不要把 `Status` 误当成 `PageHeader`**：`PageHeader` 负责页面标题、返回按钮和页签导航；`Status` 负责业务状态表达，应放在 `PageHeader` 下方的业务区域。
- **不要把 `Status` 做成卡片**：默认应为纯文本结构，依赖页面整体布局留白承托，不额外包灰底、白卡片或描边框。

## 最佳实践

- **在 React 项目中必须优先使用 `@life-ds/components-web` 提供的 `<Status />` 组件。**
- `title` 应只表达当前主状态，保持极简，通常为 2-6 个汉字。
- `description` 用于补充上下文、失败原因、提示动作或结果说明，默认按两行内的信息密度控制。
- 颜色只承担状态语义，不要再额外叠加图标、标签或彩色底板制造重复强调。
- 组件本身不应写死宽度；设计稿中的 420px 是常见展示宽度，实际使用时由外层布局控制。
- 如果需要强调正文中的某几个词，可直接在 `description` 中传入富文本节点，而不是拆成多个组件。

## 常见语义色

根据当前实现，`Status` 支持 6 种语义色：

| 颜色 | `color` 值 | 典型语义 |
| --- | --- | --- |
| 蓝色 | `'blue'` | 进行中、审核中、处理中 |
| 绿色 | `'green'` | 成功、完成、已通过 |
| 橙色 | `'orange'` | 待处理、提醒、警示 |
| 红色 | `'red'` | 失败、驳回、异常 |
| 灰色 | `'gray'` | 未开始、失效、中性状态 |
| 黑色 | `'black'` | 已发布、稳定态、普通主状态强调 |

## React 组件用法（推荐）

在 React 项目中，禁止手写 `.lds-status` 相关 DOM 结构，必须直接使用 `@life-ds/components-web` 的 `<Status />` 组件。

```tsx
import React from 'react';
import { PageHeader, Status } from '@life-ds/components-web';

export default function DetailHeaderDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <PageHeader title="商品详情" />

      <Status
        color="blue"
        title="审核中"
        description={
          <>
            当前详情正在平台审核中，请耐心等待，支持 <strong>重点文案加粗</strong> 提示。
          </>
        }
      />
    </div>
  );
}
```

### Status 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | - | 主状态文案，必填 |
| `description` | `React.ReactNode` | `undefined` | 副文案说明，可传富文本 |
| `color` | `'blue' \| 'green' \| 'orange' \| 'red' \| 'gray' \| 'black'` | `'black'` | 状态语义色 |

```tsx
// ✅ 正确：使用组件并传入语义色
<Status color="green" title="已完成" description="当前任务已全部完成，可继续执行后续操作。" />

// ❌ 不建议：用 Tag 拼一个放大的“状态栏”
<Tag size="large" variant="light" color="green">已完成</Tag>
```

## 原生 HTML/CSS 用法（非 React 环境）

非 React 环境中，如必须使用此模式，请严格遵循已有类名结构；但在 React 项目中仍然**禁止**手写这些类名。

```html
<div class="lds-status lds-status--blue">
  <div class="lds-status__title">审核中</div>
  <div class="lds-status__description">当前详情正在平台审核中，请耐心等待。</div>
</div>
```

## 实现要点

- 主标题使用 `display-medium`，副文案使用 `body-regular`。
- 主副文案之间的垂直间距固定为 `var(--spacing-2x)`。
- 颜色变化只影响标题，不影响副文案；副文案保持正文次级文本色，确保信息层级稳定。
- 默认不带背景色、边框、阴影或图标；如果页面需要额外容器，应由外层业务布局决定，而不是改动 `Status` 基础样式。

## 兜底策略

如果页面中的状态表达形式不够明确：

- 只要它承担的是“详情页顶部的主状态摘要”职责，优先使用 `Status`。
- 如果只是列表内的小型状态、标题旁的小药丸，优先回退到 `Tag`。
- 如果同时存在页面标题和状态摘要，应采用 `PageHeader + Status` 的上下组合，而不是把两者合并成一个组件。
