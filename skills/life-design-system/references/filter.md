# 筛选器 (Filter)

在用户需要缩小数据范围、查找特定内容或根据条件控制列表/表格结果时使用筛选器。

当前 `@life-ds/components-web` 中与筛选相关的核心组件包括：

- `Filter`：基础筛选触发器 / 输入态组件
- `FilterSelect`：基于 `Filter + Popover` 的单选下拉筛选
- `FilterDatePicker`：基于 `Filter + Popover` 的单日期筛选
- `FilterTimePicker`：基于 `Filter + Popover` 的时间筛选
- `FilterGroup`：筛选区容器，负责布局和查询 / 重置操作

## 默认选择

在绝大多数页面中，优先使用 `FilterGroup` 作为筛选容器，并在内部组合以下组件：

- 关键词输入：使用 `Filter type="input"`
- 单选下拉：使用 `FilterSelect`
- 日期选择：使用 `FilterDatePicker`
- 时间选择：使用 `FilterTimePicker`

不要在业务代码里直接把 `Filter type="select" | "date" | "time"` 当作完整可交互选择器来使用。`Filter` 本身是触发器外观，不负责弹层内容。

## 何时需要“查询 / 重置”

- 当筛选项数量 **小于等于 3 个** 时：一般 **不配置** “查询 / 重置”按钮，筛选值变更后可直接触发刷新。
- 当筛选项数量 **较多** 或请求成本较高时：才配置“查询 / 重置”，避免频繁请求。

## 如何识别筛选器

可能的筛选器通常表现为：

- 位于列表、表格或卡片区顶部的一组条件控件。
- 由“字段标题 + 当前值 / 占位文案 + 右侧图标”组成的胶囊形触发器。
- 常见字段包括“状态”“日期”“时间”“类型”“门店”“关键词”等。
- 选中后，触发器文案会变为已选值，但右侧图标保持稳定，不因有值而变色。

## 最佳实践

- **优先使用 `FilterGroup` 承载多个筛选项，不要手写 grid / 间距。**
- **关键词输入使用 `Filter type="input"`；可展开的选择器使用 `FilterSelect` / `FilterDatePicker` / `FilterTimePicker`。**
- `Filter` 是基础单元，不要手工拼装 `.lds-filter` DOM 结构和类名。
- 默认只展示高频筛选项，将次要条件收纳到“展开 / 高级筛选”中。
- 筛选值变更后是否立即查询，由业务层决定；组件本身只负责值和交互。
- 下拉面板 / 日期面板 / 时间面板统一通过内部 `Popover` 承载，避免每个业务自己造浮层。
- 选项很多时，优先在具体筛选组件中补搜索，而不是在业务层拼接自定义弹层。

## 常见布局

- **基础过滤栏**：位于列表 / 表格顶部，通常包含 1-3 个高频筛选项和一个主操作按钮。
- **带查询按钮的筛选栏**：条件较多时，在 `FilterGroup` 右侧带“查询 / 重置”。
- **高级筛选面板**：以 Drawer / Dialog 承载更多低频筛选项。
- **表头内嵌筛选**：表头筛选图标点击后弹出专属筛选面板，仍建议沿用已有 `Popover` 能力。

## React 组件用法（推荐）

在 React 项目中，优先使用已封装组件，不要自己手写按钮 + 浮层 + 日历 / 时间列表。

```tsx
import React, { useState } from 'react';
import {
  Filter,
  FilterDatePicker,
  FilterGroup,
  FilterSelect,
  FilterTimePicker,
} from '@life-ds/components-web';

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '进行中', value: 'running' },
  { label: '已结束', value: 'finished' },
];

export function FilterGroupDemo() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>();

  return (
    <FilterGroup>
      <Filter
        type="input"
        label="关键词"
        placeholder="请输入"
        value={keyword}
        onChange={setKeyword}
      />
      <FilterSelect
        label="状态"
        placeholder="请选择"
        value={status}
        options={statusOptions}
        onChange={(nextValue) => setStatus(nextValue)}
      />
      <FilterDatePicker
        label="日期"
        placeholder="请选择"
        value={date}
        onChange={setDate}
      />
      <FilterTimePicker
        label="时间"
        placeholder="请选择"
        value={time}
        onChange={setTime}
      />
    </FilterGroup>
  );
}
```

## React 示例（筛选项较多，带“查询 / 重置”）

```tsx
import React, { useState } from 'react';
import {
  Filter,
  FilterDatePicker,
  FilterGroup,
  FilterSelect,
  FilterTimePicker,
} from '@life-ds/components-web';

export function FilterGroupWithActionsDemo() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<string>();
  const [type, setType] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>();

  return (
    <FilterGroup
      onQuery={() => {}}
      onReset={() => {
        setKeyword('');
        setStatus(undefined);
        setType(undefined);
        setDate(null);
        setTime(undefined);
      }}
    >
      <Filter
        type="input"
        label="关键词"
        placeholder="请输入"
        value={keyword}
        onChange={setKeyword}
      />
      <FilterSelect
        label="状态"
        placeholder="请选择"
        value={status}
        onChange={(nextValue) => setStatus(nextValue)}
        options={[
          { label: '全部状态', value: 'all' },
          { label: '进行中', value: 'running' },
          { label: '已结束', value: 'finished' },
        ]}
      />
      <FilterSelect
        label="类型"
        placeholder="请选择"
        value={type}
        onChange={(nextValue) => setType(nextValue)}
        options={[
          { label: '全部类型', value: 'all' },
          { label: '团购', value: 'group' },
          { label: '代金券', value: 'voucher' },
        ]}
      />
      <FilterDatePicker
        label="日期"
        placeholder="请选择"
        value={date}
        onChange={setDate}
      />
      <FilterTimePicker
        label="时间"
        placeholder="请选择"
        value={time}
        onChange={setTime}
      />
    </FilterGroup>
  );
}
```

## Filter 组件 API

`Filter` 是基础筛选外观组件，支持输入态和按钮态两类模式。

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `type` | `'input' \| 'select' \| 'date' \| 'time'` | - | 筛选器类型 |
| `label` | `React.ReactNode` | - | 左侧字段标题 |
| `placeholder` | `React.ReactNode` | `undefined` | 未填写时展示 |
| `size` | `'default-size' \| 'small'` | `'default-size'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `isActive` | `boolean` | `false` | 强制激活态，常用于文档页或受控外观 |
| `rightIcon` | `React.ReactNode` | 按 `type` 自动匹配 | 覆盖右侧图标 |
| `width` | `number \| string` | `294` | 组件宽度，数字按 px 处理 |
| `value` | `string \| React.ReactNode` | `undefined` | 当前值 |

补充说明：

- `type="input"` 时渲染输入框，`onChange` 签名为 `(value, event) => void`
- `type="select" | "date" | "time"` 时渲染按钮态触发器，本身不包含下拉 / 日期 / 时间面板
- 有值时仅文字切换为主色，**右侧 icon 始终保持统一颜色，不因有值变色**

## FilterSelect 组件 API

`FilterSelect` 是推荐的单选下拉筛选组件，内部使用 `Filter type="select"` 作为 trigger，并通过 `Popover` 承载选项面板。

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `React.ReactNode` | - | 左侧字段标题 |
| `placeholder` | `React.ReactNode` | `'请选择'` | 未选择时展示 |
| `size` | `'default-size' \| 'small'` | `'default-size'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `isActive` | `boolean` | `false` | 强制 trigger 激活态 |
| `filterClassName` | `string` | `undefined` | 透传给内部 `Filter` 的类名 |
| `width` | `number \| string` | `294` | trigger 宽度 |
| `value` | `string` | `undefined` | 受控值 |
| `defaultValue` | `string` | `undefined` | 非受控默认值 |
| `options` | `FilterSelectOption[]` | - | 选项列表 |
| `open` | `boolean` | `undefined` | 受控展开态 |
| `defaultOpen` | `boolean` | `false` | 非受控默认展开态 |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | 展开态回调 |
| `onChange` | `(value, option) => void` | `undefined` | 选中回调 |
| `matchTriggerWidth` | `boolean` | `true` | 面板宽度是否跟随 trigger |
| `panelWidth` | `number \| string` | `undefined` | 显式指定面板宽度 |

`FilterSelectOption`：

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `label` | `React.ReactNode` | 文案 |
| `value` | `string` | 值 |
| `iconName` | `string` | 可选左侧图标 |
| `disabled` | `boolean` | 是否禁用 |

## FilterDatePicker 组件 API

`FilterDatePicker` 是推荐的日期筛选组件，当前为单日期选择。

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `React.ReactNode` | - | 左侧字段标题 |
| `placeholder` | `React.ReactNode` | `'请选择'` | 未选择时展示 |
| `size` | `'default-size' \| 'small'` | `'default-size'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `isActive` | `boolean` | `false` | 强制 trigger 激活态 |
| `filterClassName` | `string` | `undefined` | 透传给内部 `Filter` 的类名 |
| `width` | `number \| string` | `294` | trigger 宽度 |
| `value` | `Date \| null` | `undefined` | 受控值 |
| `defaultValue` | `Date \| null` | `null` | 非受控默认值 |
| `open` | `boolean` | `undefined` | 受控展开态 |
| `defaultOpen` | `boolean` | `false` | 非受控默认展开态 |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | 展开态回调 |
| `onChange` | `(value: Date) => void` | `undefined` | 选中日期回调 |
| `disabledDate` | `(date: Date) => boolean` | `undefined` | 自定义禁用日期 |

当前实现说明：

- 使用 `YYYY.MM.DD` 格式回显到 trigger
- 支持月份切换、年份切换、跨月日期灰显
- 日期网格单元尺寸为 `44 * 44`，网格间距为 `4`
- 当前是**单日期选择**，暂不包含范围选择、快捷项、年月面板切换

## FilterTimePicker 组件 API

`FilterTimePicker` 是推荐的时间筛选组件，当前为双列时 / 分选择。

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `label` | `React.ReactNode` | - | 左侧字段标题 |
| `placeholder` | `React.ReactNode` | `'请选择'` | 未选择时展示 |
| `size` | `'default-size' \| 'small'` | `'default-size'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `isActive` | `boolean` | `false` | 强制 trigger 激活态 |
| `filterClassName` | `string` | `undefined` | 透传给内部 `Filter` 的类名 |
| `width` | `number \| string` | `294` | trigger 宽度 |
| `value` | `string` | `undefined` | 受控值，格式如 `09:30` |
| `defaultValue` | `string` | `undefined` | 非受控默认值 |
| `open` | `boolean` | `undefined` | 受控展开态 |
| `defaultOpen` | `boolean` | `false` | 非受控默认展开态 |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | 展开态回调 |
| `onChange` | `(value: string) => void` | `undefined` | 选中时间回调 |
| `hourStep` | `number` | `1` | 小时步长 |
| `minuteStep` | `number` | `1` | 分钟步长 |

当前实现说明：

- 使用双列结构，左列小时、右列分钟
- 两列滚动区域相互独立
- 单个时间 cell 尺寸为 `44 * 32`
- 面板高度约展示 8 个 cell
- 当前为**时 / 分选择**，暂不包含秒、滚轮选时、自动滚动到已选项

## 注意事项

- 默认用 `FilterGroup` 做容器，不要自己写 `display: grid` / `grid-template-columns` 去拼筛选区。
- `Filter` 是基础触发器，不要误把它当作完整选择器使用。
- `FilterSelect` / `FilterDatePicker` / `FilterTimePicker` 已经封装好了 `Popover`，业务层不要再额外包一层自定义浮层。
- “查询 / 重置”仅在筛选项较多时启用；小于等于 3 个筛选项时一般不需要操作按钮。

```tsx
// ❌ 不推荐：把基础 Filter 当作完整的下拉选择器使用
<Filter type="select" label="状态" placeholder="请选择" onClick={() => {}} />

// ✅ 推荐：直接使用已封装的交互组件
<FilterSelect
  label="状态"
  placeholder="请选择"
  options={[
    { label: '全部状态', value: 'all' },
    { label: '进行中', value: 'running' },
  ]}
/>
```

```html
<!-- ❌ 禁止：React 项目不要手工拼装 .lds-filter DOM / 类名 -->
<div class="lds-filter">...</div>
```

## 实现要点

在实现筛选器时，请确保覆盖以下状态：

- 默认 / 未选择
- 悬停
- 聚焦 / 展开
- 已选择 / 激活
- 禁用
- 面板中的选中项状态
- 选项加载中
- 无匹配结果

补充要求：

- `Filter` 右侧 icon 颜色应保持稳定，不因已有值而切换主色。
- 日期和时间触发器的激活态优先由展开状态或 `isActive` 控制，而不是通过默认展开面板来伪造状态。
- 如果下拉项很多，需要在具体筛选组件上扩展搜索或异步加载能力，不要在页面层重复造轮子。

## 兜底策略

如果模式不明确：

- 关键词筛选优先使用 `Filter type="input"`。
- 单选筛选优先使用 `FilterSelect`。
- 日期筛选优先使用 `FilterDatePicker`。
- 时间筛选优先使用 `FilterTimePicker`。
- 只有在现有组件无法覆盖业务需求时，才考虑基于现有 `Popover` 继续扩展，而不是从零发明新的筛选交互模型。
