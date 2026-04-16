# Life Design System Tokens

本仓库提供 Life Design System 的核心 Design Tokens (CSS Variables)。通过本 npm 包，前端研发可以将同一套设计规范（色值、圆角、字号等）轻松集成到各自的 Web 项目中，并与 Figma 的设计产物保持一致。

## 📦 接入方：如何一键引入

本包已发布在公共的 npm 仓库中，无需任何额外配置，直接安装即可。

### 1. 安装依赖

使用 npm、yarn 或 pnpm 安装该 Token 包：

```bash
npm install life-design-system-tokens
# 或
yarn add life-design-system-tokens
# 或
pnpm add life-design-system-tokens
```

### 2. 在项目中引入

在您的入口文件（如 `main.js`, `App.vue` 或全局 CSS）中引入 tokens：

```javascript
// JavaScript / TypeScript (Webpack/Vite/Vite等现代构建工具) 引入
import 'life-design-system-tokens';

// 如果需要显式引入具体的 css 文件：
import 'life-design-system-tokens/tokens.css';
```

如果在纯 CSS 中引入：
```css
@import 'life-design-system-tokens';
```

之后，您就可以在任意组件的样式中直接使用定义好的 CSS 变量（如 `var(--primary-color-normal)`、`var(--radius-m)` 等）来实现业务 UI 了。

---

## 🚀 维护方：如何更新与发布

当 Figma 中的设计规范发生变更，本仓库通过 `npm run sync-tokens` 更新了 `life-design-system-tokens.css` 后，您可以按照以下简单的步骤将新版本发布给其他团队成员使用：

### 1. 登录 npm

首次发布前，确保您已在终端中登录了 npm 账号：
```bash
npm login
```

### 2. 更新版本号

根据改动的内容，通过 npm 内置命令更新版本号（该命令会自动修改 `package.json` 中的 `version` 字段，并创建一个 Git Tag）：
```bash
npm version patch # 用于修复 bug、微调色值（例如：1.0.0 -> 1.0.1）
npm version minor # 用于新增 Token（例如：1.0.1 -> 1.1.0）
npm version major # 用于破坏性更新，如删除 Token 或大规模重命名（例如：1.1.0 -> 2.0.0）
```

### 3. 一键发布

运行发布命令即可推送到 npmjs.com：
```bash
npm publish
```

发布成功后，将代码推送到 GitHub 保存源码即可：
```bash
git push --follow-tags
```

其他研发同学只需在其项目中执行 `npm update life-design-system-tokens`，即可无缝获取最新的样式规范。
