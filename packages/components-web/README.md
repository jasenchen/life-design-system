# @life-ds/components-web

Life Design System 是一套高保真的 Web 设计系统。为了满足不同业务方灵活接入的需求，本项目采用 Monorepo 架构进行管理，由以下独立 NPM 包组成：

- 🎨 **[@life-ds/tokens](../tokens)**: 提供设计系统所有的色彩、字体、阴影等底层 CSS 变量。
- 🖼️ **[@life-ds/icons](../icons)**: 提供标准化的高质量 SVG Sprite 图标库。
- 🧱 **[@life-ds/components-web](./)**: 提供核心组件的样式及一键自动化接入工具（CLI）。

---

## 🚀 快速开始 (推荐方式)

如果您希望在您的项目中**完整接入** Life Design System（包含组件、Token 和图标），我们强烈推荐使用 `@life-ds/components-web` 包提供的自动化初始化脚本。

### 1. 安装组件库

在您的项目根目录中运行以下命令：

```bash
npm install @life-ds/components-web
```
*(注意：npm 会自动为您下载底层的 `@life-ds/tokens` 和 `@life-ds/icons` 依赖)*

### 2. 执行初始化脚本

安装完成后，运行 CLI 工具：

```bash
npx life-ds init
```

**发生了什么？**
该脚本会自动探测您的项目目录结构（如是否存在 `src/` 或 `public/`），并将所需的所有核心资产自动提取并复制到您的项目中：
- `styles/life-ds-tokens.css`
- `styles/base.css`
- `styles/components.css`
- `assets/sprite.svg`

### 3. 在项目中引入

在您的 HTML 入口文件（如 `index.html`）中引入生成的 CSS 文件即可使用：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./styles/life-ds-tokens.css">
  <link rel="stylesheet" href="./styles/base.css">
  <link rel="stylesheet" href="./styles/components.css">
</head>
<body>
  <!-- 尽情使用 Life Design System 组件吧！ -->
</body>
</html>
```

图标的使用方式请参考 [Icon 使用指南](../icons/README.md)。

---

## 📦 按需接入指南

如果您的项目不需要完整的组件库，只需使用色彩变量或图标，您可以单独安装它们。

### 单独接入 Token

如果您只想要使用统一的设计变量：

```bash
npm install @life-ds/tokens
```
然后在您的 CSS 或入口文件中引入：
```css
@import '@life-ds/tokens/life-ds-tokens.css';
```

### 单独接入 Icon

如果您只想要图标资源：

```bash
npm install @life-ds/icons
```
在您的 HTML 文件中，您可以通过绝对路径或者配置构建工具来引用：
```html
<svg class="lds-icon">
  <use href="node_modules/@life-ds/icons/assets/sprite.svg#icon-name"></use>
</svg>
```

---

## 🛠️ 开发者指南 (针对维护者)

本仓库采用 `npm workspaces` 进行管理。

### 安装依赖
在根目录执行即可为所有 package 安装依赖：
```bash
npm install
```

### 同步 Figma 设计资源
设计系统由 Figma 驱动。如果您修改了 Figma 源文件，可以通过以下命令同步最新资产（需在 `.env.local` 配置 Figma Token）：

```bash
# 同步最新 Design Tokens (变量、排版、阴影)
npm run sync-tokens

# 同步最新的 SVG 图标
npm run sync-icons
```

### 发布新版本
本项目已配置自动化发布工作流。当您发布新版本时，所有包将同步发布到 NPM。
