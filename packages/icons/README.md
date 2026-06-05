# 图标库接入与使用指南

本文档旨在说明如何在项目中接入由 `@life-ds/icons` npm 包提供的独立 SVG 图标库。

## 1. 核心概念：SVG 雪碧图 (Sprite)

我们使用**SVG 雪碧图 (Sprite)**技术将所有 Figma 中的图标打包到一个文件中。
它的优势在于：
1. **体积小、请求少**：所有图标在一个文件中，只需一次加载。
2. **支持 CSS 动态换色**：脚本自动处理了 Figma 导出的颜色，将非透明颜色替换成了 `currentColor`，这意味着您可以像改变字体颜色一样通过 CSS 控制图标颜色（完美适配明暗主题切换）。
3. **开箱即用的一键注入**：本包提供了一个脚本，在引入时会自动将 SVG 注入页面 DOM 中，彻底免去手动配置 loader 或处理跨域问题的烦恼。

---

## 2. 接入步骤（一键接入）

我们将图标库作为一个独立的 npm 包进行分发。只需两步即可完成接入。**请务必注意，不要通过静态文件路径引用 SVG Sprite**，因为跨域或 Vite 等构建工具的代理拦截会导致图标无法渲染。正确的做法是通过本包提供的注入脚本，将所有图标直接注入到 HTML 的 `<body>` 中。

### 步骤 1: 安装 npm 包

```bash
npm install @life-ds/icons
```
*(注意：请确保该包已被发布到您的私有或公共 npm 镜像仓库中)*

### 步骤 2: 在入口文件中引入

在您的项目前端入口文件（例如 `main.js`, `app.js`, `main.tsx` 或 `index.js`）中引入该包：

```javascript
import '@life-ds/icons';
```

**发生了什么？**
引入上述代码后，脚本会自动监听浏览器 DOM 加载情况，并在 `document.body` 的最前方注入一个包含所有图标的隐藏 `<div>`。这使得您页面中任何地方都能直接使用这些图标，**彻底免去跨域或相对路径解析的烦恼**。

### 步骤 3: 在页面中使用图标

无论是在 HTML、React、Vue 还是其他框架中，**直接通过 Hash ID 锚点**（`<svg><use href="#ic-xxx"></use></svg>`）引用对应的图标 ID：

```html
<!-- ✅ 正确：直接使用 Hash ID 引用注入的 SVG -->
<svg class="my-icon">
  <use href="#ic-add-round-line"></use>
</svg>

<!-- ❌ 错误：不要使用相对或绝对路径，会引发跨域/代理拦截问题 -->
<svg class="my-icon">
  <use href="/assets/sprite.svg#ic-add-round-line"></use>
</svg>
```

---

## 3. 图标样式控制 (CSS)

图标默认的颜色是由其父级元素的文本颜色（`color`）决定的，这也是为什么脚本将其设置为 `currentColor`。同时，您可以通过 CSS 控制图标的大小。

我们建议在您的全局样式表（例如 `styles/components.css`）中添加一个通用的图标基础类：

```css
/* 通用图标样式 */
.icon {
  /* 默认尺寸，与 Figma 中一致 */
  width: 24px;
  height: 24px;
  /* 让图标的填充或描边跟随父级文本颜色 */
  fill: currentColor;
  /* 解决某些浏览器下 SVG 对齐问题 */
  vertical-align: -0.15em;
  /* 如果有描边的图标，确保描边也跟随颜色 */
  stroke: currentColor;
}

/* 根据需要定义特定场景下的图标样式 */
.btn-icon {
  width: 16px;
  height: 16px;
  color: #fff; /* 图标会变成白色 */
}

.warning-icon {
  color: var(--color-warning-normal); /* 支持 CSS 变量，完美兼容主题切换！ */
}
```

在 HTML 中结合使用：

```html
<button class="lds-btn">
  <svg class="icon btn-icon">
    <use href="#ic-add-round-line"></use>
  </svg>
  添加项
</button>
```

---

## 4. 如何更新和查找图标

1. **查找图标名称**：
   - 在项目根目录中，使用浏览器打开 [`icons-preview.html`](./icons-preview.html)。
   - 您将看到所有可用的图标。**点击任何图标即可自动复制其名称（ID）**。
   - 图标名称由脚本自动从 Figma 的 `Description` (例如 `iconpark name: xxx`) 中提取，并自动添加了线面属性（如 `-line`, `-fill`）。

2. **更新图标库**：
   - 当设计师在 Figma 的「01基础图标 Basic Icon」画板中更新了图标时。
   - 在终端执行以下命令重新生成最新的雪碧图：
     ```bash
     # 请替换为您的真实 FIGMA_TOKEN
     FIGMA_TOKEN="您的_FIGMA_PAT" npm run sync-icons
     ```
   - 脚本会自动重新抓取所有图标、替换颜色变量，并覆盖更新 `assets/icons/sprite.svg` 以及预览页面。
