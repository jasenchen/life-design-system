# 布局 (Layout)

适用于不同类型的布局模式。每个页面请选择一种模式，切勿混用。

### 页面基础结构

基础结构包含顶部导航、左侧导航和中间内容区域，对于大部分页面，均需要遵循此结构，且对应组件和样式不需要调整。

实现结构请参考：references/sample-page.html，其中app-body里的内容仅为参考内容，其他部分则为固定内容

```html
<div class="app-container">
  <!-- 顶部导航 -->
  <header class="app-navbar">
    <!-- 在此插入 .lds-navbar 组件内容 -->
  </header>

  <!-- 内容包裹区 -->
  <div class="app-main-wrapper">
    <!-- 左侧菜单 -->
    <aside class="app-sidebar">
      <div class="app-sidebar__menu">
        <!-- 在此插入 .lds-menu 组件内容 -->
      </div>
    </aside>

    <!-- 右侧主内容区域 (Body) -->
    <div class="app-body">
      <!-- 页面标题/页签 -->
      <section class="lds-page-header">
        <!-- 在此插入 .lds-page-header 内容 -->
      </section>

      <!-- 实际内容滚动区 -->
      <div class="app-content">
        <!-- 在此插入具体的业务内容 (如卡片、表格等) -->
      </div>
    </div>
  </div>
</div>
```

### 核心框架样式 (CSS)

请在页面的 `<style>` 标签或全局样式中包含以下代码：

```css
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.app-navbar {
  flex-shrink: 0;
}

.app-main-wrapper {
  display: flex;
  flex: 1;
  z-index: 1;
  min-height: 0;
}

.app-sidebar {
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  min-height: 0;
}

.app-sidebar__menu {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
  scrollbar-width: none;
}
.app-sidebar__menu::-webkit-scrollbar { display: none; }

.app-body {
  flex: 1;
  background-color: var(--color-bg-normal);
  box-shadow: var(--shadow-large);
  border-top-left-radius: var(--radius-xxl, 24px);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 101;
  margin-top: -1px;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--spacing-8x, 32px) var(--spacing-8x, 32px);
}
```

<br />

1. **初始化结构**：始终从 `.app-container` 开始构建页面。
2. **内容填充**：将具体业务逻辑放入 `.app-content` 中，并根据 [布局模式](#布局模式) 选择合适的布局。
3. **样式覆盖**：除非用户明确要求，否则不要修改上述核心框架的 `width`、`z-index` 和 `flex` 属性。
4. **阴影处理**：确保 `.app-body` 的 `z-index` 高于侧边栏和导航栏，以保证 `shadow-large` 投影效果正常显示。

## 页面类型

### 列表页 (List Page)

适用场景：列表页是后台管理系统中最为常见的页面类型，主要用于展示、搜索和操作大批量数据。

#### 页面结构层级 (Tree Structure)

以下是一个典型的列表页结构层级：

```text
.app-content (页面主容器)
├── .lds-page-header (页面标题区)
├── .lds-filter-card (搜索/筛选区，可选)
│   └── .lds-filter-row (筛选组件，可选)
├── .lds-action-bar (状态与操作工具栏)
│   ├── .lds-tabs--capsule (左侧: 数据状态页签)
│   └── .lds-actions (右侧: 新建/导出等全局操作)
├── .lds-table-wrapper (数据表格区域)
│   └── .lds-table (核心数据表格，table组件)
│       ├── .lds-table__thead (表头)
│       └── .lds-table__tbody (数据行)
└── .lds-pagination-wrapper (分页器区域)
    └── .lds-pagination (分页组件)
```

#### 标准结构示例

```html
<div class="app-content">
  <!-- 1. 页面标题 -->
  <section class="lds-page-header">
    <h1 class="lds-page-header__title">商品管理</h1>
  </section>

  <!-- 2. 搜索/筛选区 -->
  <div class="lds-filter-card" style="margin-bottom: var(--spacing-5x);">
    <div class="lds-filter-row">
      <!-- 各种筛选控件 (Input/Select) -->
      <button class="lds-btn lds-btn--primary">查询</button>
      <button class="lds-btn">重置</button>
    </div>
  </div>

  <!-- 3. 状态页签与操作区 -->
  <div class="lds-action-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-4x);">
    <div class="lds-tabs lds-tabs--capsule lds-tabs--small">
      <a href="#" class="lds-tab is-active">全部</a>
      <a href="#" class="lds-tab">已上架</a>
      <!-- ...其他状态 -->
    </div>
    <div class="lds-actions">
      <button class="lds-btn lds-btn--primary">创建商品</button>
    </div>
  </div>

  <!-- 4. 数据表格 -->
  <div class="lds-table-wrapper">
    <table class="lds-table">
      <!-- 表头与内容 -->
    </table>
  </div>

  <!-- 5. 分页器 -->
  <div class="lds-pagination-wrapper" style="margin-top: var(--spacing-5x); display: flex; justify-content: flex-end;">
    <!-- 分页组件内容 -->
  </div>
</div>
```

<br />

<br />

当需要生成一个新的完整页面时，请务必使用以下标准 HTML 结构和 CSS 样式。这确保了页面拥有统一的顶部导航、侧边菜单以及带阴影的内容区域。
