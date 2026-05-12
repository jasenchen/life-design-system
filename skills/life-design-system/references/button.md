# 按钮 (Button)

在用户需要执行明确的操作（如提交、确认、继续、保存或打开特定流程）时使用按钮。

## 如何识别按钮

可能的按钮通常表现为：

- 高对比度的填充样式，带有简短的标签。
- 位于强有力 CTA 旁边的带边框或低强调度的辅助操作。
- 模态框、表单或底部操作区中的全宽或突出的页脚操作。
- 带有动词首选标签的圆角矩形控件。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的 `<Button>` 组件（如果是在 React 项目中）。**
- 使用 Primary（主按钮）执行核心 CTA，使用 **Default**（普通按钮）执行辅助操作。
- 同一区块内避免出现2个及2个以上的 Primary 按钮。
- 标签应以动词开头。
- 大多数情况下，优先使用系统默认的按钮颜色。
- 保持清晰的聚焦可见性（Focus Visibility）和易于点击的触碰区域。
- 在按钮内部处理加载状态（Loading），防止重复触发。

## 常见布局

- **对话框页脚**：一个 **Default** 取消操作 + 一个 Primary 确认操作。
- **表单页脚**：一个明确的 Primary 操作 + 一个低强调度的辅助操作。
- **底部 CTA 区域**：一个突出的操作，与屏幕边缘保持舒适的间距。
- 快捷操作：table的顶部一个Primary的新建操作+多个**Default批量操作**

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Button>` 组件，以避免尺寸和变体类名遗漏问题。

```tsx
import { Button, Icon } from '@life-ds/components-web';

// ✅ 正确：使用 React 组件
<Button variant="primary" size="large">确认提交</Button>
<Button variant="default" icon={<Icon name="ic-add-round-line" />}>添加</Button>

// ❌ 错误：在 React 中手动拼接类名
<button className="lds-btn lds-btn--primary lds-btn--large">确认提交</button>
```

### Button 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 按钮尺寸 |
| `variant` | `'primary' \| 'default' \| 'secondary' \| 'text' \| 'icon'` | `'default'` | 按钮变体（默认、主按钮、次级、文本、纯图标） |
| `icon` | `React.ReactNode` | `undefined` | 按钮内包含的图标，推荐传入 `<Icon>` 组件 |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，使用组件库按钮时，除了指定样式变体（如 `.lds-btn--primary`），**必须**组合对应的尺寸类名，否则会导致高度和内边距缺失！

| 尺寸名称 | 类名组合 | 目标高度 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **Large (大)** | `.lds-btn .lds-btn--large` | 48px | 核心行动点（如整宽表单提交底部） |
| **Default (默认)** | `.lds-btn .lds-btn--default-size` | 40px | 绝大部分页面的常规操作按钮（默认选项） |
| **Small (小)** | `.lds-btn .lds-btn--small` | 36px | 表格行内操作、紧凑的工具栏等 |

**示例代码**：
```html
<!-- ✅ 正确：带尺寸类名 -->
<button class="lds-btn lds-btn--primary lds-btn--default-size">确认提交</button>

<!-- ❌ 错误：缺失尺寸类名，高度塌陷 -->
<button class="lds-btn lds-btn--primary">确认提交</button>
```

## 实现要点

在实现按钮时，请确保代码涵盖以下状态：

- 默认 (Default)
- 悬停 (Hover)
- 聚焦 (Focus)
- 激活 (Active)
- 禁用 (Disabled)
- 加载中 (Loading)

如果无法直接使用标准按钮，请使用仓库中现有的最接近的按钮组件，并保持层级、间距和状态行为的一致性。

## 兜底策略

如果模式不明确：

- 选择符合层级结构的最简单的标准按钮变体。
- 保留原始界面的意图。
- 除非流程明确要求，否则避免发明自定义按钮行为。
