# 日期选择器 (DatePicker)

在用户需要录入**单个日期**或**日期区间**，并将结果作为表单字段值、配置值或通用输入值保存时使用 `DatePicker`。

> `DatePicker` 与 `FilterDatePicker` 的使用边界必须严格区分：
>
> - `DatePicker`：用于 **Form / Drawer / Dialog / 设置面板 / 通用字段录入**
> - `FilterDatePicker`：用于 **Filter / FilterGroup / 列表查询条件区**
>
> 不要把表单字段误做成 `FilterDatePicker`，也不要把筛选条件误做成 `DatePicker`。

## 如何识别日期选择器

可能的 `DatePicker` 通常表现为：

- 一个带圆角描边的输入型触发器，右侧有日历图标。
- 默认展示占位文案，选中后展示格式化日期。
- 点击后弹出日期面板，通过点击日历格子完成选择。
- 常出现在表单字段、抽屉编辑区、配置弹窗、有效期设置区。
- 在区间场景中，触发器会展示两个日期，中间使用 `~` 作为分隔符。
- 出错时，控件自身切换为红色错误描边，并在下方出现错误文案。

## 最佳实践

- **优先使用 `@life-ds/components-web` 组件库中的 `<DatePicker>` 组件（如果是在 React 项目中）。**
- 在表单场景中，优先把 `DatePicker` 放进 `FormItem` 中，通过 `FormItem` 统一承载 `description` 和 `error`。
- 单日期和区间日期使用同一个组件，通过 `picker="date"` / `picker="range"` 区分，不要拆成两套平行实现。
- `DatePicker` 适用于**录入和保存字段值**；如果是列表筛选条件，请改用 `FilterDatePicker`。
- 单日期面板样式与筛选日期面板保持一致，区间面板使用双月布局，并保留四箭头年月导航。
- 区间场景下，开始值和结束值之间的分隔符固定为 `~`，不要改回 `-` 或自定义文案。
- 当业务有最大可选范围限制时，优先使用 `maxRangeDays`，不要在业务层手写一套区间禁用逻辑。
- 在 `Form` 中使用时，优先传 `width="100%"`，使其和 `Input` / `Select` 一样适应父级宽度。

## 相似组件区分

- **`DatePicker`**：用于**标准录入场景**，例如表单字段、配置项、有效期设置、活动时间配置。
- **`FilterDatePicker`**：用于 **`Filter` / `FilterGroup`** 体系内的筛选场景，例如列表筛选栏、查询条件区。
- 如果结果会被保存、提交或作为字段值参与表单校验，使用 `DatePicker`。
- 如果结果只用于影响列表查询结果或过滤条件，使用 `FilterDatePicker`。
- 不要在 `Form` 中使用 `FilterDatePicker`，也不要在筛选栏中使用 `DatePicker`。

## 常见布局

- **标准表单项**：左侧标题，右侧为单日期或日期区间选择器，下方带说明或错误文案。
- **有效期区间**：开始日期和结束日期合并在同一个区间触发器中，中间为 `~` 分隔。
- **配置弹窗 / 抽屉**：用于选择生效日期、活动周期、预约时间范围等。
- **带最大范围限制的区间**：例如“最多可选 7 天”或“最多可选 31 天”的有效周期设置。

```tsx
// ✅ 推荐：表单中的单日期字段
<FormItem label="生效日期" required error={!date ? '请选择生效日期' : undefined}>
  <DatePicker width="100%" value={date} onChange={setDate} aria-label="生效日期" />
</FormItem>

// ✅ 推荐：表单中的日期区间字段
<FormItem label="有效周期">
  <DatePicker
    width="100%"
    picker="range"
    value={range}
    onChange={setRange}
    maxRangeDays={31}
    aria-label="有效周期"
  />
</FormItem>

// ❌ 不推荐：把筛选条件误做成 DatePicker
<DatePicker picker="date" placeholder="请选择查询日期" />
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `.lds-date-picker` DOM 结构**，必须使用 `@life-ds/components-web` 包提供的 `<DatePicker>` 组件，以避免尺寸、错误态、区间面板和日期禁用逻辑遗漏。

```tsx
import React from 'react';
import { DatePicker, Form, FormItem } from '@life-ds/components-web';

export function DatePickerExamples() {
  const [date, setDate] = React.useState<Date | null>(null);
  const [range, setRange] = React.useState<[Date | null, Date | null]>([
    new Date(2026, 4, 4),
    new Date(2026, 4, 12),
  ]);

  return (
    <Form labelWidth={90}>
      <FormItem label="生效日期" required error={!date ? '请选择生效日期' : undefined}>
        <DatePicker
          width="100%"
          size="default-size"
          value={date}
          onChange={(nextValue) => setDate(nextValue as Date | null)}
          aria-label="生效日期"
        />
      </FormItem>

      <FormItem label="有效周期" description="最多可选 31 天">
        <DatePicker
          width="100%"
          picker="range"
          size="default-size"
          value={range}
          onChange={(nextValue) =>
            setRange(nextValue as [Date | null, Date | null])
          }
          maxRangeDays={31}
          aria-label="有效周期"
        />
      </FormItem>
    </Form>
  );
}

// ❌ 错误：在 React 中手动拼装类名和面板结构
<button className="lds-select lds-date-picker lds-select--default-size">请选择日期</button>
```

### DatePicker 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `picker` | `'date' \| 'range'` | `'date'` | 选择器类型，单日期或日期区间 |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 触发器尺寸 |
| `placeholder` | `React.ReactNode` | `'请选择'` | 单日期模式下的占位内容 |
| `rangePlaceholder` | `[React.ReactNode, React.ReactNode]` | `['开始日期', '结束日期']` | 区间模式下的开始 / 结束占位内容 |
| `width` | `number \| string` | `360` | 触发器宽度，默认 `360px`，业务可覆盖，数字按 px 处理 |
| `value` | `Date \| [Date \| null, Date \| null] \| null` | `undefined` | 受控值 |
| `defaultValue` | `Date \| [Date \| null, Date \| null] \| null` | `undefined` | 非受控默认值 |
| `open` | `boolean` | `undefined` | 受控展开态 |
| `defaultOpen` | `boolean` | `false` | 非受控默认展开态 |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | 展开态回调 |
| `onChange` | `(value: DatePickerValue) => void` | `undefined` | 选中值变化回调 |
| `panelWidth` | `number \| string` | 单日期 `380`，区间 `740` | 显式指定面板宽度 |
| `isFocused` | `boolean` | `false` | 强制展示激活态，常用于文档页 / 受控外观 |
| `error` | `boolean` | 继承 `FormItem` | 是否展示错误描边 |
| `disabledDate` | `(date: Date) => boolean` | `undefined` | 自定义日期禁用逻辑 |
| `maxRangeDays` | `number` | `undefined` | 区间模式下允许选择的最大天数，超出后自动禁用 |

### DatePickerValue

| 类型 | 说明 |
| --- | --- |
| `Date \| null` | `picker="date"` 时的值 |
| `[Date \| null, Date \| null]` | `picker="range"` 时的值，第一项为开始日期，第二项为结束日期 |

### 尺寸规范

| 尺寸 | 高度 | 圆角 | 文本规格 | 右侧图标 |
| --- | --- | --- | --- | --- |
| `large` | `48px` | `12px` | `subtitle/regular` | `20px` |
| `default-size` | `40px` | `12px` | `body/regular` | `20px` |
| `small` | `36px` | `10px` | `body/regular` | `20px` |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中使用 `DatePicker` 时，**必须**完整组合触发器和弹层相关类名；如果只写一个 `.lds-date-picker` 外壳，会缺失尺寸、错误态和弹层结构。

| 区块 | 类名 | 说明 |
| --- | --- | --- |
| 触发器 | `.lds-select .lds-date-picker .lds-select--large/default-size/small` | 日期选择器根节点 |
| 区间值容器 | `.lds-date-picker__range` | 区间模式下的值区 |
| 开始 / 结束值 | `.lds-date-picker__range-value` | 日期或占位内容 |
| 分隔符 | `.lds-date-picker__range-separator` | 固定展示 `~` |
| 面板容器 | `.lds-filter-date-picker__popover` / `.lds-date-picker__range-popover` | 弹层容器 |
| 单日期面板 | `.lds-filter-date-picker` | 单日期面板结构 |
| 区间面板 | `.lds-date-picker__range-panel` | 双月区间面板结构 |

**示例代码**：

```html
<!-- ✅ 正确：单日期触发器带尺寸类名 -->
<button class="lds-select lds-date-picker lds-select--default-size" type="button">
  <span class="lds-select__value">请选择日期</span>
  <span class="lds-select__icon" aria-hidden="true">
    <svg class="icon" width="20" height="20"><use href="#ic-calendar-line" /></svg>
  </span>
</button>

<!-- ✅ 正确：区间触发器 -->
<button class="lds-select lds-date-picker lds-date-picker--range lds-select--default-size" type="button">
  <span class="lds-select__value lds-date-picker__range">
    <span class="lds-date-picker__range-value">2026/05/04</span>
    <span class="lds-date-picker__range-separator">~</span>
    <span class="lds-date-picker__range-value">2026/05/12</span>
  </span>
  <span class="lds-select__icon" aria-hidden="true">
    <svg class="icon" width="20" height="20"><use href="#ic-calendar-line" /></svg>
  </span>
</button>

<!-- ❌ 错误：缺失尺寸类名 -->
<button class="lds-select lds-date-picker" type="button">请选择日期</button>
```

## 实现要点

在实现 `DatePicker` 时，请确保覆盖以下结构与状态：

- **状态覆盖**：默认、悬停、激活 / 展开、已选、错误、禁用、禁用且已选。
- **场景边界**：通用字段录入使用 `DatePicker`，查询筛选使用 `FilterDatePicker`。
- **区间结构**：区间模式触发器中，开始日期和结束日期需占满剩余宽度，中间固定用 `~` 分隔。
- **区间面板**：使用双月布局，标题分别在各自月份区域内居中，并保留四箭头年月切换能力。
- **范围限制**：当传入 `maxRangeDays` 时，第一天选定后，超出范围的日期应自动禁用。
- **重复占位处理**：双月区间面板中，前后月份重叠出来的占位日期不应参与选中态和区间背景计算。
- **错误优先级**：错误态应覆盖普通描边色；在 `FormItem` 中使用时，可直接继承错误上下文。
- **可访问性**：触发器应具备明确的无障碍名称（如 `aria-label`），按钮和日历格子都应保持可聚焦。

## 兜底策略

如果模式不明确：

- 如果这是表单字段或通用配置项，优先使用 `DatePicker`。
- 如果这是列表筛选、查询条件、顶部过滤栏，优先使用 `FilterDatePicker`。
- 如果需要时间、时分秒或复杂排期能力，请明确标记当前 `DatePicker` 仅覆盖日期和日期区间，再评估是否组合 `TimePicker` 或扩展现有能力。
