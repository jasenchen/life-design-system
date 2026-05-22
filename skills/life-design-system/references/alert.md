# 提示条 (Alert)

在需要向用户传达即时的、与上下文相关的反馈或公告信息时使用 Alert，例如操作结果、系统状态、风险提示或全局公告。Alert 不打断用户操作，置于内容流中或区块顶部。

## 如何识别 Alert

可能的 Alert 通常表现为：

- 横向矩形条带，左侧带语义图标 + 文案，背景为浅色语义底色。
- 不带描边（仅有 fill 背景），圆角 12px。
- 出现在页面顶部、表单顶部、表格上方或对话框中，用于补充上下文信息。
- 右侧偶尔带有"查看详情"等次级链接，或一个"×"关闭按钮。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的** **`<Alert>`** **组件（如果是在 React 项目中）。**
- 根据消息语义选择正确的 `variant`：成功用 `success`、错误用 `error`、警告用 `warning`、信息提示用 `info`、中性公告用 `gray`。
- 务必使用组件样式和组件提供的API，禁止对组件进行样式魔改或者覆盖。
- 文案应简洁，标题为关键结论，描述补充上下文与可执行建议。
- 同一区块内避免堆叠多条不同语义的 Alert，必要时按重要性排序或合并。
- 涉及可逆操作或仅做提示时，可开启 `closable` 让用户主动关闭；涉及强警告/错误且需要持续可见的，**不要**让用户关闭。

## 常见布局

- **页面顶部公告**：`gray` 变体，自适应整宽，可配合"查看详情"链接。
- **表单校验汇总**：`error` 变体，置于表单顶部，列出错误概要。
- **成功信息反馈**：`success` 变体，标题简短，可配合 `closable` 让用户关闭。
- **风险提示**：`warning` 变体，描述需要列明用户操作的影响范围。

```tsx
// ✅ 推荐：使用语义 variant + closable 控制关闭行为
<Alert
  variant="info"
  title="提示标题"
  description={
    <>
      消息提示文字自动布局 <a href="#">查看详情</a>
    </>
  }
  closable
/>

// ❌ 不推荐：用 info 当成 error 用，或自行硬编码颜色
<Alert variant="info" title="保存失败" style={{ background: '#FFE4E4' }} />
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Alert>` 组件，以避免变体类名遗漏与样式偏移问题。

```tsx
import { Alert } from '@life-ds/components-web';

// ✅ 正确：使用 React 组件
<Alert variant="success" title="保存成功" description="你的更改已提交。" closable />

<Alert
  variant="warning"
  title="即将到期"
  description={<>账户将在 7 天后到期，<a href="#">立即续费</a></>}
/>

// ❌ 错误：在 React 中手动拼接类名
<div className="lds-alert lds-alert--info">提示</div>
```

### Alert 组件 API

| 属性               | 类型                                                      | 默认值         | 说明                     |
| ---------------- | ------------------------------------------------------- | ----------- | ---------------------- |
| `variant`        | `'info' \| 'success' \| 'warning' \| 'error' \| 'gray'` | `'info'`    | 语义类型，决定背景色与默认图标        |
| `title`          | `React.ReactNode`                                       | `undefined` | 标题文案                   |
| `description`    | `React.ReactNode`                                       | `undefined` | 描述文案，支持嵌入 `<a>` 等富文本   |
| `icon`           | `React.ReactNode`                                       | `undefined` | 自定义左侧图标，传入后覆盖默认语义图标    |
| `showIcon`       | `boolean`                                               | `true`      | 是否显示左侧图标               |
| `action`         | `React.ReactNode`                                       | `undefined` | 右侧操作区（如按钮/链接）          |
| `closable`       | `boolean`                                               | `false`     | 是否显示右侧关闭按钮             |
| `defaultVisible` | `boolean`                                               | `true`      | 非受控模式下的初始显示状态          |
| `visible`        | `boolean`                                               | `undefined` | 受控显示状态，传入后由父组件管理可见性    |
| `onClose`        | `() => void`                                            | `undefined` | 点击关闭按钮时触发              |
| `closeLabel`     | `string`                                                | `'关闭提示'`    | 关闭按钮的可访问名称（aria-label） |

> 非受控用法下点击关闭按钮会直接将 Alert 从 DOM 中移除（组件返回 `null`）；受控用法需自行根据 `onClose` 切换 `visible`。

### 语义类型与图标映射

| variant   | 默认图标                    | 适用场景           |
| :-------- | :---------------------- | :------------- |
| `info`    | `ic-info-round-fill`    | 一般信息、说明        |
| `success` | `ic-finish-round-fill`  | 操作成功、状态正常      |
| `warning` | `ic-warning-round-fill` | 风险提示、注意事项      |
| `error`   | `ic-error-round-fill`   | 错误反馈、操作失败      |
| `gray`    | `ic-reduce-round-fill`  | 中性公告、不带情感色彩的提示 |

***

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，使用组件库 Alert 时，**必须**组合对应的语义变体类名，否则只会得到无样式的容器。

| 变体名称             | 类名组合                             | 适用场景   |
| :--------------- | :------------------------------- | :----- |
| **Info (信息)**    | `.lds-alert .lds-alert--info`    | 一般信息提示 |
| **Success (成功)** | `.lds-alert .lds-alert--success` | 成功反馈   |
| **Warning (警告)** | `.lds-alert .lds-alert--warning` | 风险提示   |
| **Error (错误)**   | `.lds-alert .lds-alert--error`   | 错误反馈   |
| **Gray (中性)**    | `.lds-alert .lds-alert--gray`    | 中性公告   |

**示例代码**：

```html
<!-- ✅ 正确：带语义变体类名 -->
<div class="lds-alert lds-alert--info" role="alert">
  <div class="lds-alert__icon"><!-- 18px 语义图标 --></div>
  <div class="lds-alert__content">
    <div class="lds-alert__title">提示标题</div>
    <div class="lds-alert__description">消息提示文字自动布局</div>
  </div>
  <button class="lds-alert__close" aria-label="关闭提示"><!-- 16px 关闭图标 --></button>
</div>

<!-- ❌ 错误：缺失语义变体类名，无背景色 -->
<div class="lds-alert">提示标题</div>
```

## 实现要点

在实现 Alert 时，请确保覆盖以下结构与状态：

- **结构**：左侧图标 (18px) · 内容区（标题 + 描述/富文本）· 可选 action · 可选关闭按钮 (16px)。
- **尺寸**：圆角 `var(--radius-m, 12px)`，内边距 `9px 16px`，元素水平 gap `12px`。
- **无描边**：外层不能有 `border`，仅靠背景色区分语义。
- **关闭按钮交互**：默认/hover/active **均不能出现底色变化**，仅切换图标颜色（`color: var(--color-text-primary)` on hover）。
- **可访问性**：根节点 `role="alert"`，关闭按钮带 `aria-label`，图标节点 `aria-hidden="true"`。
- **关闭行为**：非受控时点击关闭直接从 DOM 移除；受控时由父组件管理 `visible`。
- **颜色 token**：必须使用 `life-ds-tokens.css` 中的语义 token（如 `color-fill-gray`、`color-border-normal`、`color-gray-5`），禁止硬编码颜色值。

## 兜底策略

如果模式不明确：

- 选择符合语义层级的最简单的 `variant`，优先 `info` 或 `gray`。
- 保留原始界面的意图，避免改变信息密度。
- 除非流程明确要求，否则不要在 Alert 中放置过多操作按钮——必要时改用 Dialog 或 Banner。

