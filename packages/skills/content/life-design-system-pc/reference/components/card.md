# 卡片 (Card)

在需要用一个稳定的容器承载一组相关信息时使用 Card，例如信息概览、活动说明、能力入口、状态摘要或数据指标模块。Card 本质上是一个有层级感的内容容器，而不是按钮或列表项本身。

## 如何识别 Card

可能的 Card 通常表现为：

- 一个独立的矩形内容块，带 `fill-normal` 底色和 `border` 描边。
- 内部由标题、说明、标签、操作区、分割线或指标区组成。
- 小尺寸和大尺寸都使用偏大的圆角，且大尺寸圆角更大。
- 如果卡片具备交互行为，hover 时会增加投影，但基础底色和描边保持不变。

## 最佳实践

- **优先使用 `@life-ds/components-web` 提供的 `<Card>` 及其子组件。**
- Card 是内容分组容器，优先用于包裹一组相关信息，不要把每一行文案都单独包成一个 Card。
- **Card 基础样式固定为 `fill-normal` 底色 + `border` 描边**，禁止自行改成透明底或去掉边框。
- 小尺寸 Card 使用 `20px` 圆角，大尺寸 Card 使用 `24px` 圆角；两者默认 `padding` 均为 `20px`。
- 只有在卡片本身可点击或存在明显交互行为时，才开启交互态；交互态 **hover 仅增加投影**，不要额外位移或改变底色。
- 标题、说明、标签、底部操作建议通过 `CardHeader`、`CardBody`、`CardFooter`、`CardDivider` 等组合完成，避免写死内容结构。
- **数据指标卡场景中，无论是单个指标还是多个指标，都应放在同一个 Card 容器内**，通过 `CardMetrics` / `CardMetric` 控制内部布局，而不是把每个指标拆成多个 Card。
- 多指标并列时，指标之间需要使用分割线分隔；推荐通过 `CardMetrics divided` 处理，而不是手搓额外容器。
- 所有颜色、描边、阴影都必须使用 design token，禁止硬编码颜色值。

## 常见布局

- **信息卡**：标题 + 描述 + 标签组 + 分割线 + 底部状态/按钮。
- **入口卡**：标题 + 描述 + 右侧轻 3D icon，可用于能力入口或功能推荐。
- **交互卡**：整体可点击，hover 增加阴影，常用于跳转型入口。
- **活动卡**：标题 + 活动状态标签 + 时间描述 + 底部行动按钮。
- **单指标卡**：标题 + 问号 + 大数值 + 趋势行（较昨日 / 较上周）。
- **多指标卡**：一个 Card 包裹多组指标，指标间有分割线。

```tsx
// ✅ 推荐：小尺寸信息卡
<Card size="small">
  <CardHeader
    title="风险防护"
    addon={<Tag size="small" variant="light" color="orange">待开启</Tag>}
    description="卡片说明文案"
    extra={<Icon name="ic-3dl-safe" variant="3dl" style={{ width: 40, height: 40 }} />}
  />
  <CardBody>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag size="small" variant="outline" color="gray">tag</Tag>
      <Tag size="small" variant="outline" color="gray">tag</Tag>
    </div>
  </CardBody>
  <CardDivider variant="dashed" />
  <CardFooter>
    <span>已护航 3次 / 12次</span>
    <Button size="small">行动按钮</Button>
  </CardFooter>
</Card>

// ✅ 推荐：交互入口卡
<Card size="small" interactive>
  <CardHeader
    style={{ alignItems: 'center' }}
    title="门店经营诊断"
    addon={<Tag size="small" variant="light" color="green">进行中</Tag>}
    description="查看当前门店经营数据并获取优化建议"
    extra={<Icon name="ic-3dl-shop" variant="3dl" style={{ width: 40, height: 40 }} />}
  />
</Card>

// ✅ 推荐：大尺寸活动卡
<Card size="large" interactive>
  <CardHeader
    title="旅游卡 - 招品非策略立减金额"
    addon={<Tag size="default-size" variant="light" color="green">活动进行中</Tag>}
    description="2026/06/30 ～ 2026/12/30"
  />
  <CardBody>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag size="small" variant="outline" color="gray">平台商家联合出资</Tag>
      <Tag size="small" variant="outline" color="gray">长期活动</Tag>
    </div>
  </CardBody>
  <CardDivider variant="dashed" />
  <CardFooter>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Icon
          name="ic-finish-round-fill"
          style={{ width: 16, height: 16, color: 'var(--color-success-normal)' }}
        />
        <span>可报名</span>
      </div>
      <span>2026/12/30 截止</span>
    </div>
    <Button size="small" variant="secondary">立即报名</Button>
  </CardFooter>
</Card>

// ❌ 不推荐：为了展示多个指标，把每个指标拆成独立 Card
<div style={{ display: 'flex', gap: 12 }}>
  <Card>GMV</Card>
  <Card>支付笔数</Card>
  <Card>客单价</Card>
</div>
```

## React 组件用法（推荐）

在 React 项目中，**禁止手写 `lds-card` 类名拼接**，必须使用组件库提供的 `<Card>` 与子组件组合，以保证圆角、描边、投影和指标区排版一致。

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardDivider,
  CardMetrics,
  CardMetric,
  Icon,
  Button,
  Tag
} from '@life-ds/components-web';

// ✅ 正确：标准信息卡
<Card size="small">
  <CardHeader
    title="风险防护"
    addon={<Tag size="small" variant="light" color="orange">待开启</Tag>}
    description="卡片说明文案"
    extra={<Icon name="ic-3dl-safe" variant="3dl" style={{ width: 40, height: 40 }} />}
  />
  <CardBody>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag size="small" variant="outline" color="gray">tag</Tag>
      <Tag size="small" variant="outline" color="gray">tag</Tag>
    </div>
  </CardBody>
  <CardDivider variant="dashed" />
  <CardFooter>
    <span>已护航 3次 / 12次</span>
    <Button size="small">行动按钮</Button>
  </CardFooter>
</Card>

// ✅ 正确：单指标上涨卡
<Card size="large">
  <CardMetrics columns={1}>
    <CardMetric
      label="累计成交金额"
      extra={<Icon name="ic-help-line" style={{ width: 20, height: 20, color: 'var(--color-text-caption)' }} />}
      value="¥32,234.32"
      suffix="万"
      trendLabel="较昨日"
      trendValue="+22.56%"
      trendDirection="up"
    />
  </CardMetrics>
</Card>

// ✅ 正确：单指标下降卡
<Card size="large">
  <CardMetrics columns={1}>
    <CardMetric
      label="累计核销量"
      extra={<Icon name="ic-help-line" style={{ width: 20, height: 20, color: 'var(--color-text-caption)' }} />}
      value="12,480"
      suffix="单"
      trendLabel="较昨日"
      trendValue="-8.21%"
      trendDirection="down"
    />
  </CardMetrics>
</Card>

// ✅ 正确：多个指标仍然共用一个 Card，且中间有分割线
<Card size="large">
  <CardMetrics columns={3} divided>
    <CardMetric
      label="累计成交金额"
      value="¥32,234.32"
      suffix="万"
      trendLabel="较昨日"
      trendValue="+22.56%"
      trendDirection="up"
    />
    <CardMetric
      label="支付笔数"
      value="5,248"
      suffix="单"
      trendLabel="较昨日"
      trendValue="-6.42%"
      trendDirection="down"
    />
    <CardMetric
      label="客单价"
      value="243"
      suffix="元"
      trendLabel="较昨日"
      trendValue="+1.40%"
      trendDirection="up"
    />
  </CardMetrics>
</Card>

// ❌ 错误：在 React 中手动拼 className，容易丢失尺寸/交互态规范
<div className="lds-card lds-card--large">Card Content</div>
```

### Card 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'small' \| 'large'` | `'small'` | 卡片尺寸，对应圆角规格 |
| `interactive` | `boolean` | `false` | 是否启用交互态，开启后 hover 增加投影 |

### 组合子组件

| 组件 | 关键属性 | 说明 |
| --- | --- | --- |
| `CardHeader` | `title` `description` `addon` `extra` `icon` | 标题区；支持标题旁标签、右侧扩展区和左侧图标 |
| `CardBody` | `children` | 默认内容区 |
| `CardFooter` | `children` | 底部操作区，默认左右分布 |
| `CardDivider` | `variant: 'solid' \| 'dashed'` | 分割线，支持实线与虚线 |
| `CardMetrics` | `columns?: number` `divided?: boolean` | 指标区栅格容器；多指标场景可开启分割线 |
| `CardMetric` | `label` `value` `suffix` `extra` `description` | 单个指标块 |
| `CardMetric` | `trendLabel` `trendValue` `trendDirection` | 趋势行，位置在数值下方；上涨用成功色 token，下降用危险色 token |

---

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中，如果必须直接使用样式类，至少要带上基础类和尺寸类；交互态卡片还需要额外加交互类。

| 场景 | 类名组合 | 说明 |
| :--- | :--- | :--- |
| **小尺寸 Card** | `.lds-card .lds-card--small` | 20px 圆角的信息卡 |
| **大尺寸 Card** | `.lds-card .lds-card--large` | 24px 圆角的活动/概览卡 |
| **交互 Card** | `.lds-card .lds-card--large .lds-card--interactive` | hover 时增加投影 |

**示例代码**：
```html
<!-- ✅ 正确：基础卡片 -->
<div class="lds-card lds-card--small">
  <div class="lds-card__header">
    <div class="lds-card__title">卡片标题</div>
  </div>
</div>

<!-- ❌ 错误：缺少尺寸类名，圆角规格不明确 -->
<div class="lds-card">卡片标题</div>
```

## 实现要点

在实现 Card 时，请确保覆盖以下规则：

- **基础容器**：背景必须使用 `var(--color-fill-normal)`，描边必须使用 `var(--color-border-normal)`。
- **尺寸规格**：默认 `padding: 20px`；`small` 为 `20px` 圆角，`large` 为 `24px` 圆角。
- **交互规则**：只有可交互 Card 才出现 hover 投影，且 hover 不改变底色、不做位移。
- **分组逻辑**：Card 表达的是一组相关内容，不要为了凑布局把一个整体内容拆成多个 Card。
- **指标卡规则**：一个指标和多个指标都要被一个 Card 包住；指标之间用 `CardMetrics` 控制列数与间距。
- **指标分隔**：多个指标并列时，中间要有分割线，不要只靠空白间距分组。
- **趋势位置**：环比/同比必须位于数值下方，不能放到标题行或右上角。
- **趋势颜色**：上涨使用 `var(--color-success-normal)`，下降使用 `var(--color-danger-normal)`，不要手写颜色。
- **子组件优先**：优先用 `CardHeader` / `CardFooter` / `CardMetric` 等组合，减少业务侧重复写布局。
- **Token 约束**：颜色、阴影、圆角全部使用 `life-ds-tokens.css` 中的 token，禁止硬编码颜色。

## 兜底策略

如果模式不明确：

- 先选择最基础的 `small` Card 作为默认容器。
- 如果整个卡片可点击，再启用 `interactive`。
- 如果内容是数据摘要，优先用一个 Card 包住全部指标，而不是生成多个散卡。
- 修改 Skill 文档后，发布前必须执行 `npm run sync-skills` 同步到 `packages/skills/content`。
