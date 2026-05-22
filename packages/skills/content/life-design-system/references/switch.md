# 开关 (Switch)

在用户需要快速切换某个**二元状态**，且切换后通常应立即生效时使用开关，例如“启用通知”“营业中/休息中”“自动续费开/关”等。

## 如何识别开关

可能的 Switch 通常表现为：

- 一个横向圆角胶囊轨道，内部有一个可滑动的圆形或圆角矩形滑块。
- 只有两种状态：`on` / `off`，没有第三种半选态。
- 点击后状态会立即切换，通常不需要再点“确认”按钮。
- 常与设置项标题、说明文案或列表项右侧的状态控制一起出现。

## 最佳实践

- **优先使用 `@life-ds/components-web` 组件库中的 `<Switch>` 组件（如果是在 React 项目中）。**
- Switch 适用于**立即生效**的二元设置；如果用户需要在多个选项中做勾选或批量提交，请使用 `Checkbox`，不要误用 `Switch`。
- 同一页面内，Switch 的视觉和交互应保持一致，避免同类设置出现不同尺寸或不同动画节奏。
- 不要覆盖组件内置的轨道颜色、滑块尺寸和切换动效；动画应保持平滑、明确，并遵循设计系统已有节奏。
- 对于风险较高或不可逆的操作，不要仅靠 Switch 直接执行，必要时在切换后补充确认流程或二次提示。
- 必须处理禁用态和键盘可访问性，确保 `disabled` 状态下不响应点击和键盘输入。

## 常见布局

- **设置列表右侧**：左侧为标题和说明，右侧放一个 Switch，用于开启或关闭该项能力。
- **表单中的布尔配置项**：用于“是否启用”“是否公开”“是否自动同步”等即时生效字段。
- **卡片或模块头部状态控制**：在区块标题旁提供启用/停用切换。
- **紧凑工具区**：优先使用小号 `small`，避免在密集操作区占用过多横向空间。

```tsx
// ✅ 推荐：用于立即生效的二元设置
<Switch size="default-size" defaultChecked />

// ✅ 推荐：紧凑场景使用 small
<Switch size="small" />

// ❌ 不推荐：把需要“提交后统一保存”的勾选项做成 Switch
<Switch defaultChecked aria-label="我已阅读并同意服务条款" />
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `.lds-switch` DOM 结构**，必须使用 `@life-ds/components-web` 包提供的 `<Switch>` 组件，以避免尺寸、状态类名和可访问性属性遗漏。

```tsx
import React from 'react';
import { Switch } from '@life-ds/components-web';

export function SwitchExamples() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {/* 1) 非受控：仅声明初始状态 */}
      <Switch size="default-size" defaultChecked />

      {/* 2) 受控：由父组件维护开关值 */}
      <Switch
        size="default-size"
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-label="营业状态"
      />

      {/* 3) 小号：适合紧凑布局 */}
      <Switch size="small" aria-label="是否置顶" />

      {/* 4) 禁用 */}
      <Switch size="default-size" disabled aria-label="功能开关（禁用）" />
      <Switch size="default-size" defaultChecked disabled aria-label="功能开关（禁用且开启）" />
    </div>
  );
}

// ❌ 错误：在 React 中手动拼接类名
<label className="lds-switch lds-switch--default-size">
  <input type="checkbox" />
  <span className="lds-switch__track">
    <span className="lds-switch__thumb" />
  </span>
</label>
```

### Switch 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'default-size' \| 'small'` | `'default-size'` | 开关尺寸 |
| `checked` | `boolean` | `undefined` | 受控模式下的选中状态 |
| `defaultChecked` | `boolean` | `undefined` | 非受控模式下的初始选中状态 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readOnly` | `boolean` | `false` | 是否只读，只读时保留显示但不切换 |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | 开关状态切换时触发，返回最新布尔值 |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | `undefined` | 原生 `input` 变更回调 |

> `Switch` 基于原生 `input[type="checkbox"]` 实现，并带有 `role="switch"`。需要无障碍名称时，请传入 `aria-label`，或在外层语义结构中提供可关联的文本说明。

### 尺寸规范

| 尺寸 | 轨道尺寸 | 滑块尺寸 | 适用场景 |
| --- | --- | --- | --- |
| `default-size` | `64px × 28px` | `39px × 24px` | 默认设置项、页面主配置区 |
| `small` | `44px × 20px` | `26px × 16px` | 紧凑设置项、工具栏、窄卡片 |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，使用组件库 Switch 时，**必须**组合基础类名和尺寸类名，否则轨道尺寸与滑块位移都会失效。

| 尺寸名称 | 类名组合 | 轨道尺寸 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **Default (默认)** | `.lds-switch .lds-switch--default-size` | `64px × 28px` | 常规设置项（默认选项） |
| **Small (小号)** | `.lds-switch .lds-switch--small` | `44px × 20px` | 紧凑型设置区 |

**示例代码**：

```html
<!-- ✅ 正确：带尺寸类名 -->
<label class="lds-switch lds-switch--default-size">
  <input
    type="checkbox"
    role="switch"
    class="lds-switch__input"
    aria-label="营业状态"
  />
  <span class="lds-switch__track" aria-hidden="true">
    <span class="lds-switch__thumb"></span>
  </span>
</label>

<!-- ✅ 正确：开启状态 -->
<label class="lds-switch lds-switch--small lds-switch--checked">
  <input
    type="checkbox"
    role="switch"
    class="lds-switch__input"
    checked
    aria-label="是否置顶"
  />
  <span class="lds-switch__track" aria-hidden="true">
    <span class="lds-switch__thumb"></span>
  </span>
</label>

<!-- ❌ 错误：缺失尺寸类名，尺寸与动效位移都会异常 -->
<label class="lds-switch">
  <input type="checkbox" class="lds-switch__input" />
  <span class="lds-switch__track">
    <span class="lds-switch__thumb"></span>
  </span>
</label>
```

## 实现要点

在实现 Switch 时，请确保代码涵盖以下结构与状态：

- **结构**：根节点 `label.lds-switch` + 原生 `input` + `track` + `thumb`，不要省略内部结构。
- **状态**：默认关闭、默认开启、悬停、按下、聚焦、禁用关闭、禁用开启。
- **尺寸**：仅支持 `default-size` 和 `small` 两种尺寸；不要擅自新增“中间态尺寸”。
- **动画**：滑块通过平滑位移切换，轨道颜色同步过渡；应使用组件内置动效，不要自行覆盖成突兀的线性动画或夸张弹簧。
- **颜色**：必须使用 `life-ds-tokens.css` 中的 token，禁止硬编码轨道或滑块颜色。
- **可访问性**：使用 `role="switch"`，并确保组件有可读名称（如 `aria-label` 或配套文本标签）。
- **语义边界**：Switch 没有半选态，也不用于多选列表；涉及“部分选中”请改用 `Checkbox`。

## 兜底策略

如果模式不明确：

- 先判断这是“立即切换的布尔状态”还是“待提交的勾选项”。
- 如果是立即生效、只有开/关两态，优先使用 `Switch`。
- 如果需要批量提交、带半选态、或属于多选集合，请改用 `Checkbox`，不要发明介于二者之间的自定义控件。
