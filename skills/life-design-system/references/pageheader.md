# 页面标题区 (PageHeader)

在页面内容区顶部需要展示页面标题、页签切换，或二级页返回入口时使用 `PageHeader`。

## 如何识别 PageHeader

典型的 `PageHeader` 通常表现为：

- 位于 `.app-content` 顶部的页面标题区域。
- 上方是一行标题，下方可选一组一级标签页（Tabs）。
- 一级页通常只有大标题；二级页通常在左侧带返回按钮，标题字号更小。
- 它负责“页面级标题与导航”，不负责筛选器、表格操作栏和业务表单内容。

## 最佳实践

- **优先使用 `@life-ds/components-web` 提供的 `<PageHeader>` 组件（React 项目中必须如此）。**
- `PageHeader` 必须放在 `.app-content` 内部，不要放在 `.app-body` 直属层级。
- 一级页使用默认样式：`variant="primary"`，展示大标题。
- 所有二级页都使用 `variant="secondary"`，展示左侧返回按钮和较小标题。
- 页面级的 tab 可以放在 `PageHeader` 的 slot 区域；筛选器、操作按钮、统计信息等业务内容仍应放在 `PageHeader` 下方。
- 二级页的返回行为通过 `onBackClick` 传入；如果只需要视觉展示，也可以不传。

## 常见布局

- **一级列表页**：标题在上，页签在下，页签下方再接筛选器、操作栏、表格。
- **一级详情页**：只有标题，不带页签，下方直接进入正文内容。
- **二级配置页**：左侧返回按钮，右侧标题与页签纵向排列。

```tsx
// ✅ 推荐：一级页标题 + 页签
<PageHeader
  title="团购商品管理"
  tabs={
    <Tabs variant="primary" size="small" defaultValue="all">
      <Tab value="all">全部商品</Tab>
      <Tab value="selling">出售中</Tab>
      <Tab value="off">已下架</Tab>
    </Tabs>
  }
/>

// ✅ 推荐：二级页标题 + 返回按钮 + 页签
<PageHeader
  variant="secondary"
  title="二级页面标题"
  onBackClick={() => window.history.back()}
  tabs={
    <Tabs variant="primary" size="small" defaultValue="basic">
      <Tab value="basic">基础信息</Tab>
      <Tab value="rule">规则配置</Tab>
    </Tabs>
  }
/>
```

## React 组件用法（推荐）

在 React 项目中，禁止手写 `.lds-page-header` 相关 DOM 结构，必须直接使用 `@life-ds/components-web` 的 `<PageHeader>` 组件，避免遗漏变体、返回按钮和内置间距规则。

```tsx
import { PageHeader, Tab, Tabs } from '@life-ds/components-web';

// ✅ 正确：使用 React 组件
<PageHeader title="页面标题" />

<PageHeader
  variant="secondary"
  title="二级页面标题"
  onBackClick={() => window.history.back()}
  tabs={
    <Tabs variant="primary" size="small" defaultValue="tab-1">
      <Tab value="tab-1">标签一</Tab>
      <Tab value="tab-2">标签二</Tab>
    </Tabs>
  }
/>
```

### PageHeader 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | - | 页面标题文案，必填 |
| `tabs` | `React.ReactNode` | `undefined` | 标题下方插槽，通常传入 `<Tabs>` |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | 标题栏变体，一级页 / 二级页 |
| `onBackClick` | `React.MouseEventHandler<HTMLButtonElement>` | `undefined` | 二级页返回按钮点击事件 |
| `backButtonAriaLabel` | `string` | `'返回上一页'` | 二级页返回按钮无障碍文案 |

---

## 原生 HTML/CSS 用法（非 React 环境）

非 React 环境中，如果必须使用 `PageHeader`，请严格遵循已有类名结构；但在 React 项目中仍然**禁止**手写这些类名。

```html
<!-- 一级页 -->
<div class="lds-page-header lds-page-header--primary">
  <h1 class="lds-page-header__title">页面标题</h1>
  <div class="lds-page-header__tabs">
    <!-- Tabs 内容 -->
  </div>
</div>

<!-- 二级页 -->
<div class="lds-page-header lds-page-header--secondary">
  <div class="lds-page-header__secondary-layout">
    <button type="button" class="lds-page-header__back-button" aria-label="返回上一页"></button>
    <div class="lds-page-header__content">
      <h1 class="lds-page-header__title">二级页面标题</h1>
      <div class="lds-page-header__tabs">
        <!-- Tabs 内容 -->
      </div>
    </div>
  </div>
</div>
```

## 实现要点

- `PageHeader` 内置的是页面标题区的基础结构能力：一级标题、二级页返回按钮、标题下方 `tabs` 插槽。
- `PageHeader` 不负责业务区实现；筛选器、操作按钮、统计卡片、表格等内容需要放在它之后的业务区域中。
- 二级页中，返回按钮独立占位，标题和 `tabs` 为右侧纵向布局。
- 标题、间距和颜色应遵循现有 token 与组件样式，不要为单个业务页面覆盖 `PageHeader` 基础样式。

## 兜底策略

如果页面顶部结构不够明确：

- 优先判断它是否承担“页面标题 + 页面级导航”的作用；如果是，优先使用 `PageHeader`。
- 只有一个标题时，先使用默认 `primary` 变体。
- 如果页面明显存在“返回上一级”的路径，再切换为 `secondary` 变体。
- 不要把筛选器工具栏、统计模块或业务按钮误判成 `PageHeader` 的一部分。
