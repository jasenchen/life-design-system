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
4. **页面背景**：典型后台页面的最底层背景默认使用 `var(--color-bg-gray)`，用于承载顶部导航和左侧菜单区域；实现上优先由 `body` / `.app-container` 提供这层灰底。右侧内容主画布 `.app-body` 继续使用 `var(--color-bg-normal)`，以保持白色内容面板语义。吸底操作区、弹层或卡片也仍然按照各自语义继续使用 `bg-normal`、`bg-popup`、`fill-*` 等 token，不要因为页面底层是灰色就统一改灰。
5. **样式覆盖**：除非用户明确要求，否则不要修改 `base.css` 中核心框架的 `width`、`z-index` 和 `flex` 属性。
6. **阴影处理**：严格遵循base.css与基础框架示例代码，`.app-body` 的 `z-index` 高于侧边栏和导航栏，以保证 `shadow-large` 投影效果正常显示。

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
- 列表页所在的典型页面底层背景默认沿用 [页面基础框架](#页面基础框架) 中的 `var(--color-bg-gray)`，右侧内容主画布 `.app-body` 继续使用 `var(--color-bg-normal)`；表格、筛选区、分页器等组件自身再使用各自语义 token。
- 列表页筛选区优先使用 `FilterGroup`、`Filter`、`FilterSelect`、`FilterDatePicker`、`FilterTimePicker` 等标准筛选器组件；不要因为局部交互或实现问题退回到普通 `Form`、裸 `Input` / `Select` 或手写筛选栏。

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
  FilterDatePicker,
  FilterGroup,
  FilterSelect,
  FilterTimePicker,
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
          <Filter name="keyword" type="input" size="small" label="商品名称" placeholder="请输入" value="" onChange={() => {}} />
          <FilterSelect
            name="status"
            size="small"
            label="商品状态"
            placeholder="请选择"
            options={[
              { label: '全部状态', value: 'all' },
              { label: '出售中', value: 'selling' },
              { label: '已下架', value: 'off' },
            ]}
            onChange={() => {}}
          />
          <FilterDatePicker
            name="saleDate"
            size="small"
            label="售卖日期"
            placeholder="请选择"
            onChange={() => {}}
          />
          <FilterTimePicker
            name="saleTime"
            size="small"
            label="售卖时间"
            placeholder="请选择"
            onChange={() => {}}
          />
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
              <Th align="left">商品信息</Th>
              <Th align="right">价格（元）</Th>
              <Th align="left">售卖时间</Th>
              <Th align="right">剩余库存</Th>
              <Th align="right">待核销</Th>
              <Th align="left">操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td align="left"><TableCellProduct img="../../assets/shangpin.png" title="【节假日通用】资生堂烫染护理" tag="团购" tagVariant="default" id="23468723648223" /></Td>
              <Td align="right"><TableCellAmount>￥508.00</TableCellAmount></Td>
              <Td align="left">2023.08.01 12:00</Td>
              <Td align="right">10,000</Td>
              <Td align="right">500</Td>
              <Td align="left">
                <TableCellOperation>
                  <TableCellAction>上架</TableCellAction>
                  <TableCellAction disabled>编辑</TableCellAction>
                </TableCellOperation>
              </Td>
            </Tr>
            <Tr>
              <Td align="left"><TableCellProduct img="../../assets/shangpin.png" title="【工作日可用】高级洗剪吹套餐" tag="热销" tagVariant="orange" id="89345723648224" /></Td>
              <Td align="right"><TableCellAmount>￥128.00</TableCellAmount></Td>
              <Td align="left">2023.08.02 14:30</Td>
              <Td align="right">8,500</Td>
              <Td align="right">240</Td>
              <Td align="left">
                <TableCellOperation>
                  <TableCellAction disabled>下架</TableCellAction>
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
- 表单页所在的典型页面底层背景默认沿用 [页面基础框架](#页面基础框架) 中的 `var(--color-bg-gray)`，右侧内容主画布 `.app-body` 继续使用 `var(--color-bg-normal)`；吸底操作区继续使用 `var(--color-bg-normal)`，不要跟随页面底层背景一起变灰；
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
│       ├── .form-page-steps (步骤条容器，可选，父容器内居中)
│       │   └── <Steps /> (保持组件默认宽度，不拉伸到父容器)
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
4. **步骤条**：仅当表单存在明确先后顺序、多阶段填写或“上一步 / 下一步 / 提交审核”语义时使用 `<Steps />`；平级切换不要使用步骤条，应使用 `Tabs`。步骤条在表单页中应保持组件默认宽度，不要拉伸到表单内容容器整行；实现上建议额外包一层 `.form-page-steps` 容器，在父容器内水平居中对齐。
5. **表单区**：字段必须使用 `Form` + `FormItem` 组织；如果存在多个业务主题，应拆成多个分组，每组由“分组标题 + Form 组件”组成。
6. **全局操作区**：放置影响整个表单的操作按钮组，也可放置协议同意勾选；该区域在表单页中通常为吸底布局，固定贴在 `app-body` 底部。实现上优先作为 `.app-body` 下、`.app-content` 外的兄弟节点，而不是放进滚动容器内部，这样可以保留基础框架的底部内边距且不会出现露底问题。操作区背景需使用 `var(--color-bg-normal)`，顶部与正文之间的分割线使用 `var(--color-divider-normal)`。操作区内部内容仍需使用独立容器居中，宽度与表单内容容器保持一致；按钮组间距使用 `var(--spacing-3x)`，同一区域最多一个 `primary` 按钮。Footer 默认只承载全局操作按钮，不要在这里混入说明文案、字段解释、状态描述或其他正文信息；如果存在全局协议同意信息，使用 `Checkbox` 单独放在按钮组正上方，按钮组本身仍然保持水平居中。
7. **块间距**：统领信息区、步骤条、表单区、全局操作区这些页面级块之间的垂直间距统一使用 `var(--spacing-8x)`，即 32px。
8. **聚合区分割线**：统领信息区下方一般会有一根虚线分割线，用于和后续步骤条或表单区分隔；分割线与上方、下方内容之间的间距都使用 `var(--spacing-8x)`，也遵循页面级块间距规则。分割线颜色使用 `var(--color-border-normal)`。

#### 统领信息区规范

- 统领信息区用于“先告诉用户正在编辑什么”，不要放普通字段录入项，也不要替代表单区。
- 统领信息区不需要使用卡片、灰底或描边容器包裹，应直接在表单内容容器内平铺展示，通过内容排版和留白建立层级。
- 当统领信息区下方需要与步骤条或表单正文做弱分隔时，优先使用一根浅色虚线分割线，而不是重新包一层卡片；分割线前后间距都为 `var(--spacing-8x)`，颜色使用 `var(--color-border-normal)`。
- 图文样式适合展示商品、门店、资质主体等带缩略图的对象；纯文本样式适合展示经营主体、计划名称、编号、金额等关键信息。
- 标题可使用 `font: var(--display-medium)` 或 `font: var(--title-medium)`，根据内容重要性选择；辅助信息使用 `font: var(--body-regular)`。
- 颜色、圆角、背景、边框和间距必须使用 `life-ds-tokens.css` 中的语义化 tokens，不要硬编码色值。
- 金额、价格、成交额、库存、统计指标等数据型重点信息可使用 `font-family: var(--font-number)`；编号、ID、时间、纯英文串等内容仍使用 `var(--font-normal)`。

#### 表单分组规范

- 分组标题使用 Figma 对应的 `标题 title/medium` 样式，在代码中映射为 `font: var(--title-medium)`。
- 分组标题只负责表达当前字段组主题，例如“基础信息”“商品信息”“资质信息”；不要把说明文案、状态标签或操作按钮塞进标题。
- 组内字段直接使用 `Form` + `FormItem`，不要手写 `.lds-form` 结构；字段必填、说明、错误态、帮助提示遵循 [form.md](form.md)。
- 如果只有一个简单主题，也可以只有一个分组，但仍建议保留分组标题以稳定页面层级。

#### 全局操作区规范

- 全局操作区一般位于表单区底部，用于提交、保存草稿、取消、上一步、下一步等影响整页的动作。
- Footer 默认只放全局操作按钮，不要塞入说明文案、提示段落、字段解释或其他正文信息。
- 如果提交前需要用户同意协议，使用 `Checkbox` 放在按钮组正上方，文案中协议名称可使用链接色 token；不要把协议勾选放到按钮左侧，更不要让按钮组失去居中对齐。
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
                  <span style={{ color: 'var(--color-text-primary)' }}>
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

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 'var(--spacing-8x)',
            }}
          >
            <Steps
              style={{ width: 'fit-content', maxWidth: '100%' }}
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

### 表单页 - 带预览图 (Form Page With Preview)

适用场景：当表单在填写过程中需要同步预览用户端或素材端的最终展示效果时使用，例如商品卡、门店卡、详情头图、海报预览等。这类页面本质上仍然属于表单页，但右侧会增加一个独立预览区。

- 适用于“左侧填写配置，右侧实时预览”的场景，例如商品装修、投放素材配置、卡片样式配置、详情头图配置；
- 页面基础框架、导航区、统领信息区、步骤条、表单区、全局操作区仍然遵循 [表单页 (Form Page)](#表单页-form-page) 的基础规则；
- 这类页面的底层页面背景同样默认使用 `var(--color-bg-gray)`，右侧内容主画布 `.app-body` 继续使用 `var(--color-bg-normal)`；仅底部吸底操作区继续使用 `var(--color-bg-normal)`；
- 与普通表单页不同的是，表单正文阶段需要额外引入预览区：左侧为窄表单内容区，右侧为预览图区域，两者放在同一个父容器中两端对齐。

#### 页面结构层级 (Tree Structure)

以下是一个典型的带预览图表单页结构层级：

```text
.app-body (表单页主容器)
├── .app-content (页面滚动内容区)
│   ├── <PageHeader variant="secondary" /> (导航区，必选)
│   └── .form-page-preview-layout (表单 + 预览图联合容器)
│       ├── .form-page-content (左侧窄表单内容区，宽度 648px)
│       │   ├── .form-page-hero (统领信息区，可选但常用，直接平铺展示)
│       │   ├── .form-page-divider (可选：统领信息区和下方内容之间的分割线)
│       │   ├── .form-page-steps (步骤条容器，可选，父容器内居中)
│       │   │   └── <Steps /> (保持组件默认宽度，不拉伸到父容器)
│       │   └── .form-page-form (表单区)
│       │       ├── .form-page-section (表单分组)
│       │       └── .form-page-section (其他表单分组，可选)
│       └── .form-page-preview
│           ├── .form-page-preview__header
│           │   ├── .form-page-preview__title (预览区标题)
│           │   └── .form-page-preview__desc (附属说明，标题右侧)
│           ├── <Tabs variant="capsule" size="small" /> (可选：多预览图切换，保持组件自身宽度)
│           └── .form-page-preview__device
│               └── <img /> (预览图本体，裁切进圆角设备外轮廓中)
└── .form-page-actions (全局操作区，吸底)
    └── .form-page-actions__inner (内容始终居中，宽度 648px)
        ├── <Checkbox /> (协议同意，可选)
        └── .form-page-actions__buttons
            ├── <Button variant="default" />
            ├── <Button variant="secondary" />
            └── <Button variant="primary" />
```

#### 区域规则

1. **联合容器**：左侧表单区与右侧预览区必须包裹在同一个父容器中，两端对齐展示；联合容器左侧需要额外留出 `var(--spacing-12x)`（48px）的空间，用于与页面整体版心保持更舒展的视觉关系。
2. **左右间距**：左侧窄表单区与右侧预览区之间的水平间距使用 `var(--spacing-10x)`（40px），不要再使用 32px 或其他任意值。
3. **左侧表单宽度**：左侧表单内容区固定为 648px 宽，不再沿用普通表单页的 648px ~ 872px 浮动区间；统领信息区、分割线、步骤条、表单分组和上下间距规则与普通表单页保持一致。
4. **预览区标题**：预览区标题与附属说明需要同一行展示，并使用文字基线对齐；标题与说明之间的水平间距使用 `var(--spacing-3x)`（12px）。
5. **附属说明**：附属说明用于解释预览区的操作语义，例如“点击图片对应区域可直接修改”；说明文案应简短，不要写成长段解释。
6. **预览区 Tabs**：如果存在多个预览图切换，可使用 `Tabs variant="capsule" size="small"`；Tabs 一般按照组件自身内容宽度渲染，不要主动拉伸到预览区整行，也不要和预览图再包成额外卡片。
7. **预览图本体**：预览图区域不需要外层卡片包裹；如果是手机端截图类预览，建议使用一个圆角矩形设备外轮廓承载图片，外轮廓描边为 6px，图片本体裁切在轮廓内部，不允许露出四角。
8. **全局操作区**：即使页面上半部分是“双栏布局”，底部全局操作区内容也始终保持居中，不要对齐到左侧表单列。Footer 默认只放全局操作按钮；若存在协议同意信息，也只能放在按钮组正上方，不能在 footer 内混入其他说明文案。

#### 预览区规范

- 预览区用于辅助用户校验“填写结果在消费端如何展示”，不要把普通帮助提示、说明文档、字段备注塞进这里。
- 标题建议使用 `font: var(--title-medium)`；附属说明建议使用 `font: var(--body-regular)` 和较低强调文字色。
- 标题区、Tabs、预览图本体应共享同一左边界；预览图不要额外居中偏移。
- 如果预览内容只是展示单张图，直接使用一张图片即可，不需要额外模拟完整页面细节。
- 如果需要多图切换，建议维持 2 到 3 个 Tab；超过 3 个时优先审视是否应该拆成独立预览场景。

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
  Tab,
  Tabs,
  Textarea,
} from '@life-ds/components-web';

export function FormPageWithPreviewDemo() {
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
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--spacing-10x)',
            paddingLeft: 'var(--spacing-12x)',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: 648,
              minWidth: 648,
              maxWidth: 648,
              paddingTop: 'var(--spacing-2x)',
              paddingBottom: 'var(--spacing-8x)',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-8x)',
              }}
            >
              <Steps
                style={{ width: 'fit-content', maxWidth: '100%' }}
                current={1}
                items={[
                  { title: '填写基础信息' },
                  { title: '配置预览素材' },
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
                  <FormItem label="商品名称" htmlFor="name" required>
                    <Input id="name" placeholder="请输入商品名称" />
                  </FormItem>
                  <FormItem label="附属说明" htmlFor="summary">
                    <Textarea id="summary" placeholder="请输入附属说明" />
                  </FormItem>
                </Form>
              </section>
            </main>
          </div>

          <aside
            style={{
              width: 360,
              flex: '0 0 360px',
              display: 'grid',
              gap: 'var(--spacing-4x)',
              paddingTop: 'var(--spacing-2x)',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--spacing-3x)',
              }}
            >
              <h2 style={{ margin: 0, font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                商品预览图
              </h2>
              <p style={{ margin: 0, font: 'var(--body-regular)', color: 'var(--color-text-secondary)' }}>
                点击图片对应区域可直接修改
              </p>
            </div>

            <div style={{ width: 'fit-content', maxWidth: '100%' }}>
              <Tabs variant="capsule" size="small" defaultValue="cover">
                <Tab value="cover">商品卡</Tab>
                <Tab value="store">门店卡</Tab>
              </Tabs>
            </div>

            <div
              style={{
                width: '100%',
                maxWidth: 304,
                border: '6px solid #0c0d0f',
                borderRadius: 42,
                background: '#0c0d0f',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  aspectRatio: '292 / 632',
                  borderRadius: 36,
                  overflow: 'hidden',
                  background: 'var(--color-fill-gray)',
                }}
              >
                <img
                  src="./assets/shangpin.png"
                  alt="商品卡预览"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer
        style={{
          padding: 'var(--spacing-5x) var(--spacing-8x)',
          borderTop: '1px solid var(--color-divider-normal)',
          background: 'var(--color-bg-normal)',
        }}
      >
        <div
          style={{
            width: 648,
            minWidth: 648,
            maxWidth: 648,
            margin: '0 auto',
            display: 'grid',
            justifyContent: 'center',
            gap: 'var(--spacing-4x)',
          }}
        >
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

### 详情页 (Detail Page)

适用场景：详情页用于浏览已经录入完成的结构化信息，常见于从列表页点击“查看详情”后进入的二级页面。

- 当用户明确提出是详情页、查看页、结果页、审核详情页、配置详情页、资质详情页时使用此类型；
- 详情页整体布局与 [表单页 (Form Page)](#表单页-form-page) 高度相似，仍然遵循“页面基础框架 + 二级页 PageHeader + 统领信息区 + 分组内容区 + 可选全局操作区”的结构；
- 与表单页最大的区别在于：编辑控件全部转为浏览态内容展示，输入框、下拉框、日期控件、时间控件等都不再出现；
- 页面底层背景仍然默认沿用 [页面基础框架](#页面基础框架) 中的 `var(--color-bg-gray)`，右侧内容主画布 `.app-body` 继续使用 `var(--color-bg-normal)`。

#### 页面结构层级 (Tree Structure)

以下是一个典型的详情页结构层级：

```text
.app-body (详情页主容器)
├── .app-content (页面滚动内容区)
│   ├── <PageHeader variant="secondary" /> (导航区，必选)
│   └── .detail-page-content (详情页内容容器，居中，宽度 648px ~ 872px)
│       ├── .detail-page-hero (统领信息区，可选但常用，直接平铺展示)
│       │   ├── .detail-page-hero__media (可选：图片、图标、对象缩略图)
│       │   └── .detail-page-hero__content
│       │       ├── .detail-page-hero__title
│       │       └── .detail-page-hero__meta
│       ├── .detail-page-divider (可选：与正文之间的分割线)
│       └── .detail-page-sections
│           ├── .detail-page-section
│           │   ├── .detail-page-section__title
│           │   └── <KeyValue /> / <Card /> / <TableWrapper />
│           └── .detail-page-section (其他业务分组，可选)
└── .detail-page-actions (全局操作区，可选)
    └── .detail-page-actions__inner
        ├── <Button variant="default" />
        ├── <Button variant="secondary" />
        └── <Button variant="primary" />
```

#### 区域规则

1. **导航区**：详情页属于二级页面，必须使用 `<PageHeader variant="secondary" />`。
2. **内容宽度**：详情页正文沿用表单页的版心范围，最大宽度 872px，最小宽度 648px，在内容区内水平居中；上间距使用 `var(--spacing-2x)`，下间距使用 `var(--spacing-8x)`。
3. **统领信息区**：仍然需要“先告诉用户正在查看什么”，可以展示对象名称、编号、主体名称、金额、门店、时间范围等关键摘要信息；不要直接把普通字段堆进这个区域。
4. **字段展示方式**：原本在表单页中由 `Input`、`Select`、`DatePicker`、`TimePicker`、`Textarea` 承担的字段，在详情页里统一转为 key value 浏览态展示，并优先使用 [keyvalue.md](keyvalue.md) 中定义的 `KeyValue` 组件族搭建。
5. **key value 结构**：详情页里的 key value 默认沿用表单页的左右结构，即左侧固定标签区、右侧为值区；只有在字段容器明显过窄或卡片内补充信息位等窄场景，才切换为上下结构。不要手写一套临时的详情页字段样式。
6. **双列展示**：如果单个字段信息量不大，优先使用双列 `KeyValue` 布局，提高信息密度；如果字段值较长，如地址、规则说明、卖点描述，可让该项跨两列单独展示。
7. **复杂信息**：如果内容更适合结构化组合，可在 `KeyValueItem` 的 `value` 区中承载 `Card`；如果只是普通说明文案，直接使用文本块，不要为了形式统一强行塞进 `Card`。
8. **表格信息**：列表型从属信息仍然使用 `Table` 展示，但一般不再放行内编辑、上传入口、下拉切换等操作；默认按只读模式处理。
9. **图片信息**：表单页中的上传组件进入详情页后，应转为上传完成后的图片展示；展示时依旧遵循 key value 结构，只是 `value` 区从纯文本变为图片组。优先使用 `KeyValueImages` / `KeyValueImage`，图片尺寸按 [keyvalue.md](keyvalue.md) 中的规则根据内容类型调整。
10. **块间距**：统领信息区、分组区、表格区、Card 区、图片区这些页面级块之间的垂直间距统一使用 `var(--spacing-8x)`。
11. **全局操作区**：详情页底部全局操作区是可选的。仅当页面存在“返回列表”“复制配置”“刷新状态”“再次提交”等整页级动作时才展示。Footer 默认只放全局操作按钮，并保持整体居中；不要在这里补说明文案、状态解释或字段补充信息。若确实存在全局协议同意信息，也应放在按钮组正上方，按钮组本身仍然保持居中。

#### key value 展示规范

- 详情页中的结构化字段展示，请先阅读 [keyvalue.md](keyvalue.md)，并优先使用 `<KeyValue />`、`<KeyValueItem />`、`<KeyValueText />`、`<KeyValueImages />` 等现成组件。
- 标签文案（key）使用 `font: var(--body-regular)` + `var(--color-text-caption)`。
- 内容文案（value）使用 `font: var(--body-regular)` + `var(--color-text-primary)`。
- 默认采用“左 key / 右 value”的横向结构，建议标签区宽度与表单页 label 宽度保持相近，形成稳定对齐关系。
- KeyValue 单项默认间距使用 `var(--spacing-4x)`，不要在详情页字段区手动改成更松或更紧的另一套节奏。
- 仅当单元本身很窄，或值区本身是小体量补充信息时，才允许改为上下结构。
- 金额、价格、成交额、库存、统计指标等数据型重点内容可使用 `font-family: var(--font-number)`；编号、ID、时间、纯英文串等内容仍使用 `var(--font-normal)`。
- 不要使用只读的 `Input disabled` 或只读的 `Select` 来伪装详情态；详情页就是普通文本，不是禁用表单。
- 当一个值可能换行时，允许自动换行；不要为了对齐把值截断成单行。

#### 标准结构示例

```tsx
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  KeyValue,
  KeyValueImage,
  KeyValueImages,
  KeyValueItem,
  KeyValueText,
  PageHeader,
  Table,
  Tag,
  TableWrapper,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@life-ds/components-web';

export function DetailPageLayoutDemo() {
  return (
    <div className="app-body">
      <div className="app-content">
        <PageHeader
          variant="secondary"
          title="团购商品详情"
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
                borderRadius: 'var(--radius-m)',
                overflow: 'hidden',
                background: 'var(--color-fill-gray)',
              }}
            >
              <img
                src="./assets/shangpin.png"
                alt="商品缩略图"
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-2x)' }}>
              <h2 style={{ margin: 0, font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                资生堂烫染护理团购
              </h2>
              <div style={{ display: 'grid', gap: 'var(--spacing-base)', font: 'var(--body-regular)' }}>
                <div>
                  <span style={{ color: 'var(--color-text-caption)' }}>商品编号：</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>
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

          <main style={{ display: 'grid', gap: 'var(--spacing-8x)' }}>
            <section>
              <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                基础信息
              </h2>
              <KeyValue columns={2}>
                <KeyValueItem label="商品名称" value={<KeyValueText value="资生堂烫染护理团购" />} />
                <KeyValueItem label="经营类目" value={<KeyValueText value="丽人 / 美发" />} />
                <KeyValueItem label="创建人" value={<KeyValueText value="王小美" />} />
                <KeyValueItem label="创建时间" value={<KeyValueText value="2026.06.08 14:30" />} />
                <KeyValueItem
                  label="商品卖点"
                  span={2}
                  value={<KeyValueText value="节假日通用，含洗护、烫染护理和造型服务，支持提前一天预约。" />}
                />
              </KeyValue>
            </section>

            <section>
              <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                服务说明
              </h2>
              <Card size="small">
                <CardHeader
                  title="套餐服务摘要"
                  addon={<Tag size="small" variant="light" color="green">可预约</Tag>}
                  description="复杂说明信息优先通过 Card 承载，组合展示标签、摘要和后续动作。"
                />
                <CardBody>
                  <div style={{ display: 'grid', gap: 'var(--spacing-4x)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2x)' }}>
                      <Tag size="small" variant="outline" color="gray">节假日通用</Tag>
                      <Tag size="small" variant="outline" color="gray">支持提前预约</Tag>
                      <Tag size="small" variant="outline" color="gray">随时退款</Tag>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 'var(--spacing-2x)' }}>
                      <li>服务内容包含洗护、烫染护理和基础造型设计。</li>
                      <li>至少提前 1 天预约，支持门店核销后立即使用。</li>
                      <li>已预约订单请至少提前 2 小时联系门店修改时间。</li>
                    </ul>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button variant="secondary">查看完整规则</Button>
                </CardFooter>
              </Card>
            </section>

            <section>
              <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                商品素材
              </h2>
              <KeyValue columns={1}>
                <KeyValueItem
                  label="商品图片"
                  value={
                    <KeyValueImages>
                      {['商品主图', '服务环境图', '套餐说明图'].map((item) => (
                        <KeyValueImage key={item} src="./assets/shangpin.png" alt={item} label={item} />
                      ))}
                    </KeyValueImages>
                  }
                />
              </KeyValue>
            </section>

            <section>
              <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
                适用门店
              </h2>
              <TableWrapper>
                <Table>
                  <Thead>
                    <Tr>
                      <Th align="left">门店名称</Th>
                      <Th align="left">城市</Th>
                      <Th align="left">售卖周期</Th>
                      <Th align="right">分配库存</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td align="left">朝阳大悦城店</Td>
                      <Td align="left">北京</Td>
                      <Td align="left">2026.06.01 - 2026.06.30</Td>
                      <Td align="right">500</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableWrapper>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
```

### 详情页 - 带状态 (Detail Page With Status)

适用场景：当详情页需要在顶部统领区域强调“审核中 / 已通过 / 已驳回 / 已发布 / 已失效”等总体状态时，使用带状态详情页。

- 这类页面本质上仍然是详情页，只是在 `PageHeader` 下方增加了 `Status` 作为统领状态展示；
- 状态表达优先使用 [status.md](status.md) 中定义的 `Status` 组件，而不是放大版 `Tag`；
- 除状态区外，其余内容区仍然遵循普通详情页的 key value、Card、Table、图片展示等规则；
- 若页面存在“返回列表”“刷新状态”“再次提交”“催审提醒”等整页级动作，可增加底部全局操作区。

#### 页面结构层级 (Tree Structure)

```text
.app-body (带状态详情页主容器)
├── .app-content (页面滚动内容区)
│   ├── <PageHeader variant="secondary" /> (导航区)
│   └── .detail-page-content
│       ├── <Status /> (统领状态区，必选)
│       └── .detail-page-sections
│           ├── .detail-page-section (<KeyValue /> 承载基础信息)
│           ├── .detail-page-section (<KeyValue /> + <KeyValueImages /> 承载资质材料)
│           ├── .detail-page-section (正文文本块承载审核说明)
│           └── .detail-page-section (<TableWrapper /> 承载审核记录)
└── .detail-page-actions (可选)
    └── .detail-page-actions__inner
```

#### 区域规则

1. **状态区位置**：`Status` 必须位于 `PageHeader` 下方、正文内容区最上方，承担统领状态表达职责。
2. **状态区样式**：默认不加卡片、不加底色、不加描边；如果视觉上需要更多留白，应由外层布局间距解决，而不是给 `Status` 本身加容器。
3. **颜色选择**：进行中、审核中优先使用 `color="blue"` 或 `color="orange"`；通过使用 `green`；失败、驳回使用 `red`；中性状态使用 `gray` 或 `black`。
4. **描述长度**：`Status` 的 `description` 控制在两行左右的信息量，用于解释当前结果、下一步动作或失败原因。
5. **复杂说明**：审核关注点、驳回原因、整改建议等长文本说明，不要全部塞进 `Status description`；如果内容更适合结构化组合，可用 `Card` 承载，如果只是普通说明文案，直接使用正文文本块即可。
6. **表格只读**：表格中可以展示审核记录、绑定门店、操作留痕等内容，但不再放置编辑、删除、上传等交互单元。
7. **底部操作区**：如果存在状态相关动作，按钮组间距统一使用 `var(--spacing-3x)`，最多一个 `primary` 按钮。Footer 默认只承载这些全局动作按钮，并保持居中；不要额外塞说明文案。若存在全局协议同意信息，放在按钮组正上方即可，按钮组仍保持居中。

#### 标准结构示例

```tsx
import React from 'react';
import {
  Button,
  KeyValue,
  KeyValueImage,
  KeyValueImages,
  KeyValueItem,
  KeyValueText,
  PageHeader,
  Status,
  Table,
  TableCellTag,
  TableWrapper,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@life-ds/components-web';

export function DetailPageWithStatusDemo() {
  return (
    <div className="app-body">
      <div className="app-content">
        <PageHeader
          variant="secondary"
          title="资质详情"
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
            display: 'grid',
            gap: 'var(--spacing-8x)',
          }}
        >
          <Status
            color="orange"
            title="审核中"
            description="当前门店资质信息已提交平台审核，预计 1 个工作日内返回结果，如需补件将通过站内消息通知。"
          />

          <section>
            <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
              基础信息
            </h2>
            <KeyValue columns={2}>
              <KeyValueItem label="主体名称" value={<KeyValueText value="瑞幸咖啡（中国）有限公司" />} />
              <KeyValueItem label="提交时间" value={<KeyValueText value="2026.06.08 16:30" />} />
            </KeyValue>
          </section>

          <section>
            <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
              资质材料
            </h2>
            <KeyValue columns={1}>
              <KeyValueItem
                label="资质图片"
                value={
                  <KeyValueImages>
                    <KeyValueImage src="./assets/shangpin.png" alt="营业执照" label="营业执照" />
                    <KeyValueImage src="./assets/shangpin.png" alt="品牌授权书" label="品牌授权书" />
                  </KeyValueImages>
                }
              />
            </KeyValue>
          </section>

          <section>
            <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
              审核说明
            </h2>
            <div style={{ display: 'grid', gap: 'var(--spacing-3x)' }}>
              <p style={{ margin: 0, font: 'var(--body-regular)', color: 'var(--color-text-primary)' }}>
                1. 请确认营业执照主体名称与门店签约主体保持一致。
              </p>
              <p style={{ margin: 0, font: 'var(--body-regular)', color: 'var(--color-text-primary)' }}>
                2. 若为加盟门店，请补充上传最新品牌授权书，确保在有效期内。
              </p>
            </div>
          </section>

          <section>
            <h2 style={{ margin: '0 0 var(--spacing-5x)', font: 'var(--title-medium)', color: 'var(--color-text-primary)' }}>
              审核记录
            </h2>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th align="left">材料名称</Th>
                    <Th align="left">提交时间</Th>
                    <Th align="center">审核结果</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td align="left">营业执照</Td>
                    <Td align="left">2026.06.08 16:30</Td>
                    <Td align="center">
                      <TableCellTag color="green">审核通过</TableCellTag>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableWrapper>
          </section>
        </div>
      </div>

      <footer
        style={{
          padding: 'var(--spacing-5x) var(--spacing-8x)',
          borderTop: '1px solid var(--color-divider-normal)',
          background: 'var(--color-bg-normal)',
        }}
      >
        <div style={{ width: 872, minWidth: 648, maxWidth: 872, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'var(--spacing-3x)' }}>
          <Button variant="default">返回列表</Button>
          <Button variant="secondary">刷新状态</Button>
          <Button variant="primary">催审提醒</Button>
        </div>
      </footer>
    </div>
  );
}
```
