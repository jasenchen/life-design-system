# 布局 (Layout)

适用于不同类型的布局模式。每个页面请选择一种模式，切勿混用。

### 页面基础框架

除非是全屏页面、弹框等非典型页面类型，否则必须使用这个基础结构构建页面的基础框架。包含顶部导航、左侧菜单和中间内容区域，对于大部分页面，均需要遵循此结构，且不要对组件和样式进行修改！

在 React 项目中，必须优先使用 `@life-ds/components-web` 提供的 `Navbar`、`Menu`、`Input`、`PageHeader`、`Tabs` 等现成组件来搭建基础框架，禁止手写 `.lds-navbar`、`.lds-menu`、`.lds-tabs`、`.lds-input` 等 DOM 结构与 class 组合。

其中 `Navbar` 已内置默认的 logo、搜索区、导航项、右侧操作区和用户区内容，页面中直接使用 `<Navbar />` 即可，不要自行修改图标、logo、导航文案、选中项和用户区内容。`Navbar` 不再提供 `NavbarLeft`、`NavbarMiddle`、`NavbarRight`、`NavbarLogo`、`NavbarSearch`、`NavbarNav`、`NavbarNavItem`、`NavbarAction`、`NavbarDivider`、`NavbarUser` 等组合式子组件。

其中 `Menu` 已内置默认的 6 组侧边导航内容，页面中直接使用 `<Menu />` 即可，不要自行增删菜单组、菜单项数量或修改默认文案。默认分组为：`常用`、`店铺`、`订单`、`财务`、`达人带货`、`内容推广`。

每个一级页面必须有pageheader，若没有提供标题文案的输入，你需要根据内容生成一个标题文案。

实现结构请参考以下 React 示例，其中 `.app-content` 里的内容仅为参考内容，其他部分则为固定结构：

```tsx
import React from 'react';
import {
  Icon,
  Menu,
  Navbar,
  PageHeader,
  Tab,
  Tabs,
} from '@life-ds/components-web';

export function AppLayoutDemo() {
  return (
    <div className="app-container">
      <header className="app-navbar">
        <Navbar />
      </header>

      <div className="app-main-wrapper">
        <aside className="app-sidebar">
          <div className="app-sidebar__menu">
            <Menu />
          </div>
        </aside>

        <div className="app-body">
          <div className="app-content">
            <PageHeader
              title="页面标题"
              tabs={
                <Tabs variant="primary" size="small" defaultValue="tab-1">
                  <Tab value="tab-1">标签一</Tab>
                  <Tab value="tab-2">标签二</Tab>
                </Tabs>
              }
            />
            {/* 核心业务内容放在这里 */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

<br />

1. **初始化结构**：始终从 `.app-container` 开始构建页面。
2. **内容填充**：将具体业务逻辑放入 `.app-content` 中，并根据 [布局模式](#布局模式) 选择合适的布局。
3. **PageHeader 位置**：`<PageHeader />` 必须放在 `.app-content` 内部，不能放在 `.app-body` 直属层级；因为 `.app-content` 同时承担页面滚动和左右内边距，放到外面会看起来像固定头部，并与内容区左右边距错位。
4. **样式覆盖**：除非用户明确要求，否则不要修改 `base.css` 中核心框架的 `width`、`z-index` 和 `flex` 属性。
5. **阴影处理**：严格遵循base.css与基础框架示例代码，`.app-body` 的 `z-index` 高于侧边栏和导航栏，以保证 `shadow-large` 投影效果正常显示。

### PageHeader 变体

- `PageHeader` 默认使用一级页样式：大标题，无返回按钮。
- 当页面是从列表/一级页钻取进入的二级页、详情页或配置页时，使用 `variant="secondary"`。
- `variant="secondary"` 会在标题左侧增加返回按钮，并将标题字号切换为较小的二级页样式；`tabs` 插槽能力与一级页保持一致。
- 需要处理返回行为时，为 `PageHeader` 传入 `onBackClick`。

```tsx
<PageHeader
  variant="secondary"
  title="二级页面标题"
  onBackClick={() => window.history.back()}
  tabs={
    <Tabs variant="primary" size="small" defaultValue="tab-1">
      <Tab value="tab-1">标签一</Tab>
      <Tab value="tab-2">标签二</Tab>
    </Tabs>
  }
/>
```

## 页面类型

### 列表页 (List Page)

适用场景：列表页是后台管理系统中最为常见的页面类型，主要用于展示、搜索和操作大批量数据。

- 当用户明确提出是列表页时使用此类型；

#### 页面结构层级 (Tree Structure)

以下是一个典型的列表页结构层级：

```text
.app-body (列表页主容器)
└── .app-content (页面滚动内容区)
    ├── <PageHeader /> (页面标题区)
    ├── <FilterGroup /> (搜索/筛选区，可选)
    ├── .lds-action-bar (状态与操作工具栏)
    │   ├── <Tabs /> (左侧: 数据状态页签/筛选项，请根据 tabs.md 的指南选择合适的 variant)
    │   └── .lds-actions (右侧: 新建/导出等全局操作)
    ├── <TableWrapper /> (数据表格区域)
    │   └── <Table /> (核心数据表格)
    │       ├── <Thead /> (表头)
    │       └── <Tbody /> (数据行)
    └── .lds-pagination-wrapper (分页器区域)
        └── <Pagination /> (分页组件)
```

#### 标准结构示例

```tsx
import React from 'react';
import {
  Button,
  Filter,
  FilterGroup,
  PageHeader,
  Pagination,
  Tab,
  Table,
  TableCellAction,
  TableCellAmount,
  TableCellOperation,
  TableCellProduct,
  TableWrapper,
  Tabs,
  Tbody,
  Thead,
  Th,
  Td,
  Tr,
} from '@life-ds/components-web';

export function ListPageLayoutDemo() {
  return (
    <div className="app-content">
      <PageHeader
        title="团购商品管理"
        tabs={
          <Tabs variant="primary" size="small" defaultValue="all">
            <Tab value="all">全部商品</Tab>
            <Tab value="selling">出售中</Tab>
            <Tab value="off">已下架</Tab>
            <Tab value="review">审核中</Tab>
          </Tabs>
        }
      />

      <div style={{ marginBottom: '24px' }}>
        <FilterGroup size="small" onQuery={() => {}} onReset={() => {}}>
          <Filter type="input" size="small" label="商品名称" placeholder="请输入" value="" onChange={() => {}} />
          <Filter type="select" size="small" label="商品状态" placeholder="请选择" onClick={() => {}} />
          <Filter type="date" size="small" label="售卖日期" placeholder="请选择" onClick={() => {}} />
          <Filter type="time" size="small" label="售卖时间" placeholder="请选择" onClick={() => {}} />
        </FilterGroup>
      </div>

      <div className="lds-action-bar">
        <Tabs variant="capsule" size="small" defaultValue="all-member">
          <Tab value="all-member">全部会员可领</Tab>
          <Tab value="target-member">定向会员发放</Tab>
        </Tabs>
        <div className="lds-actions">
          <Button variant="primary" size="default-size" icon={<Icon name="ic-plus-line" />}>
            新建会员优惠券
          </Button>
        </div>
      </div>

      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>商品信息</Th>
              <Th>价格（元）</Th>
              <Th>售卖时间</Th>
              <Th>剩余库存</Th>
              <Th>待核销</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><TableCellProduct img="../../assets/shangpin.png" title="【节假日通用】资生堂烫染护理" tag="团购" tagVariant="default" id="23468723648223" /></Td>
              <Td><TableCellAmount>￥508.00</TableCellAmount></Td>
              <Td>2023.08.01 12:00</Td>
              <Td>10,000</Td>
              <Td>500</Td>
              <Td>
                <TableCellOperation>
                  <TableCellAction>上架</TableCellAction>
                  <TableCellAction>编辑</TableCellAction>
                </TableCellOperation>
              </Td>
            </Tr>
            <Tr>
              <Td><TableCellProduct img="../../assets/shangpin.png" title="【工作日可用】高级洗剪吹套餐" tag="热销" tagVariant="orange" id="89345723648224" /></Td>
              <Td><TableCellAmount>￥128.00</TableCellAmount></Td>
              <Td>2023.08.02 14:30</Td>
              <Td>8,500</Td>
              <Td>240</Td>
              <Td>
                <TableCellOperation>
                  <TableCellAction>下架</TableCellAction>
                  <TableCellAction danger>删除</TableCellAction>
                </TableCellOperation>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableWrapper>

      <div className="lds-pagination-wrapper">
        <Pagination
          total={500}
          defaultCurrent={2}
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 50]}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
}
```

### 表单页 (Form Page)

适用场景：表单页用于新建、编辑、配置或提交结构化信息，通常从列表页或一级页面进入，属于二级页面。

- 当用户明确提出是新建页、编辑页、配置页、开通流程页、资料提交页或需要大段字段录入时使用此类型；
- 表单页由“页面基础框架 + 表单页内容”组成，除非是弹框、抽屉或全屏流程，否则仍然必须使用 [页面基础框架](#页面基础框架)；
- 表单页顶部导航区必须存在，并且必须使用 `PageHeader` 的二级页形式：`variant="secondary"`；
- 表单页内容区按顺序组织为：导航区、统领信息区、步骤条（可选）、表单区、全局操作区。

#### 页面结构层级 (Tree Structure)

以下是一个典型的表单页结构层级：

```text
.app-body (表单页主容器)
├── .app-content (页面滚动内容区)
│   ├── <PageHeader variant="secondary" /> (导航区，必选)
│   └── .form-page-content (表单页内容容器，居中，宽度 648px ~ 872px)
│       ├── .form-page-hero (统领信息区，可选但常用，直接平铺展示)
│       │   ├── .form-page-hero__media (可选：图片、图标或业务对象缩略图)
│       │   └── .form-page-hero__content
│       │       ├── .form-page-hero__title (重点标题)
│       │       └── .form-page-hero__meta (关键辅助信息)
│       ├── .form-page-divider (可选：统领信息区和下方内容之间的分割线)
│       ├── <Steps /> (步骤条，可选)
│       └── .form-page-form (表单区)
│           ├── .form-page-section (表单分组)
│           │   ├── .form-page-section__title (分组标题)
│           │   └── <Form /> (组内字段)
│           └── .form-page-section (其他表单分组，可选)
└── .form-page-actions (全局操作区，吸底)
    └── .form-page-actions__inner (内容居中，宽度 648px ~ 872px)
        ├── <Checkbox /> (协议同意，可选)
        └── .form-page-actions__buttons
            ├── <Button variant="default" />
            ├── <Button variant="secondary" />
            └── <Button variant="primary" />
```

#### 区域规则

1. **导航区**：必须使用 `<PageHeader variant="secondary" />`，标题描述当前表单动作，如“新建团购商品”“编辑门店信息”“提交资质材料”；返回行为通过 `onBackClick` 传入。
2. **内容宽度**：`PageHeader` 下方的表单页内容需要放入独立内容容器，宽度根据内容设定，不随页面拉伸；最大宽度 872px，最小宽度 648px，并在内容区内水平居中。该内容容器需补充固定上下间距：上间距使用 `var(--spacing-2x)`（8px），下间距使用 `var(--spacing-8x)`（32px）。
3. **统领信息区**：用于承载当前表单最重要的上下文信息，例如业务对象名称、主体名称、编号、金额、审核对象或关键状态；可以是图文样式，也可以是纯文本样式。
4. **步骤条**：仅当表单存在明确先后顺序、多阶段填写或“上一步 / 下一步 / 提交审核”语义时使用 `<Steps />`；平级切换不要使用步骤条，应使用 `Tabs`。
5. **表单区**：字段必须使用 `Form` + `FormItem` 组织；如果存在多个业务主题，应拆成多个分组，每组由“分组标题 + Form 组件”组成。
6. **全局操作区**：放置影响整个表单的操作按钮组，也可放置协议同意勾选；该区域在表单页中通常为吸底布局，固定贴在内容区底部。实现上优先作为 `.app-body` 下、`.app-content` 外的兄弟节点，而不是放进滚动容器内部，这样可以保留基础框架的底部内边距且不会出现露底问题。操作区背景需使用 `var(--color-bg-normal)`，顶部与正文之间的分割线使用 `var(--color-divider-normal)`。操作区内部内容仍需使用独立容器居中，宽度与表单内容容器保持一致；按钮组间距使用 `var(--spacing-3x)`，同一区域最多一个 `primary` 按钮。
7. **块间距**：统领信息区、步骤条、表单区、全局操作区这些页面级块之间的垂直间距统一使用 `var(--spacing-8x)`，即 32px。
8. **聚合区分割线**：统领信息区下方一般会有一根虚线分割线，用于和后续步骤条或表单区分隔；分割线与上方、下方内容之间的间距都使用 `var(--spacing-8x)`，也遵循页面级块间距规则。分割线颜色使用 `var(--color-border-normal)`。

#### 统领信息区规范

- 统领信息区用于“先告诉用户正在编辑什么”，不要放普通字段录入项，也不要替代表单区。
- 统领信息区不需要使用卡片、灰底或描边容器包裹，应直接在表单内容容器内平铺展示，通过内容排版和留白建立层级。
- 当统领信息区下方需要与步骤条或表单正文做弱分隔时，优先使用一根浅色虚线分割线，而不是重新包一层卡片；分割线前后间距都为 `var(--spacing-8x)`，颜色使用 `var(--color-border-normal)`。
- 图文样式适合展示商品、门店、资质主体等带缩略图的对象；纯文本样式适合展示经营主体、计划名称、编号、金额等关键信息。
- 标题可使用 `font: var(--display-medium)` 或 `font: var(--title-medium)`，根据内容重要性选择；辅助信息使用 `font: var(--body-regular)`。
- 颜色、圆角、背景、边框和间距必须使用 `life-ds-tokens.css` 中的语义化 tokens，不要硬编码色值。
- 金额、编号等数字型重点信息可使用 `font-family: var(--font-number)`，其余文本使用 `var(--font-normal)`。

#### 表单分组规范

- 分组标题使用 Figma 对应的 `标题 title/medium` 样式，在代码中映射为 `font: var(--title-medium)`。
- 分组标题只负责表达当前字段组主题，例如“基础信息”“商品信息”“资质信息”；不要把说明文案、状态标签或操作按钮塞进标题。
- 组内字段直接使用 `Form` + `FormItem`，不要手写 `.lds-form` 结构；字段必填、说明、错误态、帮助提示遵循 [form.md](form.md)。
- 如果只有一个简单主题，也可以只有一个分组，但仍建议保留分组标题以稳定页面层级。

#### 全局操作区规范

- 全局操作区一般位于表单区底部，用于提交、保存草稿、取消、上一步、下一步等影响整页的动作。
- 如果提交前需要用户同意协议，使用 `Checkbox` 放在按钮组上方或左侧，文案中协议名称可使用链接色 token。
- 主提交按钮使用 `Button variant="primary"`；取消、返回、保存草稿等辅助操作使用 `variant="default"` 或 `variant="secondary"`。
- 表单提交按钮应保持可点击；校验在点击提交时触发，错误通过 `FormItem` 的 `error` 回显，不要因为字段未填完就禁用提交按钮。

#### 标准结构示例

```tsx
import React from 'react';
import {
  Button,
  Checkbox,
  Form,
  FormItem,
  Input,
  PageHeader,
  Steps,
  Textarea,
} from '@life-ds/components-web';

export function FormPageLayoutDemo() {
  return (
    <div className="app-body">
      <div className="app-content">
        <PageHeader
          variant="secondary"
          title="新建团购商品"
          onBackClick={() => window.history.back()}
        />

        <div
          style={{
            width: 872,
            minWidth: 648,
            maxWidth: 872,
            margin: '0 auto',
            paddingTop: 'var(--spacing-2x)',
            paddingBottom: 'var(--spacing-8x)',
            boxSizing: 'border-box',
          }}
        >
          <section
            style={{
              display: 'flex',
              gap: 'var(--spacing-5x)',
            }}
          >
            <div
              style={{
                width: 84,
                height: 84,
                flex: '0 0 auto',
                borderRadius: 'var(--radius-m)',
                background: 'var(--color-fill-gray)',
              }}
            />
            <div style={{ display: 'grid', gap: 'var(--spacing-2x)' }}>
              <h2 style={{ margin: 0, font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                统领信息标题
              </h2>
              <div style={{ display: 'grid', gap: 'var(--spacing-base)', font: 'var(--body-regular)' }}>
                <div>
                  <span style={{ color: 'var(--color-text-caption)' }}>商品编号：</span>
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-number)' }}>
                    2137279250
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-caption)' }}>经营主体：</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>瑞幸咖啡（中国）有限公司</span>
                </div>
              </div>
            </div>
          </section>

          <div
            style={{
              margin: 'var(--spacing-8x) 0',
              borderTop: '1px dashed var(--color-border-normal)',
            }}
          />

          <div style={{ marginBottom: 'var(--spacing-8x)' }}>
            <Steps
              current={0}
              items={[
                { title: '填写基础信息' },
                { title: '上传商品素材' },
                { title: '提交审核' },
              ]}
            />
          </div>

          <main style={{ display: 'grid', gap: 'var(--spacing-8x)' }}>
            <section>
              <h2
                style={{
                  margin: '0 0 var(--spacing-5x)',
                  font: 'var(--title-medium)',
                  color: 'var(--color-text-primary)',
                }}
              >
                基础信息
              </h2>
              <Form labelWidth={120}>
                <FormItem label="商品名称" htmlFor="name" required description="建议控制在 20 个字以内">
                  <Input id="name" placeholder="请输入商品名称" />
                </FormItem>
                <FormItem label="商品卖点" htmlFor="summary">
                  <Textarea id="summary" placeholder="请输入商品卖点" />
                </FormItem>
              </Form>
            </section>

            <section>
              <h2
                style={{
                  margin: '0 0 var(--spacing-5x)',
                  font: 'var(--title-medium)',
                  color: 'var(--color-text-primary)',
                }}
              >
                商品信息
              </h2>
              <Form labelWidth={120}>
                <FormItem label="售卖价格" htmlFor="price" required>
                  <Input id="price" placeholder="请输入售卖价格" />
                </FormItem>
                <FormItem label="库存数量" htmlFor="stock" required>
                  <Input id="stock" placeholder="请输入库存数量" />
                </FormItem>
              </Form>
            </section>
          </main>
        </div>
      </div>

      <footer
        style={{
          padding: 'var(--spacing-5x) var(--spacing-8x)',
          borderTop: '1px solid var(--color-divider-normal)',
          background: 'var(--color-bg-normal)',
        }}
      >
        <div style={{ width: 872, minWidth: 648, maxWidth: 872, margin: '0 auto', display: 'grid', justifyContent: 'center', gap: 'var(--spacing-4x)' }}>
          <Checkbox
            size="default-size"
            showLabel
            label="请先阅读同意《抖音生活服务合作协议》后提交"
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-3x)' }}>
            <Button variant="default">取消</Button>
            <Button variant="secondary">保存草稿</Button>
            <Button variant="primary">提交审核</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
```
