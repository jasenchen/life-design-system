# 选择器 (Select)

在用户需要从一组离散选项中**选择单个结果**，并将该结果作为表单字段值、配置项值或通用输入值保存时使用 `Select`。

> `Select` 与 `FilterSelect` 的使用边界必须严格区分：
>
> - `Select`：用于 **Form / Drawer / Dialog / 设置面板 / 通用字段录入** 等场景
> - `FilterSelect`：用于 **FilterGroup / 列表筛选栏 / 查询条件区**
>
> 不要把表单字段误做成 `FilterSelect`，也不要把筛选器误做成 `Select`。

## 如何识别选择器

可能的 `Select` 通常表现为：

- 一个带圆角描边的输入型触发器，右侧有向下箭头。
- 默认展示占位文案，选中后展示当前值。
- 点击后弹出下拉面板，从多个离散选项中选择一个。
- 常出现在表单字段、设置项、抽屉编辑区或弹窗配置区中。
- 出错时，控件自身切换为红色错误描边，并在下方出现错误文案。

## 最佳实践

- **优先使用 `@life-ds/components-web` 组件库中的 `<Select>` 组件（如果是在 React 项目中）。**
- 在表单场景中，优先把 `Select` 放进 `FormItem` 中，通过 `FormItem` 统一承载 `description` 和 `error`。
- `Select` 适用于**单值选择**；如果是多选、标签批量添加或级联结构，请不要勉强复用当前组件。
- 下拉面板统一使用内置 `Popover` 能力，不要在业务侧额外再包一层自定义弹层。
- `Select` 的下拉选项样式与 `FilterSelect` 保持一致，以减少用户在“筛选”与“录入”场景中的认知切换。
- 当设计稿包含前缀区域（如“北京市 | 请选择区县”）时，优先使用 `prefix` + `prefixIcon`，不要手工拆成多个控件。
- 表单校验失败时，优先通过 `FormItem error` 或 `Select error` 呈现错误态，不要额外叠加第二层红色边框。

## 相似组件区分

- **`Select`**：仅用于**标准场景下的选择**，如表单字段、设置面板、抽屉编辑、弹窗配置、通用输入区。
- **`FilterSelect`**：仅用于 **`Filter` / `FilterGroup`** 体系内的筛选场景，如列表筛选栏、查询条件区、表格顶部过滤区。
- 如果这个控件的结果是“作为字段值被保存 / 提交”，使用 `Select`。
- 如果这个控件的结果是“作为查询条件影响列表结果”，使用 `FilterSelect`。
- 不要在 `Form` 中使用 `FilterSelect`，也不要在 `FilterGroup` 中使用 `Select`。
- 即使两者都使用下拉面板且选项样式一致，也必须按**场景语义**而不是按“长得像”来选组件。

## 常见布局

- **标准表单项**：左侧标题，右侧为 `Select`，下方带说明或错误文案。
- **抽屉 / 弹窗配置项**：用于选择类目、门店、城市、类型等离散选项。
- **带前缀的地域 / 层级选择**：左侧前缀区表示上级信息，右侧为待选值。
- **紧凑输入区**：在密度较高的编辑区可使用 `small`，但仍应保持可读性和可点击面积。

```tsx
// ✅ 推荐：表单字段选择器
<FormItem label="经营类目" error="请选择经营类目">
  <Select width="100%" options={categoryOptions} placeholder="请选择" />
</FormItem>

// ✅ 推荐：带前缀区域
<Select
  prefix="北京市"
  prefixIcon={<Icon name="ic-local-line" />}
  options={districtOptions}
  placeholder="请选择区县"
/>

// ❌ 不推荐：把筛选场景误做成通用 Select
<Select options={statusOptions} placeholder="请选择状态后查询列表" />
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `.lds-select` DOM 结构**，必须使用 `@life-ds/components-web` 包提供的 `<Select>` 组件，以避免尺寸、错误态、前缀区和 `Popover` 交互遗漏。

```tsx
import React from 'react';
import { Form, FormItem, Icon, Select } from '@life-ds/components-web';

const options = [
  { label: '生活服务 / 到店综合', value: 'life-service', iconName: 'ic-sell-line' },
  { label: '酒旅 / 主题乐园', value: 'travel-theme-park', iconName: 'ic-drink-line' },
  { label: '美容美发 / 洗剪吹', value: 'beauty-hair', iconName: 'ic-store-line' },
];

export function SelectExamples() {
  const [category, setCategory] = React.useState<string>();
  const [district, setDistrict] = React.useState<string>();

  return (
    <Form labelWidth={90}>
      <FormItem label="经营类目" required error={!category ? '请选择经营类目' : undefined}>
        <Select
          width="100%"
          size="default-size"
          value={category}
          onChange={setCategory}
          options={options}
          placeholder="请选择"
          aria-label="经营类目"
        />
      </FormItem>

      <FormItem label="所属区域" description="支持带前缀的单值选择">
        <Select
          width="100%"
          size="default-size"
          value={district}
          onChange={setDistrict}
          prefix="北京市"
          prefixIcon={<Icon name="ic-local-line" />}
          options={[
            { label: '朝阳区', value: 'chaoyang' },
            { label: '海淀区', value: 'haidian' },
            { label: '东城区', value: 'dongcheng' },
          ]}
          placeholder="请选择区县"
          aria-label="所属区域"
        />
      </FormItem>
    </Form>
  );
}

// ❌ 错误：在 React 中手动拼装类名和弹层
<button className="lds-select lds-select--default-size">
  <span className="lds-select__value">请选择</span>
</button>
```

### Select 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 选择器尺寸 |
| `placeholder` | `React.ReactNode` | `'请选择'` | 未选择时展示的占位内容 |
| `prefix` | `React.ReactNode` | `undefined` | 前缀内容，常用于地域 / 层级信息 |
| `prefixIcon` | `React.ReactNode` | `undefined` | 前缀图标 |
| `width` | `number \| string` | `360` | 触发器宽度，默认 `360px`，业务可按场景覆盖，数字按 px 处理 |
| `value` | `string` | `undefined` | 受控选中值 |
| `defaultValue` | `string` | `undefined` | 非受控默认值 |
| `options` | `SelectOption[]` | - | 选项列表 |
| `open` | `boolean` | `undefined` | 受控展开态 |
| `defaultOpen` | `boolean` | `false` | 非受控默认展开态 |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | 展开态回调 |
| `onChange` | `(value, option) => void` | `undefined` | 选中回调 |
| `matchTriggerWidth` | `boolean` | `true` | 面板宽度是否跟随 trigger |
| `panelWidth` | `number \| string` | `undefined` | 显式指定面板宽度 |
| `isFocused` | `boolean` | `false` | 强制展示激活态，常用于文档页 / 受控外观 |
| `error` | `boolean` | 继承 `FormItem` | 是否展示错误描边 |

### SelectOption

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `label` | `React.ReactNode` | 选项文案 |
| `value` | `string` | 选项值 |
| `iconName` | `string` | 可选左侧图标 |
| `disabled` | `boolean` | 是否禁用 |

### 尺寸规范

| 尺寸 | 高度 | 圆角 | 文本规格 | 图标尺寸 |
| --- | --- | --- | --- | --- |
| `large` | `48px` | `12px` | `subtitle/regular` | `20px` |
| `default-size` | `40px` | `12px` | `body/regular` | `18px` |
| `small` | `36px` | `10px` | `body/regular` | `16px` |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中使用 `Select` 时，**必须**完整组合触发器与下拉面板相关类名；如果只写一个 `.lds-select` 外壳，会缺失尺寸、错误态和选项样式。

| 区块 | 类名 | 说明 |
| --- | --- | --- |
| 触发器 | `.lds-select` + `.lds-select--large/default-size/small` | 选择器根节点 |
| 前缀区 | `.lds-select__prefix-group` + `.lds-select__prefix` | 前缀内容区域 |
| 分隔线 | `.lds-select__divider` | 前缀与主值之间的竖线 |
| 当前值 | `.lds-select__value` | 占位文案 / 已选文案 |
| 右侧图标 | `.lds-select__icon` | 展开 / 收起箭头 |
| 面板容器 | `.lds-filter-select__popover` + `.lds-filter-select__list` | 下拉面板容器 |
| 面板选项 | `.lds-filter-select__option` | 单个选项 |

**示例代码**：

```html
<!-- ✅ 正确：完整尺寸类名 -->
<button class="lds-select lds-select--default-size" type="button" aria-haspopup="listbox">
  <span class="lds-select__value">请选择</span>
  <span class="lds-select__icon" aria-hidden="true">
    <svg class="icon" width="18" height="18"><use href="#ic-arrow-down-line" /></svg>
  </span>
</button>

<!-- ✅ 正确：带前缀区域 -->
<button class="lds-select lds-select--default-size has-prefix" type="button">
  <span class="lds-select__prefix-group">
    <span class="lds-select__prefix">
      <svg class="icon" width="18" height="18"><use href="#ic-local-line" /></svg>
      北京市
    </span>
  </span>
  <span class="lds-select__divider" aria-hidden="true"></span>
  <span class="lds-select__value">请选择区县</span>
  <span class="lds-select__icon" aria-hidden="true">
    <svg class="icon" width="18" height="18"><use href="#ic-arrow-down-line" /></svg>
  </span>
</button>

<!-- ❌ 错误：缺失尺寸类名 -->
<button class="lds-select" type="button">请选择</button>
```

## 实现要点

在实现 `Select` 时，请确保覆盖以下结构与状态：

- **状态覆盖**：默认、悬停、激活 / 展开、已选、错误、禁用、禁用且已选。
- **错误优先级**：错误态应覆盖普通描边色；在 `FormItem` 中使用时，可直接继承错误上下文。
- **尺寸限制**：当前仅支持 `large`、`default-size`、`small` 三种尺寸，不要擅自扩展“mini”等尺寸。
- **弹层实现**：下拉面板通过 `Popover` 承载，面板选项样式应与 `FilterSelect` 保持一致。
- **前缀布局**：存在前缀时，前缀区、分隔线和主值区需保持稳定间距，不要因占位文案长度导致结构抖动。
- **可访问性**：触发器应具备明确的无障碍名称（如 `aria-label`），面板使用 `listbox` / `option` 语义。
- **单值语义**：当前组件是**单选下拉**，不包含搜索、多选、级联、虚拟滚动等高级能力。

## 兜底策略

如果模式不明确：

- 如果这是表单字段或通用设置项，优先使用 `Select`。
- 如果这是列表筛选、查询条件、顶部过滤栏，优先使用 `FilterSelect`。
- 如果需要多选、搜索选项、树形级联，请明确标记当前 `Select` 无法直接覆盖，再评估是否基于现有能力扩展。
