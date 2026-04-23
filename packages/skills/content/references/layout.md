# 布局 (Layout)

适用于不同类型的布局模式。每个页面请选择一种模式，切勿混用。

### 页面基础结构

基础结构包含顶部导航、左侧导航和中间内容区域，对于大部分页面，均需要遵循此结构，且对应组件和样式不需要调整。

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Life Design System - 示例页面</title>
  
  <link rel="stylesheet" href="./packages/tokens/life-ds-tokens.css">
  <link rel="stylesheet" href="./packages/components-web/styles/base.css">
  <link rel="stylesheet" href="./packages/components-web/styles/components.css">
  
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-normal, "PingFang SC", sans-serif);
      background-color: var(--color-bg-normal);
      color: var(--color-text-primary);
    }

    .app-container {
      display: flex;
      flex-direction: column; /* 改为垂直布局：顶部为导航，下部为内容 */
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    /* 顶部导航 (贯穿页面) */
    .app-navbar {
      flex-shrink: 0;
      /* 移除强制的背景色和底边框，让 Navbar 组件自带的样式生效 */
      /* 移除 z-index: 10，防止其遮挡下方内容区域的向上投影 */
    }

    /* 下方区域 (侧边栏 + 内容区) */
    .app-main-wrapper {
      display: flex;
      flex: 1;
      /* 移除 overflow: hidden; 防止截断内部的投影 */
      z-index: 1; /* 建立层叠上下文，确保其内部的高 z-index 元素能覆盖在上方无 z-index 的 navbar 之上（如果有必要） */
      min-height: 0; /* 修复 flex 子项内容溢出无法滚动的问题，强制其高度由父级决定 */
    }

    /* 侧边栏 */
    .app-sidebar {
      width: 200px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      z-index: 100; /* 低于内容区域的投影 */
      min-height: 0; /* 同理，防止自身在 flex 布局下无限撑大 */
    }

    .app-sidebar__menu {
      flex: 1;
      overflow-y: auto;
      padding: 12px 0;
      /* 隐藏侧边栏滚动条但保持滚动功能 */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
    }
    
    .app-sidebar__menu::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }

    /* 右侧主内容区域 (Body) */
    .app-body {
      flex: 1;
      background-color: var(--color-bg-normal); /* 纯白背景 */
      box-shadow: var(--shadow-large); /* 修复：使用正确的 shadow-large 投影 */
      border-top-left-radius: var(--radius-xxl, 24px); /* 修正：按照要求使用 24px 的圆角 Token */
      display: flex;
      flex-direction: column;
      /* 移除 overflow: hidden; 防止影响内部布局或引起意外裁剪 */
      position: relative;
      z-index: 101; /* 确保投影覆盖在上方和左侧 */
      margin-top: -1px; /* 向上微调 1px，使其盖住可能存在的顶栏边框，让上阴影无缝扩散 */
    }

    /* 内部内容滚动区域 */
    .app-content {
      flex: 1;
      overflow-y: auto;
      padding: 0 var(--spacing-8x, 32px) var(--spacing-8x, 32px);
    }
  </style>
</head>
<body>

<div class="app-container">
  <!-- 顶部 Navbar (贯穿整个页面) -->
  <header class="app-navbar">
    <div class="lds-navbar">
      <div class="lds-navbar__left">
        <div class="lds-navbar__logo">
          <img src="./assets/logo-laike.svg" alt="Logo">
        </div>
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
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">授权管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">资质中心</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">店铺装修</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">合作管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">业务中心</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">评价管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">审批中心</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">服务应用授权</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">职人管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">官方抖音号</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">公益项目</div>
          </div>
        </div>

        <!-- Group 3: 订单 -->
        <div class="lds-menu-group">
          <div class="lds-menu-group__header" onclick="handleMenuHeaderClick(this)">
            <svg class="icon"><use href="#ic-menu-trade-line"></use></svg>
            <span class="lds-menu-group__title">订单</span>
            <svg class="icon lds-menu-group__action"><use href="#ic-arrow-up-line"></use></svg>
          </div>
          <div class="lds-menu-group__content">
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">团购券处理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">售后处理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">交易查询</div>
          </div>
        </div>

        <!-- Group 4: 财务 -->
        <div class="lds-menu-group">
          <div class="lds-menu-group__header" onclick="handleMenuHeaderClick(this)">
            <svg class="icon"><use href="#ic-wallet-line"></use></svg>
            <span class="lds-menu-group__title">财务</span>
            <svg class="icon lds-menu-group__action"><use href="#ic-arrow-up-line"></use></svg>
          </div>
          <div class="lds-menu-group__content">
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">每日收益</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">每日到账</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">提现记录</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">服务费返还</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">收款账户</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">保证金</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">放心借</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">营销账户</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">自助开票</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">商家交票</div>
          </div>
        </div>

        <!-- Group 5: 达人带货 -->
        <div class="lds-menu-group">
          <div class="lds-menu-group__header" onclick="handleMenuHeaderClick(this)">
            <svg class="icon"><use href="#ic-commoditynew-line"></use></svg>
            <span class="lds-menu-group__title">达人带货</span>
            <svg class="icon lds-menu-group__action"><use href="#ic-arrow-up-line"></use></svg>
          </div>
          <div class="lds-menu-group__content">
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">全店推广</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">计划管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">达人广场</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">巨量星图</div>
          </div>
        </div>

        <!-- Group 6: 内容推广 -->
        <div class="lds-menu-group">
          <div class="lds-menu-group__header" onclick="handleMenuHeaderClick(this)">
            <svg class="icon"><use href="#ic-trumpet-line"></use></svg>
            <span class="lds-menu-group__title">内容推广</span>
            <svg class="icon lds-menu-group__action"><use href="#ic-arrow-up-line"></use></svg>
          </div>
          <div class="lds-menu-group__content">
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">获客卡</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">视频管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">直播管理</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">直播专业版</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">直播助手</div>
            <div class="lds-menu-item" onclick="handleMenuItemClick(this)">现金钱包</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧主区域 (直接使用 app-body) -->
    <div class="app-body">
      <!-- PageHeader 在内容区域顶部 -->
      <section class="lds-page-header">
        <h1 class="lds-page-header__title">团购商品管理</h1>
        <div class="lds-page-header__tabs">
          <div class="lds-tabs lds-tabs--primary lds-tabs--small">
            <a href="#" class="lds-tab is-active" onclick="handleTabClick(event, this)">全部商品</a>
            <a href="#" class="lds-tab" onclick="handleTabClick(event, this)">出售中</a>
            <a href="#" class="lds-tab" onclick="handleTabClick(event, this)">已下架</a>
            <a href="#" class="lds-tab" onclick="handleTabClick(event, this)">审核中</a>
          </div>
        </div>
      </section>

      <!-- 页面实际内容 -->
      <div class="app-content">
        
        <!-- 增加内容 1：功能区 (Capsule Tab + 按钮) -->
        <div class="lds-action-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-4x, 16px);">
          <!-- 左侧 Capsule Tab -->
          <div class="lds-tabs lds-tabs--capsule lds-tabs--small">
            <a href="#" class="lds-tab is-active" onclick="handleTabClick(event, this)">全部会员可领</a>
            <a href="#" class="lds-tab" onclick="handleTabClick(event, this)">定向会员发放</a>
          </div>
          <!-- 右侧 按钮 -->
          <button class="lds-btn lds-btn--primary lds-btn--default-size">
            新建会员优惠券
          </button>
        </div>

        <!-- 增加内容 2：Table 组件 -->
        <div class="lds-table-wrapper">
          <table class="lds-table">
            <thead class="lds-table__thead">
              <tr>
                <th class="lds-table__th">商品信息</th>
                <th class="lds-table__th">价格（元）</th>
                <th class="lds-table__th">售卖时间</th>
                <th class="lds-table__th">剩余库存</th>
                <th class="lds-table__th">待核销</th>
                <th class="lds-table__th">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr class="lds-table__row">
                <td class="lds-table__td">
                  <div class="lds-table-cell--product">
                    <img src="./assets/shangpin.png" alt="商品图" class="lds-table-cell__product-img">
                    <div class="lds-table-cell__product-info">
                      <div class="lds-table-cell__product-title-wrap">
                        <h4 class="lds-table-cell__product-title">【节假日通用】资生堂烫染护理</h4>
                        <span class="lds-tag lds-tag--default">团购</span>
                      </div>
                      <div class="lds-table-cell__product-meta">
                        <span class="lds-table-cell__product-id">商品ID：23468723648223</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="lds-table__td">
                  <div class="lds-table-cell--amount">￥508.00</div>
                </td>
                <td class="lds-table__td">2023.08.01 12:00</td>
                <td class="lds-table__td">10,000</td>
                <td class="lds-table__td">500</td>
                <td class="lds-table__td">
                  <div class="lds-table-cell--operation">
                    <a href="#" class="lds-table-cell__action">上架</a>
                    <a href="#" class="lds-table-cell__action">编辑</a>
                  </div>
                </td>
              </tr>
              <tr class="lds-table__row">
                <td class="lds-table__td">
                  <div class="lds-table-cell--product">
                    <img src="./assets/shangpin.png" alt="商品图" class="lds-table-cell__product-img">
                    <div class="lds-table-cell__product-info">
                      <div class="lds-table-cell__product-title-wrap">
                        <h4 class="lds-table-cell__product-title">【工作日可用】高级洗剪吹套餐</h4>
                        <span class="lds-tag lds-tag--orange">热销</span>
                      </div>
                      <div class="lds-table-cell__product-meta">
                        <span class="lds-table-cell__product-id">商品ID：89345723648224</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="lds-table__td">
                  <div class="lds-table-cell--amount">￥128.00</div>
                </td>
                <td class="lds-table__td">2023.08.02 14:30</td>
                <td class="lds-table__td">8,500</td>
                <td class="lds-table__td">240</td>
                <td class="lds-table__td">
                  <div class="lds-table-cell--operation">
                    <a href="#" class="lds-table-cell__action">下架</a>
                    <a href="#" class="lds-table-cell__action is-danger">删除</a>
                  </div>
                </td>
              </tr>
              <tr class="lds-table__row">
                <td class="lds-table__td">
                  <div class="lds-table-cell--product">
                    <img src="./assets/shangpin.png" alt="商品图" class="lds-table-cell__product-img">
                    <div class="lds-table-cell__product-info">
                      <div class="lds-table-cell__product-title-wrap">
                        <h4 class="lds-table-cell__product-title">【周末通用】深层头皮清洁护理</h4>
                        <span class="lds-tag lds-tag--red">特价</span>
                      </div>
                      <div class="lds-table-cell__product-meta">
                        <span class="lds-table-cell__product-id">商品ID：55668723648225</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="lds-table__td">
                  <div class="lds-table-cell--amount">￥299.00</div>
                </td>
                <td class="lds-table__td">2023.08.03 09:15</td>
                <td class="lds-table__td">5,000</td>
                <td class="lds-table__td">120</td>
                <td class="lds-table__td">
                  <div class="lds-table-cell--operation">
                    <a href="#" class="lds-table-cell__action">上架</a>
                    <a href="#" class="lds-table-cell__action">编辑</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</div>

<!-- Icon sprite script -->
<script type="module" src="./packages/icons/index.js"></script>

<script>
  // Tab 切换逻辑
  window.handleTabClick = function(event, el) {
    event.preventDefault();
    if (el.classList.contains('is-disabled')) return;
    
    const tabsContainer = el.closest('.lds-tabs');
    if (!tabsContainer) return;
    
    const allTabs = tabsContainer.querySelectorAll('.lds-tab');
    allTabs.forEach(tab => tab.classList.remove('is-active'));
    
    el.classList.add('is-active');
  };

  // Menu 折叠逻辑
  window.handleMenuHeaderClick = function(el) {
    const group = el.closest('.lds-menu-group');
    if (group) {
      group.classList.toggle('is-collapsed');
    }
  };

  // Menu 选中逻辑
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
