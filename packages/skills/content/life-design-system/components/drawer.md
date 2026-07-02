# 抽屉 (Drawer)

在用户需要在不离开当前页面的前提下查看详情、编辑表单、执行复杂二级操作时使用抽屉。抽屉从屏幕右侧滑入，承载与当前页面强相关的内容，关闭后不影响主页面状态。

## 如何识别抽屉

可能的抽屉通常表现为：

- 从屏幕右侧滑入的悬浮面板，覆盖在当前页面之上，并伴随半透明蒙层。
- 顶部带有标题与右上角关闭按钮（×），底部通常带有一对操作按钮。
- 宽度固定（最常见 640px），高度撑满整个浏览器视口。
- 不会切换路由，关闭后立即回到原页面。
- 与 Modal/Dialog 不同：抽屉宽度大、内容体量大（表单、详情、列表），适合**编辑/详情**类承载。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的 `<Drawer>` 组件（如果是在 React 项目中）。**
- 用于承载**与当前页面强相关**的二级内容（编辑详情、查看详情、配置面板）。
- 标题用名词短语，明确告知用户"这是什么"（如"编辑用户"、"订单详情"）。
- 底部操作区固定一组主要操作（取消 + 确认），避免堆叠过多按钮。
- 如果 footer 内除了按钮还需要增加说明、统计、状态提示等**自定义内容**，则应放置在 **footer 左侧区域**，右侧区域保留给主要操作按钮。
- **保持组件挂载，仅切换 `open` 控制显隐**，确保进/出场动画完整执行。禁止使用 `{open && <Drawer />}` 的条件渲染方式。
- 一次只打开一个抽屉，避免抽屉嵌套抽屉。
- 复杂表单建议拆分为分步或分组，避免抽屉内出现过长的单列滚动表单。
- 关闭前如有未保存改动应弹二次确认，避免误操作丢失数据。

## 常见布局

- **详情查看**：标题 + 内容（描述列表 / 字段卡片），通常无底部操作或仅"关闭"按钮。
- **编辑表单**：标题 + 表单 Body，底部固定 "取消 + 保存" 按钮。
- **配置面板**：标题 + 分组配置项，底部 "重置 + 应用"。
- **批量操作流程**：标题 + 步骤指示 + 内容区，底部 "上一步 + 下一步 / 完成"。
- **带辅助信息的操作区**：footer 左侧放说明/统计/提示信息，右侧放取消、确认等操作按钮。

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Drawer>` 组件，以避免动画、Portal、可访问性逻辑的遗漏。

```tsx
import { Drawer, Button } from '@life-ds/components-web';
import { useState } from 'react';

const [open, setOpen] = useState(false);

// ✅ 正确：组件常驻挂载，使用 open 控制显隐
<>
  <Button variant="primary" onClick={() => setOpen(true)}>编辑详情</Button>

  <Drawer
    open={open}
    title="编辑用户信息"
    onClose={() => setOpen(false)}
    footer={
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}
      >
        <span style={{ font: 'var(--body-regular)', color: 'var(--color-text-secondary)' }}>
          已选择 12 项
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button variant="primary" onClick={handleSave}>保存</Button>
        </div>
      </div>
    }
  >
    {/* 表单内容 */}
  </Drawer>
</>

// ❌ 错误：条件渲染会立即卸载组件，导致退场动画被截断
{open && <Drawer open={open} onClose={() => setOpen(false)}>...</Drawer>}
```

### Drawer 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | 是否打开抽屉。**始终保持组件挂载**，仅切换该属性 |
| `title` | `React.ReactNode` | — | 标题区域内容 |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 抽屉尺寸（large 920px / default 640px / small 480px） |
| `width` | `number \| string` | — | 自定义宽度，会覆盖 `size` 的默认宽度 |
| `footer` | `React.ReactNode` | — | 自定义底部内容。通常右侧放操作按钮；如存在额外说明、统计、状态提示等内容，应放在左侧区域 |
| `showFooter` | `boolean` | 跟随 `footer` | 是否显示底部区域 |
| `extra` | `React.ReactNode` | — | 标题右侧附加内容（常用于状态标签、辅助操作） |
| `maskClosable` | `boolean` | `true` | 点击蒙层是否关闭 |
| `closeOnEsc` | `boolean` | `true` | 按下 Esc 是否关闭 |
| `showCloseButton` | `boolean` | `true` | 是否显示右上角关闭按钮 |
| `onClose` | `() => void` | — | 关闭回调（蒙层点击 / Esc / 关闭按钮均会触发） |
| `getContainer` | `() => HTMLElement \| null` | `() => document.body` | 自定义挂载容器 |
| `bodyClassName` | `string` | — | 内容区域自定义类名 |
| `closeLabel` | `string` | `'关闭抽屉'` | 关闭按钮的可访问名称（aria-label） |

### 尺寸规范

| 尺寸名称 | `size` 值 | 宽度 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **Large (大)** | `'large'` | 920px | 复杂表单、双栏布局、需要展示大量信息的场景 |
| **Default (默认)** | `'default-size'` | 640px | 绝大部分编辑/详情场景（默认选项） |
| **Small (小)** | `'small'` | 480px | 简短表单、轻量配置、单一字段编辑 |

> 当上述三档无法满足需求时，使用 `width` 自定义；但应优先选择标准档位以保持视觉一致性。

---

## 实现要点

在使用抽屉时，请确保下列体验与可访问性要点已经覆盖：

- **进/出场动画**：组件内部已封装从右侧滑入的 `translate3d` 动画 + 蒙层淡入淡出。**必须保持组件挂载并通过 `open` 切换**，否则关闭动画无法播放。
- **背景滚动锁定**：抽屉打开时自动锁定 `body` 滚动；关闭后恢复。
- **关闭路径**：默认支持 3 种关闭方式 —— 右上角 × 按钮、点击蒙层、按下 Esc，均通过 `onClose` 统一回调。
- **键盘可达**：标题节点带 `id`，外层 `role="dialog"` + `aria-modal="true"` + `aria-labelledby`，无需额外处理。
- **背景色**：抽屉本体与底部操作区使用 `--color-bg-popup`，不要硬编码颜色。
- **内容区可滚动**：当内容超出视口高度时，仅 `.lds-drawer__body` 内部滚动，标题与底部操作区保持固定。
- **Footer 信息布局**：footer 需要同时承载信息与操作时，遵循"左信息、右操作"的布局约定，避免把说明类内容混入右侧按钮组。

## 与相关组件的区别

- **Dialog（对话框）**：用于**确认/警告/反馈**类轻量交互，宽度小（默认 402px）、内容简短。Drawer 用于**承载较多信息或复杂表单**，宽度大、可滚动。
- **Popover / Tooltip**：用于**轻提示、轻操作**，附着在触发元素旁边。Drawer 是页面级悬浮容器，与触发元素无空间关系。
- **新页面 / 路由**：当二级内容**与当前页面无强关联**或**需要分享/收藏链接**时，应使用新页面，而非 Drawer。

## 兜底策略

如果模式不明确：

- 内容承载量大、需保留主页面上下文 → 使用 Drawer。
- 仅需用户做一次确认或警告 → 使用 Dialog，不要使用 Drawer。
- 抽屉嵌套抽屉、抽屉里再开 Modal 的需求出现时，应优先重构信息架构，而非堆叠浮层。
- 除非流程明确要求，否则避免发明自定义抽屉行为（如左侧/上方/底部滑入），保持系统视觉一致。
