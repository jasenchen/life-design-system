# 全局提示 (Message)

在用户完成某个轻量操作后，需要给出**短暂、非阻塞、自动消失**的顶部反馈时，使用 `Message`。

> `Message` 与 `Alert` 的使用边界必须严格区分：
>
> - `Message`：用于 **按钮触发后的全局轻提示 / 顶部短反馈 / 自动消失通知**
> - `Alert`：用于 **页面内常驻提示条 / 表单说明 / 区块级状态反馈**
>
> 不要把全局短提示误做成 `Alert`，也不要把需要常驻阅读的说明误做成 `Message`。

## 如何识别全局提示

可能的 `Message` 通常表现为：

- 由某个按钮、提交、保存、复制、切换状态等操作触发。
- 展示在页面顶部中间，而不是嵌在表单、卡片或内容区内部。
- 内容较短，通常只有一行文案和一个语义图标。
- 默认展示几秒后自动消失，不打断当前页面操作流程。
- 多条连续触发时会在顶部堆叠出现，并按顺序退出。
- 常见语义态包括信息、成功、警告、错误。

## 最佳实践

- **优先使用 `@life-ds/components-web` 组件库中的 `message` API 或 `<Message>` 组件（如果是在 React 项目中）。**
- 如果需求是“点击按钮后页面顶部提示一下”，优先使用 `message.info()` / `message.success()` 这类全局调用方式，而不是自己挂一个受控状态容器。
- `Message` 默认停留 `3s`，只有在业务明确需要更长反馈时才调整 `duration`。
- 当提示需要用户主动关闭或阅读较久时，可使用 `duration={0}` 并打开 `closable`。
- 多条消息应允许自动堆叠，并在前一条退出时平滑上移，不要让后续消息瞬移。
- 动效要轻量，进入/退出以“上浮 + 淡入淡出”为主，不要使用过重的缩放或弹跳。
- 文案应简洁直接，优先控制在一行内；如果内容需要说明上下文、链接或操作区，请改用 `Alert` 或 `Dialog`。

## 相似组件区分

- **`Message`**：用于操作后的顶部全局短反馈，非阻塞，默认自动消失。
- **`Alert`**：用于页面内的块级提示条，可常驻，可带标题、描述、操作区。
- **`Dialog`**：用于需要用户明确确认、处理或中断流程的反馈。
- 如果提示需要在页面顶部全局出现并且几秒后自己消失，使用 `Message`。
- 如果提示需要嵌在页面结构里长期展示，使用 `Alert`。
- 如果提示需要用户立即处理，否则无法继续操作，使用 `Dialog`。

## 常见布局

- **保存成功提示**：点击“保存”后在页面顶部显示“保存成功”。
- **复制完成提示**：点击“复制链接”后在顶部提示“复制成功”。
- **校验失败提醒**：点击提交后，在顶部短暂提示“请先完成必填项”。
- **可关闭常驻提示**：某些一次性提醒需要保留，直到用户手动关闭。

```tsx
// ✅ 推荐：轻量全局提示
message.success({ content: '保存成功' });

// ✅ 推荐：需要更长停留时间
message.open({
  variant: 'info',
  content: '将在 5 秒后自动消失',
  duration: 5000,
});

// ✅ 推荐：需要用户手动关闭
message.open({
  variant: 'warning',
  content: '请尽快处理待办事项',
  duration: 0,
  closable: true,
});

// ❌ 不推荐：把顶部短提示误做成常驻 Alert
<Alert variant="success" description="保存成功" />
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `.lds-message` DOM 结构**，必须使用 `@life-ds/components-web` 提供的 `message` API 或 `<Message>` 组件，以避免全局挂载、堆叠、自动销毁和动效逻辑遗漏。

```tsx
import React from 'react';
import { Button, Message, message } from '@life-ds/components-web';

export function MessageExamples() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button
        onClick={() =>
          message.success({
            content: '保存成功',
          })
        }
      >
        触发成功提示
      </Button>

      <Button
        onClick={() =>
          message.open({
            key: 'sync-reminder',
            variant: 'warning',
            content: '请尽快处理待办事项',
            duration: 0,
            closable: true,
          })
        }
      >
        触发常驻提示
      </Button>

      <Message variant="info" content="不要超过8个字符" />
    </div>
  );
}

// ❌ 错误：在 React 中手动拼全局挂载容器和类名
<div className="lds-message-viewport">
  <div className="lds-message">保存成功</div>
</div>
```

### Message 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `React.ReactNode` | - | 提示文案 |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 语义类型 |
| `icon` | `React.ReactNode` | 按语义自动匹配 | 自定义左侧图标 |
| `closable` | `boolean` | `false` | 是否展示关闭按钮 |
| `closeLabel` | `string` | `'关闭提示'` | 关闭按钮的无障碍名称 |
| `visible` | `boolean` | `true` | 是否处于显示态，主要用于进出场动画承载 |
| `onClose` | `() => void` | `undefined` | 点击关闭按钮时触发 |

### message.open / message.info 等全局 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `key` | `React.Key` | 自动生成 | 同 key 会复用并刷新该条消息 |
| `content` | `React.ReactNode` | - | 提示文案 |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 语义类型，`message.info/success/...` 会自动注入 |
| `icon` | `React.ReactNode` | 自动匹配 | 自定义图标 |
| `duration` | `number` | `3000` | 自动关闭时长，单位毫秒；传 `0` 表示不自动关闭 |
| `closable` | `boolean` | `false` | 是否展示关闭按钮 |
| `className` | `string` | `undefined` | 自定义类名 |
| `style` | `React.CSSProperties` | `undefined` | 自定义行内样式 |
| `onClose` | `() => void` | `undefined` | 关闭后触发 |

### 全局方法

| 方法 | 说明 |
| --- | --- |
| `message.open(options)` | 打开一条消息 |
| `message.info(options)` | 打开信息提示 |
| `message.success(options)` | 打开成功提示 |
| `message.warning(options)` | 打开警告提示 |
| `message.error(options)` | 打开错误提示 |
| `message.destroy()` | 清空全部消息 |
| `message.destroy(key)` | 定向销毁指定消息 |

### 语义类型与默认图标

| variant | 默认图标 | 适用场景 |
| --- | --- | --- |
| `info` | `ic-info-round-fill` | 一般信息、操作提醒 |
| `success` | `ic-finish-round-fill` | 保存成功、提交成功 |
| `warning` | `ic-warning-round-fill` | 风险提醒、待处理提示 |
| `error` | `ic-error-round-fill` | 操作失败、异常反馈 |

### 尺寸规范

| 项目 | 规格 |
| --- | --- |
| 最小高度 | `46px` |
| 内边距 | `13px 16px` |
| 圆角 | `12px` |
| 图标尺寸 | `20px` |
| 文本规格 | `body/medium` |
| 默认阴影 | `shadow-normal` |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中使用 `Message` 时，**必须**同时提供顶部容器和消息项结构；如果只写一个 `.lds-message` 节点，会缺失顶部定位和堆叠行为。

| 区块 | 类名 | 说明 |
| --- | --- | --- |
| 顶部容器 | `.lds-message-viewport` | 固定在页面顶部中间的堆叠容器 |
| 堆叠项外层 | `.lds-message-viewport__item` | 承载收起 / 上移动画 |
| 消息根节点 | `.lds-message` | 单条消息内容 |
| 语义态 | `.lds-message--info/success/warning/error` | 控制背景、描边和图标色 |
| 图标区 | `.lds-message__icon` | 左侧 20px 图标 |
| 文案区 | `.lds-message__content` | 一行短文案 |
| 关闭按钮 | `.lds-message__close` | 可选关闭动作 |

**示例代码**：

```html
<!-- ✅ 正确：顶部容器 + 单条消息 -->
<div class="lds-message-viewport" role="presentation">
  <div class="lds-message-viewport__item is-visible">
    <div class="lds-message lds-message--success is-visible" role="status" aria-live="polite">
      <span class="lds-message__icon" aria-hidden="true">
        <svg class="icon" width="20" height="20"><use href="#ic-finish-round-fill" /></svg>
      </span>
      <span class="lds-message__content">保存成功</span>
    </div>
  </div>
</div>

<!-- ❌ 错误：只有消息本体，没有顶部容器 -->
<div class="lds-message lds-message--success">保存成功</div>
```

## 实现要点

在实现 `Message` 时，请确保覆盖以下结构与状态：

- **语义态覆盖**：`info`、`success`、`warning`、`error` 四种类型需具备稳定的背景、描边和图标色映射。
- **全局挂载**：消息应挂载到页面顶部统一容器，而不是依赖业务页面自己留占位。
- **自动消失**：默认 `3s` 自动关闭，并支持通过 `duration` 调整或设置为 `0`。
- **退出节奏**：关闭时不只淡出本条，还要让后续堆叠项带位移动画平滑上移。
- **可关闭场景**：当 `closable` 为 `true` 时，需要显示右侧关闭按钮，并支持键盘可访问性。
- **文本约束**：文案以一行为主，避免将复杂描述、链接或操作区塞进 `Message`。
- **动效一致性**：进入/退出动画应与仓库现有浮层节奏一致，并提供 `prefers-reduced-motion` 兜底。
- **无障碍**：使用 `role="status"` 和 `aria-live="polite"`，确保屏幕阅读器可感知。

## 兜底策略

如果模式不明确：

- 如果这是页面顶部的短时反馈，优先使用 `Message`。
- 如果这是页面内容区内的长期提示，优先使用 `Alert`。
- 如果提示需要用户确认、阻断或填写内容，优先使用 `Dialog`。
- 如果提示文案已经超过一行且需要附带操作，请明确标记 `Message` 不适合该场景，再改用更重的反馈组件。
