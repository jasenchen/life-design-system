# 键值对 (KeyValue)

在需要以只读方式浏览结构化信息时使用 KeyValue，例如详情页、审核页、结果页、配置回显页或资质材料页。它本质上是“表单编辑态”的浏览态映射：保留字段分组和标题结构，但把输入框、下拉框、上传组件等交互控件切换为只读展示。

## 如何识别 KeyValue

可能的 KeyValue 通常表现为：

- 一组连续的“左侧标题（key）+ 右侧内容（value）”信息行，标题列宽度一致。
- 默认是横向排版，标题在左、内容在右；只有在窄容器中才会改成上下排版。
- 标题文字使用次要色，内容文字使用主文字色，数字信息可单独强调。
- 内容区域可能不是纯文本，也可能是链接、图标操作、Tag 组、图片组、Card 或 Table。
- 图片展示仍然属于某个字段的 `value`，而不是脱离字段结构单独漂浮的一块内容。

## 最佳实践

- **优先使用 `@life-ds/components-web` 提供的 `<KeyValue>` 与 `<KeyValueItem>` 组件。**
- 默认使用横向布局，不要把详情态一上来就写成上下结构。
- 默认标题宽度为 `84px`，且**只在横向布局下生效**；纵向布局不存在固定标题宽度。
- 同一组 KeyValue 内，标题宽度保持一致，不要逐项随意改单个字段宽度；只有特殊长标题才单独覆盖 `labelWidth`。
- 标题（key）超过 2 行时必须打点省略，避免把 value 区域挤乱。
- 窄容器（如 Drawer 内窄列、侧边卡片、局部摘要区）才考虑切换为纵向布局。
- `value` 优先展示真实内容，不要使用只读的 `Input disabled`、`Select disabled`、`Upload disabled` 来伪装详情态。
- 数字型内容（金额、编号、库存等）使用数字字体语义，不要和普通文本混写成同一种视觉。
- 图片展示继续遵循字段结构：左侧是标题，右侧是图片组；图片默认可参考 Upload 完成态的缩略图尺寸（如 `76 x 76`），但应根据内容类型灵活调整，例如身份证等证件照通常需要长方形比例，某些商品图或材料图也可能需要展示得更大。
- 当内容只是普通说明文案时，直接使用文本；只有内容确实适合结构化组合时，才在 `value` 区放 `Card`。
- 当内容本质上是列表型数据时，优先在 `value` 区放 `Table`，不要把表格硬拆成很多行零散的 KeyValue。

## 常见布局

- **单列只读信息**：固定宽度容器中逐行展示，适合营业资质、证照信息、基础资料回显。
- **双列详情区**：详情页中最常见的结构，小信息量字段双列排布，长文本或图片区跨整行。
- **窄容器纵向**：在窄栏、卡片局部、Drawer 侧边信息中，将标题放上方、内容放下方。
- **文本操作类**：value 内同时出现正文、超链接和图标操作，例如“刘克燕 操作”或“编号 + 复制图标”。
- **复合值类型**：value 可承载 Tag 组、图片组、Card、Table，但仍保持在同一个字段结构内。

```tsx
// ✅ 推荐：默认横向布局，展示常规文本
<KeyValue columns={1}>
  <KeyValueItem label="商品名称" value={<KeyValueText value="资生堂烫染护理团购" />} />
  <KeyValueItem label="经营类目" value={<KeyValueText value="丽人 / 美发" />} />
</KeyValue>

// ✅ 推荐：文本 + 超链接操作
<KeyValue columns={1}>
  <KeyValueItem
    label="操作类"
    value={<KeyValueText value="刘克燕" linkText="操作" onLinkClick={() => {}} />}
  />
</KeyValue>

// ✅ 推荐：文本 + icon 操作
<KeyValue columns={1}>
  <KeyValueItem
    label="icon操作类"
    value={
      <KeyValueText
        value="91440300306186928F"
        icon={<Icon name="ic-copy-line" />}
        iconAriaLabel="复制编号"
        onIconClick={() => {}}
      />
    }
  />
</KeyValue>

// ✅ 推荐：双列详情区，长内容跨整行
<KeyValue columns={2}>
  <KeyValueItem label="商品名称" value={<KeyValueText value="资生堂烫染护理团购" />} />
  <KeyValueItem label="商品状态" value={<Tag size="small" variant="light" color="green">出售中</Tag>} />
  <KeyValueItem
    label="商品卖点"
    span={2}
    value={<KeyValueText value="节假日通用，支持洗护、烫染护理和基础造型服务，需至少提前一天预约。" />}
  />
</KeyValue>

// ✅ 推荐：图片组作为 value
<KeyValue columns={1}>
  <KeyValueItem
    label="商品图片"
    value={
      <KeyValueImages>
        <KeyValueImage src="./assets/shangpin.png" alt="商品主图" label="商品主图" />
        <KeyValueImage src="./assets/shangpin.png" alt="环境图" label="环境图" />
      </KeyValueImages>
    }
  />
</KeyValue>

// ✅ 推荐：窄容器纵向布局
<KeyValue columns={1} layout="vertical">
  <KeyValueItem label="证件类型" value={<KeyValueText value="身份证" />} />
  <KeyValueItem label="证件号" value={<KeyValueText value="91440300306186928F" />} />
</KeyValue>

// ❌ 不推荐：使用 disabled 表单控件伪装浏览态
<FormItem label="商品名称">
  <Input value="资生堂烫染护理团购" disabled />
</FormItem>
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `lds-key-value` 类名拼接**，必须使用 `@life-ds/components-web` 提供的组件，以保证标题宽度、截断规则、图片尺寸和不同 value 类型的排版一致。

```tsx
import {
  Card,
  CardBody,
  CardHeader,
  Icon,
  KeyValue,
  KeyValueImage,
  KeyValueImages,
  KeyValueItem,
  KeyValueTags,
  KeyValueText,
  Table,
  TableWrapper,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@life-ds/components-web';

export function ShopDetailReadOnly() {
  return (
    <KeyValue columns={2}>
      <KeyValueItem label="商品名称" value={<KeyValueText value="资生堂烫染护理团购" />} />
      <KeyValueItem
        label="商品状态"
        value={
          <KeyValueTags>
            <Tag size="small" variant="light" color="green">出售中</Tag>
            <Tag size="small" variant="outline" color="gray">直营门店</Tag>
          </KeyValueTags>
        }
      />
      <KeyValueItem
        label="商品编号"
        numeric
        value={
          <KeyValueText
            value="2137279250"
            icon={<Icon name="ic-copy-line" />}
            iconAriaLabel="复制商品编号"
            onIconClick={() => {}}
          />
        }
      />
      <KeyValueItem
        label="商品卖点"
        span={2}
        value={<KeyValueText value="节假日通用，支持洗护、烫染护理和基础造型服务，需至少提前一天预约。" />}
      />
      <KeyValueItem
        label="资质卡片"
        span={2}
        value={
          <Card size="small" interactive>
            <CardHeader
              title="营业执照"
              addon={<Tag size="small" variant="light" color="blue">生效中</Tag>}
              description="中国石化有限责任公司"
              extra={<Icon name="ic-arrow-right-line" style={{ width: 16, height: 16, color: 'var(--color-text-caption)' }} />}
            />
            <CardBody>适合通过 Card 承载更复杂的组合信息。</CardBody>
          </Card>
        }
      />
      <KeyValueItem
        label="适用门店"
        span={2}
        value={
          <TableWrapper>
            <Table>
              <Thead>
                <Tr>
                  <Th>门店名称</Th>
                  <Th>门店地址</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>朝阳大悦城店</Td>
                  <Td>北京市朝阳区朝阳北路 101 号</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableWrapper>
        }
      />
      <KeyValueItem
        label="商品图片"
        span={2}
        value={
          <KeyValueImages>
            <KeyValueImage src="./assets/shangpin.png" alt="商品主图" label="商品主图" />
            <KeyValueImage src="./assets/shangpin.png" alt="环境图" label="环境图" />
          </KeyValueImages>
        }
      />
    </KeyValue>
  );
}
```

### KeyValue 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `columns` | `number` | `2` | 一行展示的列数 |
| `labelWidth` | `number \| string` | `84` | 统一设置标题宽度，仅在横向布局下生效 |
| `layout` | `'horizontal' \| 'vertical'` | `'horizontal'` | 整体布局方式 |

### KeyValueItem 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `React.ReactNode` | `undefined` | 左侧标题内容 |
| `value` | `React.ReactNode` | `undefined` | 当前项展示值 |
| `span` | `number` | `1` | 栅格跨列数，适合长文本、表格、图片区 |
| `layout` | `'horizontal' \| 'vertical'` | 继承 `KeyValue` | 单独覆盖当前项布局 |
| `labelWidth` | `number \| string` | 继承 `KeyValue` | 单独覆盖当前项标题宽度，仅横向布局有效 |
| `tooltip` | `string` | `undefined` | 标题帮助提示文案 |
| `onTooltipClick` | `(e) => void` | `undefined` | 点击帮助图标的回调 |
| `tooltipAriaLabel` | `string` | `'查看字段说明'` | 帮助图标无障碍名称 |
| `numeric` | `boolean` | `false` | 数字型内容，切换到 `--font-number` |
| `emptyFallback` | `React.ReactNode` | `'--'` | 空值占位内容 |

### KeyValueText 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `React.ReactNode` | `undefined` | 主文案内容 |
| `linkText` | `React.ReactNode` | `undefined` | 附加链接文案 |
| `href` | `string` | `undefined` | 链接地址，存在时渲染为 `<a>` |
| `onLinkClick` | `(e) => void` | `undefined` | 链接点击回调 |
| `target` | `React.HTMLAttributeAnchorTarget` | `undefined` | 链接打开方式 |
| `rel` | `string` | `undefined` | 链接 rel |
| `icon` | `React.ReactNode` | `undefined` | 末尾图标 |
| `onIconClick` | `(e) => void` | `undefined` | 图标点击回调，存在时渲染为按钮 |
| `iconAriaLabel` | `string` | `'执行附加操作'` | 图标无障碍名称 |
| `ellipsis` | `boolean` | `false` | 是否单行省略主文案 |

### 其他辅助子组件

| 组件 | 关键属性 | 说明 |
| --- | --- | --- |
| `KeyValueTags` | `children` | Tag 组容器，统一处理间距和换行 |
| `KeyValueImages` | `children` | 图片组容器，统一处理缩略图排布 |
| `KeyValueImage` | `src` `alt` `label` | 单个图片项，默认可使用 `76 x 76` 缩略图，也可按场景调整尺寸与比例，支持底部说明 |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，若必须直接使用样式类，至少要完整保留 `key / value` 的结构层级；不要只拿一两个类名拼凑。

| 区块 | 类名 | 说明 |
| :--- | :--- | :--- |
| **键值容器** | `.lds-key-value` | 根容器，支持 `--lds-key-value-columns` |
| **单项** | `.lds-key-value__item` + `.lds-key-value__item--horizontal` / `.lds-key-value__item--vertical` | 单条字段容器 |
| **标题区** | `.lds-key-value__label` > `.lds-key-value__label-inner` | 标题区域 |
| **标题文本** | `.lds-key-value__label-text` | 支持最多两行打点 |
| **帮助图标** | `.lds-key-value__tooltip` | 16px 问号按钮 |
| **值区** | `.lds-key-value__value` | 内容区域 |
| **文本值** | `.lds-key-value-text` | 文本 / 链接 / 图标操作组合 |
| **Tag 值区** | `.lds-key-value-tags` | 标签组 |
| **图片值区** | `.lds-key-value-images` / `.lds-key-value-image` | 图片组与单图 |

**示例代码**：

```html
<!-- ✅ 正确：默认横向 key / value -->
<div class="lds-key-value" style="--lds-key-value-columns: 1; --lds-key-value-label-width: 84px;">
  <div class="lds-key-value__item lds-key-value__item--horizontal">
    <div class="lds-key-value__label">
      <div class="lds-key-value__label-inner">
        <span class="lds-key-value__label-text">商品名称</span>
      </div>
    </div>
    <div class="lds-key-value__value">
      <div class="lds-key-value-text">
        <span class="lds-key-value-text__value">资生堂烫染护理团购</span>
      </div>
    </div>
  </div>
</div>

<!-- ❌ 错误：没有字段结构，只是把文案平铺 -->
<div>
  <span>商品名称</span>
  <span>资生堂烫染护理团购</span>
</div>
```

## 实现要点

在实现 KeyValue 时，请确保覆盖以下规则：

- 默认布局是横向；纵向仅用于窄场景，而不是默认态。
- 默认标题宽度 `84px`，且**只在横向布局下生效**。
- 标题超过 2 行必须打点省略，避免破坏 value 区域的阅读节奏。
- 标题文案使用 `var(--color-text-secondary)`，内容文案使用 `var(--color-text-primary)`。
- 数字型内容使用 `--font-number`，不要和普通文本混用同一字体。
- 标题帮助提示使用 `ic-help-line`，尺寸 16px，保持 hover / active / focus-visible 状态。
- 文本值支持链接和图标操作，但它们仍属于同一个 `value` 区，不要拆成额外字段。
- 图片值使用统一图片组结构；默认可参考 Upload 完成态的缩略图尺寸，但应根据内容类型调整尺寸与比例，例如证件照适合长方形展示，部分业务图片也可能需要更大展示。
- Card / Table 可以出现在 `value` 区，但只应在内容确实更复杂时使用；普通说明文案不要为了“好看”强行塞 Card。
- 不要使用 disabled Input / Select / Upload 来模拟只读信息。

## 兜底策略

如果模式不明确：

- 先使用 `columns={2}` + 默认横向布局。
- 标题宽度先使用默认 `84px`，只有出现明显长标题时再局部覆盖。
- 长文本、表格、图片区默认使用 `span={2}` 跨整行。
- 图片展示优先放在 `value` 区中，不单独拆成脱离字段结构的图片区。
- 如果只是简单文本说明，不要用 Card；如果内容是列表型数据，不要拆成很多零散字段，优先使用 Table。
- 修改 Skill 文档后，发布前执行 `npm run sync-skills` 同步到 `packages/skills/content`。
