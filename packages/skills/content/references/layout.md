# 布局 (Layout)

适用于不同类型的布局模式。每个页面请选择一种模式，切勿混用。

### 页面基础框架

除非是全屏页面、弹框等非典型页面类型，否则必须使用这个基础结构构建页面的基础框架。包含顶部导航、左侧菜单和中间内容区域，对于大部分页面，均需要遵循此结构，且不要对组件和样式进行修改！

在 React 项目中，必须优先使用 `@life-ds/components-web` 提供的 `Navbar`、`Menu`、`Input`、`PageHeader`、`Tabs` 等现成组件来搭建基础框架，禁止手写 `.lds-navbar`、`.lds-menu`、`.lds-tabs`、`.lds-input` 等 DOM 结构与 class 组合。

其中 `Navbar` 已内置默认的 logo、搜索区、导航项、右侧操作区和用户区内容，页面中直接使用 `<Navbar />` 即可，不要自行修改图标、logo、导航文案、选中项和用户区内容。`Navbar` 不再提供 `NavbarLeft`、`NavbarMiddle`、`NavbarRight`、`NavbarLogo`、`NavbarSearch`、`NavbarNav`、`NavbarNavItem`、`NavbarAction`、`NavbarDivider`、`NavbarUser` 等组合式子组件。

其中 `Menu` 已内置默认的 6 组侧边导航内容，页面中直接使用 `<Menu />` 即可，不要自行增删菜单组、菜单项数量或修改默认文案。默认分组为：`常用`、`店铺`、`订单`、`财务`、`达人带货`、`内容推广`。

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
