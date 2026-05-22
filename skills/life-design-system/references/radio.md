# 单选框 (Radio)

在用户需要从一组选项中**选择且只能选择一个**结果时使用单选框。`Radio` 是统一的单选基础组件，支持 `default`、`capsule` 和 `card` 三种视觉样式。

## 如何识别单选框

可能的单选框通常表现为：

- 一组选项中同一时间只能有一个被选中，通常成组出现。
- 选中态表现为圆形控件、强调描边，或卡片整体高亮，或胶囊型带有高亮描边样式。
- 常见于表单配置、模式切换、套餐选择、配送方式选择等场景。
- 标签通常是名词、状态或选项名称，而不是动作按钮文案。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的** **`<Radio>`** **组件（如果是在 React 项目中）。**
- 同一组单选必须共享同一个 `name`，保证原生单选语义、键盘导航和表单提交行为正确。
- 一般场景优先使用 `default` 类型，适合绝大部分常规表单和基础配置项。
- 需要对选项进行更强强调时，使用 `capsule` 类型，适合需要更高识别度的轻量选择。
- 更重要的选项，或用于流程主分支切换的重要节点且需要辅助说明文案时，使用 `card` 类型。
- `capsule` 是 `Radio` 的一种视觉样式，不要再单独抽象为独立组件或自行拼装按钮组。
- 保持清晰的聚焦可见性（Focus Visibility）和易于点击的操作区域。
- 选项文案应简洁明确，避免一个单选项承载过多说明性内容；信息复杂时改用 `card` 样式。

## 常见布局

- **表单项**：使用 `default` 单选，用于配送方式、发票类型、权限模式等互斥配置。
- **表单项**：使用 `capsule` 样式承载“各类单选”这类互斥筛选。
- **卡片式方案选择**：使用 `card` 样式展示标题和辅助说明，如套餐、投放模式、结算方案。
- **紧凑容器内选择**：在抽屉、弹窗或卡片内部根据空间选择 `default-size`、`small` 或 `card` 中号规格。

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Radio>` 组件，以避免尺寸、变体和状态类名遗漏问题。

```tsx
import { Radio } from '@life-ds/components-web';
import { useState } from 'react';

export function RadioExamples() {
  const [delivery, setDelivery] = useState('standard');
  const [status, setStatus] = useState('all');
  const [plan, setPlan] = useState('enterprise');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* ✅ 正确：标准单选 */}
      <Radio
        name="delivery"
        value="standard"
        label="标准配送"
        checked={delivery === 'standard'}
        onChange={() => setDelivery('standard')}
      />

      {/* ✅ 正确：胶囊样式单选 */}
      <Radio
        variant="capsule"
        size="default-size"
        name="status"
        value="all"
        label="全部"
        checked={status === 'all'}
        onChange={() => setStatus('all')}
      />

      {/* ✅ 正确：卡片样式单选 */}
      <Radio
        variant="card"
        size="large"
        name="plan"
        value="enterprise"
        label="企业版"
        description="支持更多协作成员与高级配置能力"
        checked={plan === 'enterprise'}
        onChange={() => setPlan('enterprise')}
      />

      {/* ❌ 错误：在 React 中手动拼接类名 */}
      {/* <label className="lds-radio lds-radio--default lds-radio--default-size">...</label> */}
    </div>
  );
}
```

### Radio 组件 API

| 属性            | 类型                                               | 默认值              | 说明                 |
| ------------- | ------------------------------------------------ | ---------------- | ------------------ |
| `variant`     | `'default' \| 'capsule' \| 'card'`               | `'default'`      | 单选框视觉样式            |
| `size`        | `'large' \| 'default-size' \| 'small' \| 'mini'` | `'default-size'` | 单选框尺寸              |
| `label`       | `React.ReactNode`                                | `undefined`      | 主文案内容              |
| `description` | `React.ReactNode`                                | `undefined`      | 辅助文案，仅 `card` 样式使用 |
| `name`        | `string`                                         | `undefined`      | 同一组单选必须保持一致        |
| `value`       | `string`                                         | `undefined`      | 当前选项对应值            |
| `checked`     | `boolean`                                        | `undefined`      | 受控选中态              |
| `disabled`    | `boolean`                                        | `false`          | 是否禁用               |
| `onChange`    | `(e) => void`                                    | `undefined`      | 选中状态变化回调           |

***

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，使用组件库单选框时，除了指定样式变体（如 `.lds-radio--default`），**必须**组合对应的尺寸类名，否则会导致控件尺寸和布局不符合设计稿。

| 样式类型        | 类名组合                                                      | 适用场景       |
| :---------- | :-------------------------------------------------------- | :--------- |
| **Default** | `.lds-radio .lds-radio--default .lds-radio--default-size` | 绝大部分常规表单场景 |
| **Capsule** | `.lds-radio .lds-radio--capsule .lds-radio--default-size` | 横向互斥筛选     |
| **Card**    | `.lds-radio .lds-radio--card .lds-radio--default-size`    | 方案/模式选择    |

**示例代码**：

```html
<!-- ✅ 正确：带变体和尺寸类名 -->
<label class="lds-radio lds-radio--default lds-radio--default-size">
  <input class="lds-radio__input" type="radio" name="delivery" value="standard" checked />
  <span class="lds-radio__visual">
    <span class="lds-radio__control" aria-hidden="true">
      <span class="lds-radio__dot"></span>
    </span>
    <span class="lds-radio__content">
      <span class="lds-radio__label">标准配送</span>
    </span>
  </span>
</label>

<!-- ❌ 错误：缺失变体/尺寸类名，样式不完整 -->
<label class="lds-radio">
  <input type="radio" name="delivery" value="standard" />
  <span>标准配送</span>
</label>
```

## 实现要点

在实现单选框时，请确保代码涵盖以下状态：

- 默认 (Default)
- 悬停 (Hover)
- 聚焦 (Focus)
- 选中 (Checked)
- 选中-悬停 (Checked Hover)
- 禁用 (Disabled)
- 选中-禁用 (Checked Disabled)

补充约束：

- `default` 样式需对齐 Figma 尺寸：`large/default-size/small` 分别对应 `24/20/16px` 控件规格。
- `capsule` 样式需保持胶囊圆角、边框和选中态文字强调，不要将其实现成按钮语义。
- `card` 样式宽度为 180px，圆角 16px，大号内边距为 `16px`，默认中号为 `12px 16px`。
- 所有颜色必须使用 design tokens，禁止硬编码颜色值。
- 必须基于原生 `<input type="radio">` 实现，保证无障碍与表单语义正确。

## 兜底策略

如果模式不明确：

- 优先选择符合信息密度的最简单样式：简单选项用 `default`，轻量筛选用 `capsule`，说明性选项用 `card`。
- 保留原始界面的单选意图，不要误用成 Tabs、Button 或 Checkbox。
- 除非流程明确要求，否则避免发明自定义单选行为或额外交互反馈。

