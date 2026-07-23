# 时间选择器 (TimePicker)

在用户需要录入**单个时间**或**时间区间**，并将结果作为表单字段值、配置值或通用输入值保存时使用 `TimePicker`。

> `TimePicker` 与 `FilterTimePicker` 的使用边界必须严格区分：
>
> - `TimePicker`：用于 **Form / Drawer / Dialog / 设置面板 / 通用字段录入**
> - `FilterTimePicker`：用于 **Filter / FilterGroup / 列表查询条件区**
>
> 不要把表单字段误做成 `FilterTimePicker`，也不要把筛选条件误做成 `TimePicker`。

## 如何识别时间选择器

可能的 `TimePicker` 通常表现为：

- 一个带圆角描边的输入型触发器，右侧有时间图标。
- 默认展示占位文案，选中后展示格式化时间，例如 `09:30`、`18:36`。
- 点击后弹出时间面板，通过点击时间列中的时 / 分项完成选择。
- 常出现在表单字段、抽屉编辑区、配置弹窗、营业时段设置区。
- 在区间场景中，触发器会展示开始时间和结束时间，中间使用 `~` 作为分隔符。
- 出错时，控件自身切换为红色错误描边，并在下方出现错误文案。

## 最佳实践

- **优先使用 `@life-ds/components-web` 组件库中的 `<TimePicker>` 组件（如果是在 React 项目中）。**
- 在表单场景中，优先把 `TimePicker` 放进 `FormItem` 中，通过 `FormItem` 统一承载 `description` 和 `error`。
- 单时间和时间区间使用同一个组件，通过 `picker="time"` / `picker="range"` 区分，不要拆成两套平行实现。
- `TimePicker` 适用于**录入和保存字段值**；如果是列表筛选条件，请改用 `FilterTimePicker`。
- 单时间面板沿用 `FilterTimePicker` 的双列时间滚动列表，避免另起一套面板样式。
- 时间区间场景下，开始值和结束值之间的分隔符固定为 `~`，不要改回 `-` 或自定义文案。
- 时间区间弹层应拆成“开始时间 / 结束时间”两个半区，各自包含时 / 分两列，标题在各自区域内居中。
- 在 `Form` 中使用时，优先传 `width="100%"`，使其和 `Input` / `Select` / `DatePicker` 一样适应父级宽度。

## 相似组件区分

- **`TimePicker`**：用于**标准录入场景**，例如表单字段、配置项、营业时间设置、预约时间录入。
- **`FilterTimePicker`**：用于 **`Filter` / `FilterGroup`** 体系内的筛选场景，例如列表筛选栏、查询条件区。
- 如果结果会被保存、提交或作为字段值参与表单校验，使用 `TimePicker`。
- 如果结果只用于影响列表查询结果或过滤条件，使用 `FilterTimePicker`。
- 不要在 `Form` 中使用 `FilterTimePicker`，也不要在筛选栏中使用 `TimePicker`。

## 常见布局

- **标准表单项**：左侧标题，右侧为单时间或时间区间选择器，下方带说明或错误文案。
- **营业时段区间**：开始时间和结束时间合并在同一个区间触发器中，中间为 `~` 分隔。
- **配置弹窗 / 抽屉**：用于选择开始时间、截止时间、营业时间、预约时间段等。
- **带中间态的区间**：开始时间已选、结束时间仍占位，便于用户继续补全结束值。

```tsx
// ✅ 推荐：表单中的单时间字段
<FormItem label="开始时间" required error={!time ? '请选择开始时间' : undefined}>
  <TimePicker width="100%" value={time} onChange={setTime} aria-label="开始时间" />
</FormItem>

// ✅ 推荐：表单中的时间区间字段
<FormItem label="营业时段">
  <TimePicker
    width="100%"
    picker="range"
    value={timeRange}
    onChange={setTimeRange}
    aria-label="营业时段"
  />
</FormItem>

// ❌ 不推荐：把筛选条件误做成 TimePicker
<TimePicker picker="time" placeholder="请选择查询时间" />
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `.lds-time-picker` DOM 结构**，必须使用 `@life-ds/components-web` 包提供的 `<TimePicker>` 组件，以避免尺寸、错误态、区间触发器和弹层结构遗漏。

```tsx
import React from 'react';
import { Form, FormItem, TimePicker } from '@life-ds/components-web';

export function TimePickerExamples() {
  const [time, setTime] = React.useState<string | null>(null);
  const [timeRange, setTimeRange] = React.useState<[string | null, string | null]>([
    '09:30',
    '18:30',
  ]);

  return (
    <Form labelWidth={90}>
      <FormItem label="开始时间" required error={!time ? '请选择开始时间' : undefined}>
        <TimePicker
          width="100%"
          size="default-size"
          value={time}
          onChange={(nextValue) => setTime(nextValue as string | null)}
          aria-label="开始时间"
        />
      </FormItem>

      <FormItem label="营业时段" description="支持单独选择开始时间后，再继续补全结束时间">
        <TimePicker
          width="100%"
          picker="range"
          size="default-size"
          value={timeRange}
          onChange={(nextValue) =>
            setTimeRange(nextValue as [string | null, string | null])
          }
          aria-label="营业时段"
        />
      </FormItem>
    </Form>
  );
}

// ❌ 错误：在 React 中手动拼装类名和面板结构
<button className="lds-select lds-time-picker lds-select--default-size">请选择时间</button>
```

### TimePicker 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `picker` | `'time' \| 'range'` | `'time'` | 选择器类型，单时间或时间区间 |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 触发器尺寸 |
| `placeholder` | `React.ReactNode` | `'请选择'` | 单时间模式下的占位内容 |
| `rangePlaceholder` | `[React.ReactNode, React.ReactNode]` | `['开始时间', '结束时间']` | 区间模式下的开始 / 结束占位内容 |
| `width` | `number \| string` | `360` | 触发器宽度，默认 `360px`，业务可覆盖，数字按 px 处理 |
| `value` | `string \| [string \| null, string \| null] \| null` | `undefined` | 受控值 |
| `defaultValue` | `string \| [string \| null, string \| null] \| null` | `undefined` | 非受控默认值 |
| `open` | `boolean` | `undefined` | 受控展开态 |
| `defaultOpen` | `boolean` | `false` | 非受控默认展开态 |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | 展开态回调 |
| `onChange` | `(value: TimePickerValue) => void` | `undefined` | 选中值变化回调 |
| `panelWidth` | `number \| string` | 单时间跟随内容宽度，区间跟随双半区内容宽度 | 显式指定面板宽度 |
| `isFocused` | `boolean` | `false` | 强制展示激活态，常用于文档页 / 受控外观 |
| `error` | `boolean` | 继承 `FormItem` | 是否展示错误描边 |
| `hourStep` | `number` | `1` | 小时列步进，例如 `2` 表示 `00 / 02 / 04 ...` |
| `minuteStep` | `number` | `1` | 分钟列步进，例如 `5` 表示 `00 / 05 / 10 ...` |

### TimePickerValue

| 类型 | 说明 |
| --- | --- |
| `string \| null` | `picker="time"` 时的值，例如 `09:30` |
| `[string \| null, string \| null]` | `picker="range"` 时的值，第一项为开始时间，第二项为结束时间 |

### 尺寸规范

| 尺寸 | 高度 | 圆角 | 文本规格 | 右侧图标 |
| --- | --- | --- | --- | --- |
| `large` | `48px` | `12px` | `subtitle/regular` | `20px` |
| `default-size` | `40px` | `12px` | `body/regular` | `20px` |
| `small` | `36px` | `10px` | `body/regular` | `20px` |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中使用 `TimePicker` 时，**必须**完整组合触发器和弹层相关类名；如果只写一个 `.lds-time-picker` 外壳，会缺失尺寸、错误态和弹层结构。

| 区块 | 类名 | 说明 |
| --- | --- | --- |
| 触发器 | `.lds-select .lds-time-picker .lds-select--large/default-size/small` | 时间选择器根节点 |
| 区间值容器 | `.lds-time-picker__range` | 区间模式下的值区 |
| 开始 / 结束值 | `.lds-time-picker__range-value` | 时间或占位内容 |
| 分隔符 | `.lds-time-picker__range-separator` | 固定展示 `~` |
| 单时间面板 | `.lds-filter-time-picker` | 单时间面板结构，沿用筛选时间面板 |
| 区间面板 | `.lds-time-picker__range-panel` | 时间区间双半区面板结构 |
| 区间半区 | `.lds-time-picker__range-section` | 开始时间 / 结束时间半区 |
| 半区标题 | `.lds-time-picker__range-section-header` | 各半区标题，需在区域内居中 |

**示例代码**：

```html
<!-- ✅ 正确：单时间触发器带尺寸类名 -->
<button class="lds-select lds-time-picker lds-select--default-size" type="button">
  <span class="lds-select__value">请选择时间</span>
  <span class="lds-select__icon" aria-hidden="true">
    <svg class="icon" width="20" height="20"><use href="#ic-time-round-line" /></svg>
  </span>
</button>

<!-- ✅ 正确：区间触发器 -->
<button class="lds-select lds-time-picker lds-time-picker--range lds-select--default-size" type="button">
  <span class="lds-select__value lds-time-picker__range">
    <span class="lds-time-picker__range-value">09:30</span>
    <span class="lds-time-picker__range-separator">~</span>
    <span class="lds-time-picker__range-value">18:30</span>
  </span>
  <span class="lds-select__icon" aria-hidden="true">
    <svg class="icon" width="20" height="20"><use href="#ic-time-round-line" /></svg>
  </span>
</button>

<!-- ❌ 错误：缺失尺寸类名 -->
<button class="lds-select lds-time-picker" type="button">请选择时间</button>
```

## 实现要点

在实现 `TimePicker` 时，请确保覆盖以下结构与状态：

- **状态覆盖**：默认、悬停、激活 / 展开、已选、错误、禁用、禁用且已选。
- **场景边界**：通用字段录入使用 `TimePicker`，查询筛选使用 `FilterTimePicker`。
- **区间结构**：区间模式触发器中，开始时间和结束时间需占满剩余宽度，中间固定用 `~` 分隔。
- **单时间面板**：沿用 `FilterTimePicker` 的双列时 / 分滚动列表，保证视觉和交互一致。
- **区间面板**：使用左右双半区布局，左侧为开始时间、右侧为结束时间，每个半区内包含时 / 分两列。
- **区间中间态**：允许开始时间已选、结束时间仍占位，不要在用户未选结束时间时强行补齐结束值。
- **合法顺序**：当结束时间早于开始时间时，应自动收敛为合法顺序，避免出现无效时间区间。
- **错误优先级**：错误态应覆盖普通描边色；在 `FormItem` 中使用时，可直接继承错误上下文。
- **可访问性**：触发器应具备明确的无障碍名称（如 `aria-label`），时间项按钮保持可聚焦。

## 兜底策略

如果模式不明确：

- 如果这是表单字段或通用配置项，优先使用 `TimePicker`。
- 如果这是列表筛选、查询条件、顶部过滤栏，优先使用 `FilterTimePicker`。
- 如果需要秒级粒度、跨天区间或复杂排期能力，请明确标记当前 `TimePicker` 仅覆盖时 / 分和时间区间，再评估是否扩展现有能力。
