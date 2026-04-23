# 布局 (Layout)

适用于不同类型的布局模式。每个页面请选择一种模式，切勿混用。

### 页面基础框架

除非是全屏页面、弹框等非典型页面类型，否则必须使用这个基础结构构建页面的基础框架。包含顶部导航、左侧菜单和中间内容区域，对于大部分页面，均需要遵循此结构，且不要对组件和样式进行修改！

实现结构请参考以下 HTML，其中 `.app-body` 里的内容仅为参考内容，其他部分则为固定结构：

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
  
  <link rel="stylesheet" href="./packages/tokens/life-ds-tokens.css">
  <link rel="stylesheet" href="./packages/components-web/styles/base.css">
  <link rel="stylesheet" href="./packages/components-web/styles/components.css">
</head>
<body>

<div class="app-container">
  <!-- 顶部 Navbar (贯穿整个页面) -->
  <header class="app-navbar">
    <div class="lds-navbar">
      <div class="lds-navbar__left">
        <!-- 移除内部的 img 标签，利用 components.css 中 .lds-navbar__logo 的默认内联背景 SVG 来渲染 Logo -->
        <div class="lds-navbar__logo"></div>
      </div>
      <div class="lds-navbar__middle">
        <div class="lds-navbar__search">
          <div class="lds-input-wrapper lds-input-wrapper--default-size">
            <span class="lds-input__prefix" style="margin-right: 8px; color: var(--color-text-caption); display: flex; align-items: center;">
              <svg class="icon" style="width:16px;height:16px;"><use href="#ic-search-line"></use></svg>
            </span>
            <input type="text" class="lds-input" placeholder="你可以问：在哪里修改官方抖音号">
          </div>
        </div>
        <nav class="lds-navbar__nav">
          <a href="#" class="lds-navbar__nav-item is-active">首页</a>
          <a href="#" class="lds-navbar__nav-item">生意经</a>
          <a href="#" class="lds-navbar__nav-item">本地推</a>
          <a href="#" class="lds-navbar__nav-item">学习中心</a>
        </nav>
      </div>
      <div class="lds-navbar__right">
        <div class="lds-navbar__action">
          <svg class="icon" style="width:16px;height:16px;"><use href="#ic-reset-line"></use></svg>
          <span>返回旧版</span>
        </div>
        <div class="lds-navbar__divider"></div>
        <div class="lds-navbar__action">
          <svg class="icon" style="width:16px;height:16px;"><use href="#ic-mobile-line"></use></svg>
          <span>App下载</span>
        </div>
        <div class="lds-navbar__divider"></div>
        <div class="lds-navbar__user">
          <img src="./assets/avatar.png" class="lds-navbar__avatar" alt="Avatar">
          <div class="lds-navbar__user-info">
            <span class="lds-navbar__username">北京八十五度...</span>
            <svg class="icon"><use href="#ic-arrow-down-line"></use></svg>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 下方区域 (左侧菜单 + 右侧内容) -->
  <div class="app-main-wrapper">
    <!-- 左侧 Menu -->
    <aside class="app-sidebar">
      <div class="app-sidebar__menu">
        <div class="lds-menu">
          <!-- Group 1: 常用 -->
          <div class="lds-menu-group">
            <div class="lds-menu-group__header" onclick="handleMenuHeaderClick(this)">
              <svg class="icon"><use href="#ic-all-line"></use></svg>
              <span class="lds-menu-group__title">常用</span>
              <svg class="icon lds-menu-group__action"><use href="#ic-setting-line"></use></svg>
            </div>
            <div class="lds-menu-group__content">
              <div class="lds-menu-item" onclick="handleMenuItemClick(this)">门店管理</div>
              <div class="lds-menu-item is-active" onclick="handleMenuItemClick(this)">团购商品管理</div>
              <div class="lds-menu-item" onclick="handleMenuItemClick(this)">店铺装修</div>
              <div class="lds-menu-item" onclick="handleMenuItemClick(this)">评价管理</div>
            </div>
          </div>
          
          <!-- Group 2: 店铺 -->
          <div class="lds-menu-group">
            <div class="lds-menu-group__header" onclick="handleMenuHeaderClick(this)">
              <svg class="icon"><use href="#ic-store-line"></use></svg>
              <span class="lds-menu-group__title">店铺</span>
              <svg class="icon lds-menu-group__action"><use href="#ic-arrow-up-line"></use></svg>
            </div>
            <div class="lds-menu-group__content">
              <div class="lds-menu-item" onclick="handleMenuItemClick(this)">商家信息</div>
              <div class="lds-menu-item is-active" onclick="handleMenuItemClick(this)">门店管理</div>
              <div class="lds-menu-item" onclick="handleMenuItemClick(this)">区域管理</div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧主区域 -->
    <div class="app-body">
      <!-- PageHeader 在内容区域顶部 -->
      <section class="lds-page-header">
        <h1 class="lds-page-header__title">页面标题</h1>
        <div class="lds-page-header__tabs">
          <div class="lds-tabs lds-tabs--primary lds-tabs--small">
            <a href="#" class="lds-tab is-active" onclick="handleTabClick(event, this)">标签一</a>
            <a href="#" class="lds-tab" onclick="handleTabClick(event, this)">标签二</a>
          </div>
        </div>
      </section>

      <!-- 页面实际内容 -->
      <div class="app-content">
        <!-- 核心业务内容放在这里 -->
      </div>
    </div>
  </div>
</div>

<!-- Icon sprite script -->
<script type="module" src="./packages/icons/index.js"></script>

<script>
  // 交互逻辑
  window.handleTabClick = function(event, el) {
    event.preventDefault();
    if (el.classList.contains('is-disabled')) return;
    const tabsContainer = el.closest('.lds-tabs');
    if (!tabsContainer) return;
    const allTabs = tabsContainer.querySelectorAll('.lds-tab');
    allTabs.forEach(tab => tab.classList.remove('is-active'));
    el.classList.add('is-active');
  };

  window.handleMenuHeaderClick = function(el) {
    const group = el.closest('.lds-menu-group');
    if (group) {
      group.classList.toggle('is-collapsed');
    }
  };

  window.handleMenuItemClick = function(el) {
    const menu = el.closest('.lds-menu');
    if (menu) {
      menu.querySelectorAll('.lds-menu-item').forEach(item => {
        item.classList.remove('is-active');
      });
      el.classList.add('is-active');
    }
  };
</script>
</body>
</html>
```

<br />

1. **初始化结构**：始终从 `.app-container` 开始构建页面。
2. **内容填充**：将具体业务逻辑放入 `.app-content` 中，并根据 [布局模式](#布局模式) 选择合适的布局。
3. **样式覆盖**：除非用户明确要求，否则不要修改 `base.css` 中核心框架的 `width`、`z-index` 和 `flex` 属性。
4. **阴影处理**：严格遵循base.css与基础框架示例代码，`.app-body` 的 `z-index` 高于侧边栏和导航栏，以保证 `shadow-large` 投影效果正常显示。

## 页面类型

### 列表页 (List Page)

适用场景：列表页是后台管理系统中最为常见的页面类型，主要用于展示、搜索和操作大批量数据。

- 当用户明确提出是列表页时使用此类型；

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

