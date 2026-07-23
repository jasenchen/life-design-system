# 表格 (Table)

在用户需要查看、比较、排序和操作大量结构化数据，且这些数据必须按行列严格对齐时使用表格。表格是一个信息容器模式，用于承载“表头 + 数据行 + 单元格 + 分页 / 汇总 / 批量操作”等稳定结构。

## 如何识别表格

可能的表格通常表现为：

- 由行和列组成的网格结构，顶部有一行明确的表头（列名）。
- 数据需要跨行对比，同一列中的信息语义一致，如“状态 / 价格 / 时间 / 操作”。
- 左侧可能包含用于批量操作的复选框列，右侧通常包含固定的操作列。
- 列与列之间通常存在明确的对齐规则，如文本左对齐、数字右对齐、状态居中对齐。
- 数据量较大时，底部通常附带分页器（Pagination），字段较多时会出现横向滚动。

## 适用场景

- **查询结果列表**：如商品列表、订单列表、用户列表、门店列表。
- **状态管理列表**：需要在每行展示状态标签、开关或多个操作项。
- **宽表对比场景**：字段很多，需要横向滚动，同时固定最左侧关键信息列和最右侧操作列。
- **批量处理场景**：首列包含复选框，表格上方或底部配合批量操作按钮使用。
- **层级数据场景**：单行可展开更多信息，或使用树形结构表达父子关系。

## 最佳实践

- **优先使用 `@life-ds/components-web` 中的 `<TableWrapper>` + `<Table>` 组合。**
- `TableWrapper` 负责横向滚动容器、固定列阴影和边框外观；`Table` 负责真实表格结构，不要跳过 `TableWrapper` 直接裸用 `Table`。
- 表头与表身必须共享相同的列顺序、对齐方式和固定方向；不要出现 `Th` 与对应 `Td` 配置不一致的情况。
- **对齐方式**：文本默认左对齐，数字 / 金额右对齐，状态标签、开关、复选框等短控件可居中对齐。
- **固定列规则**：当列数过多需要横向滚动时，优先固定最左侧的关键信息列（如名称、ID、多选框）；右侧仅在确实承载操作列时才固定最右侧操作列。固定列通过 `fixed="left"` / `fixed="right"` 成对声明在同列的 `Th` / `Td` 上。
- **固定列阴影**：固定列与滚动内容产生叠加时，应由 `TableWrapper` 自动呈现连续整块阴影分隔，不要在每个单元格上单独加阴影。
- **状态列与操作列约束**：独立状态列优先使用 `TableCellTag`；操作列优先使用 `TableCellOperation` + `TableCellAction`，不要自行拼接不一致的链接样式。
- **空白数据处理**：单元格没有数据时，应显示 `-` 或 `--`，不要留白，也不要直接暴露 `null / undefined`。
- **列宽控制**：为关键列提供合理的 `minWidth`，对超长内容使用省略与 Tooltip，避免挤压其他列。
- **操作收纳**：当单行操作超过 3 个时，前两个高频操作平铺，其他操作收纳进“更多”菜单。
- **分页职责**：是否展示分页器由业务决定；一旦页面使用分页器，不应因为当前数据刚好只剩 1 页就自动消失。

## 常见布局

- **基础数据表**：标准数据列表，底部配合分页器。
- **宽表 + 固定列**：字段较多时横向滚动，并固定首列 / 尾列，适合经营分析、履约数据、商品信息宽表。
- **带批量操作的表格**：首列为复选框，顶部工具栏提供批量删除、导出、上架 / 下架等操作。
- **展开行表格（Expandable）**：行内可展开补充信息，如子任务、明细说明、履约记录。
- **树形表格（Tree Table）**：带层级结构的数据，如分类树、组织结构、目录管理。

## React 组件用法（推荐）

在 React 项目中，必须优先使用 `@life-ds/components-web` 提供的表格组件组合，不要手写 `.lds-table` 相关 DOM 结构，以免遗漏固定列、滚动阴影、对齐 class 和 hover 状态。

```tsx
import React from 'react';
import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCellProduct,
  TableCellTag,
  TableCellAmount,
  TableCellOperation,
  TableCellAction,
} from '@life-ds/components-web';

export default function Demo() {
  return (
    <TableWrapper>
      <Table style={{ minWidth: 1280 }}>
        <Thead>
          <Tr>
            <Th align="left" fixed="left" style={{ minWidth: 320 }}>商品信息</Th>
            <Th align="center">状态</Th>
            <Th align="right">价格（元）</Th>
            <Th align="left">售卖时间</Th>
            <Th align="left">适用门店</Th>
            <Th align="right">剩余库存</Th>
            <Th align="left" fixed="right" style={{ minWidth: 180 }}>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td align="left" fixed="left" style={{ minWidth: 320 }}>
              <TableCellProduct
                img="https://picsum.photos/seed/demo/48/48"
                title="【节假日通用】资生堂烫染护理"
                tag="团购"
                tagVariant="default"
                id="23468723648223"
              />
            </Td>
            <Td align="center">
              <TableCellTag color="green">售卖中</TableCellTag>
            </Td>
            <Td align="right">
              <TableCellAmount>￥508.00</TableCellAmount>
            </Td>
            <Td align="left">2023.08.01 12:00</Td>
            <Td align="left">上海浦东 12 家门店</Td>
            <Td align="right">10,000</Td>
            <Td align="left" fixed="right" style={{ minWidth: 180 }}>
              <TableCellOperation>
                <TableCellAction href="#">上架</TableCellAction>
                <TableCellAction href="#" disabled>编辑</TableCellAction>
              </TableCellOperation>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableWrapper>
  );
}
```

```tsx
// ❌ 错误：在 React 中手写 className 拼接表格结构
<div className="lds-table-wrapper">
  <table className="lds-table">...</table>
</div>
```

### 基础结构组件 API

这些组件均透传对应原生元素的标准 HTML 属性；当文档中未单独列出的属性有业务需要时，可按原生属性使用。

| 组件 | 类型 / 继承 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `TableWrapper` | `React.HTMLAttributes<HTMLDivElement>` | `undefined` | 表格外层滚动容器。负责横向滚动、固定列阴影、边框与圆角承接。建议始终包裹 `Table` 使用 |
| `Table` | `React.TableHTMLAttributes<HTMLTableElement>` | `undefined` | 原生 `<table>` 的 React 包装，默认附带 `lds-table` 样式 |
| `Thead` | `React.HTMLAttributes<HTMLTableSectionElement>` | `undefined` | 原生 `<thead>` 包装，默认附带 `lds-table__thead` 样式 |
| `Tbody` | `React.HTMLAttributes<HTMLTableSectionElement>` | `undefined` | 原生 `<tbody>` 包装，无额外业务属性 |
| `Tr` | `React.HTMLAttributes<HTMLTableRowElement>` | `undefined` | 原生 `<tr>` 包装，默认附带 `lds-table__row` 样式 |

### TableWrapper 组件补充说明

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | 通常传入一个 `Table` |
| `onScroll` | `(event: React.UIEvent<HTMLDivElement>) => void` | `undefined` | 横向滚动时触发；内部会先更新固定列阴影状态，再继续透传给业务 |
| `className` | `string` | `undefined` | 追加到外层 wrapper 上 |
| `style` | `React.CSSProperties` | `undefined` | 可用于传入宽度等样式；固定列阴影边界相关 CSS 变量由组件内部自动维护 |

> `TableWrapper` 的 `ref` 指向内部真实滚动容器，可用于业务侧读取 `scrollLeft` 或执行滚动定位。

### Th / Td 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `align` | `'left' \| 'center' \| 'right'` | `undefined` | 单元格内容对齐方式；`Th` 与同列 `Td` 必须保持一致 |
| `fixed` | `'left' \| 'right'` | `undefined` | 固定列方向；需要在同一列的 `Th` / `Td` 上成对声明 |

除上述属性外，`Th` 继承原生 `React.ThHTMLAttributes<HTMLTableCellElement>`，`Td` 继承原生 `React.TdHTMLAttributes<HTMLTableCellElement>`，因此仍可继续使用 `style`、`colSpan`、`rowSpan`、`className` 等属性。

## 开箱即用单元格 (Cells)

表格内部提供了几个高频单元格组合组件，优先使用这些组件来保证视觉和交互一致性，而不是在 `Td` 内重复拼装 DOM。

### TableCellProduct 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `img` | `string` | `undefined` | 商品图片 URL |
| `title` | `string` | `undefined` | 主标题 |
| `id` | `string` | `undefined` | 商品 ID，展示为副标题 |
| `tag` | `string` | `undefined` | 可选标签文案 |
| `tagVariant` | `'default' \| 'orange' \| 'red'` | `'default'` | 标签视觉变体，会内部映射到 `Tag` 的样式 |

### TableCellTag 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `containerClassName` | `string` | `undefined` | 外层居中容器的 className |
| `className` | `string` | `undefined` | 传给内部 `Tag` 的 className |
| `size` | 继承 `TagProps['size']` | `'small'` | 标签尺寸 |
| `variant` | 继承 `TagProps['variant']` | `'light'` | 标签视觉风格 |
| `color` | 继承 `TagProps['color']` | `'gray'` | 标签颜色语义 |

其余属性透传给内部 `Tag` 组件，适合独立状态列场景。

### TableCellAmount 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | 金额或数字内容，沿用普通正文字体展示；通过右对齐来强化可比性 |

### TableCellOperation 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | 一组操作项，通常与 `TableCellAction` 组合使用 |

### TableCellAction 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `danger` | `boolean` | `false` | 是否切换为危险操作色 |
| `disabled` | `boolean` | `false` | 是否禁用；禁用时会移除可点击行为并设置 `aria-disabled` |
| `href` | `string` | `undefined` | 链接地址；`disabled` 时会被自动忽略 |
| `onClick` | `React.MouseEventHandler<HTMLAnchorElement>` | `undefined` | 点击回调；禁用态下不会继续触发 |

除上述属性外，`TableCellAction` 继承原生 `<a>` 的标准属性，如 `target`、`rel`、`tabIndex`、`className` 等。

## 实现要点

在实现表格时，请确保覆盖以下行为：

- 表头与表身的对齐规则严格一致，不允许表头左对齐而表身右对齐或居中。
- 悬停态以“整行高亮”为主，不要只高亮单个单元格。
- 固定列使用不透明底色承接内容，避免深色模式下 hover 透明层透出底部滚动内容。
- 开启固定列时，阴影由 `TableWrapper` 统一绘制为整块连续投影，不要在 `th / td` 上分别叠加阴影。
- 当 `fixed="left"` / `fixed="right"` 生效时，应为对应列提供稳定的宽度或 `minWidth`，避免滚动时边界抖动。
- 需要横向滚动的表格，应优先给 `Table` 设置 `minWidth`，而不是通过挤压列宽强行塞进容器。
- 状态列优先使用 `TableCellTag`，操作列优先使用 `TableCellOperation` + `TableCellAction`，保持语义统一。
- 空状态、加载态、选中态、排序态、分页态都应由业务层完整补齐，不要只实现“有数据时的默认样式”。

## 兜底策略

如果模式不明确：

- 默认使用 `TableWrapper` + `Table` + `Thead` + `Tbody` + `Tr` + `Th` + `Td` 的基础组合。
- 默认不固定列，仅在字段明显过多、且左右关键信息需要常驻可见时再启用 `fixed`。
- 文本按左对齐处理，数字 / 金额按右对齐处理，状态按居中处理。
- 若设计稿没有给出复杂单元格结构，优先使用基础文本单元格，不要凭空设计图片卡片、徽标或额外装饰。
- 除非数据结构极其特殊（如甘特图、日历视图、复杂透视分析），否则不要用 `div + flex` 去替代表格语义结构。
