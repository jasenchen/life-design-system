# 搜索框 (Search)

在用户需要针对列表、表格、内容库或选择器进行关键词检索时使用搜索框。`Search` 是专用于搜索场景的输入组件，内置左侧搜索图标，并支持三种尺寸与搜索态交互。

## 如何识别搜索框

可能的搜索框通常表现为：

- 左侧固定带有搜索图标（放大镜）的单行输入控件。
- 占位文案通常为“请输入”“搜索关键词”“搜索名称”等检索导向语句。
- 常见于页面顶部工具栏、列表筛选区、表格上方或弹窗内的查找区域。
- 已输入内容时，通常会在悬停态出现清空按钮，方便快速重置关键词。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的 `<Search>` 组件（如果是在 React 项目中）。**
- 搜索场景优先使用 `Search`，不要直接拿普通 `Input` 替代，以免缺失搜索图标、尺寸规格和清空交互。
- 一般页面默认使用 `default-size`；信息层级更高、位于页面主操作区时使用 `large`；空间紧凑的工具栏或弹层内使用 `small`。
- 占位文案应明确搜索目标，如“搜索商品名称”“搜索订单号”，避免使用过于泛化的提示语。
- 有输入内容时可开启清空能力，但清空按钮应只作为辅助操作，不应替代明确的“搜索”主动作。
- 保持清晰的聚焦可见性（Focus Visibility）和禁用态反馈，确保搜索框在工具栏和表单场景中都可快速辨识。

## 常见布局

- **列表 / 表格工具栏**：使用 `default-size`，放在筛选器或批量操作左侧，作为关键词检索入口。
- **页面主搜索区**：使用 `large`，强调搜索为主要交互入口，如搜索页头部、内容中心顶部。
- **弹窗 / 抽屉内查找**：使用 `small` 或 `default-size`，适合空间较紧的局部搜索场景。
- **复合筛选区**：搜索框与筛选器并列时，保持同一行的间距节奏一致，不要额外魔改其高度和内边距。

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Search>` 组件，以避免尺寸、状态和清空逻辑遗漏问题。

```tsx
import { Search } from '@life-ds/components-web';
import { useState } from 'react';

export function SearchExamples() {
  const [keyword, setKeyword] = useState('');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* ✅ 正确：默认搜索框 */}
      <Search
        size="default-size"
        placeholder="请输入"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onClear={() => setKeyword('')}
      />

      {/* ✅ 正确：大号搜索框 */}
      <Search
        size="large"
        placeholder="搜索商品名称"
        defaultValue="农夫山泉纯净水500ml"
      />

      {/* ✅ 正确：小号禁用搜索框 */}
      <Search
        size="small"
        placeholder="请输入"
        disabled
      />

      {/* ❌ 错误：在 React 中手动拼接类名 */}
      {/* <div className="lds-search lds-search--default-size">...</div> */}
    </div>
  );
}
```

### Search 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 搜索框尺寸 |
| `wrapperClassName` | `string` | `undefined` | 外层容器类名，适用于文档预览态或局部扩展 |
| `isFocused` | `boolean` | `false` | 强制激活态外观，主要用于受控展示或示例页 |
| `clearable` | `boolean` | `true` | 是否允许显示清空按钮 |
| `onClear` | `() => void` | `undefined` | 点击清空按钮后的回调 |
| `value` | `string` | `undefined` | 受控输入值 |
| `defaultValue` | `string` | `undefined` | 非受控初始值 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `placeholder` | `string` | `undefined` | 占位文案 |
| `onChange` | `(e) => void` | `undefined` | 输入内容变化回调 |

> 其余属性继承自原生 `<input type="search">`。

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，使用组件库搜索框时，除了指定尺寸类名（如 `.lds-search--default-size`），**必须**保留内部前置图标、输入区和清空按钮结构，否则会丢失搜索语义与交互反馈。

| 尺寸名称 | 类名组合 | 目标高度 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **Large (大)** | `.lds-search .lds-search--large` | 48px | 页面主搜索入口 |
| **Default (默认)** | `.lds-search .lds-search--default-size` | 40px | 常规列表/工具栏搜索 |
| **Small (小)** | `.lds-search .lds-search--small` | 36px | 紧凑工具栏、弹层搜索 |

**示例代码**：

```html
<!-- ✅ 正确：带尺寸类名和完整结构 -->
<div class="lds-search lds-search--default-size">
  <span class="lds-search__prefix" aria-hidden="true">
    <svg class="icon"><use href="#ic-search-line"></use></svg>
  </span>
  <input class="lds-search__input" type="search" placeholder="请输入" />
</div>

<!-- ❌ 错误：缺失尺寸类名和内部结构 -->
<div class="lds-search">
  <input type="search" placeholder="请输入" />
</div>
```

## 实现要点

在实现搜索框时，请确保代码涵盖以下状态：

- 默认 (Default)
- 悬停 (Hover)
- 聚焦 / 激活 (Focus / Active)
- 禁用 (Disabled)

补充约束：

- 尺寸需对齐 Figma：`large/default-size/small` 分别对应 `48/40/36px` 高度。
- 圆角需对齐 Figma：`large/default-size` 为 `12px`，`small` 为 `10px`。
- 大号输入文本使用 `subtitle/regular`，默认和小号使用 `body/regular`。
- 左侧搜索图标不可省略；大号图标为 `20px`，默认和小号为 `18px`。
- 已输入时清空按钮仅作为辅助能力出现，避免默认常显造成视觉噪音。
- 所有颜色必须使用 design tokens，禁止硬编码颜色值。

## 兜底策略

如果模式不明确：

- 只要该输入框的核心目的是“关键词检索”，优先使用 `Search`，而不是 `Input`。
- 优先选择符合容器密度的默认尺寸：常规页面用 `default-size`，紧凑区域用 `small`，主搜索区用 `large`。
- 保留原始界面的搜索意图，除非流程明确要求，否则不要发明额外的图标按钮或搜索内联操作。
