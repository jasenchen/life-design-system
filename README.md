# Life Design System (life-ds)

Life Design System 是一套面向 Web 开发的高保真设计系统，旨在通过自动化的工作流将 Figma 设计资产完美转化为前端代码。本项目采用 Monorepo 架构，实现了设计变量 (Tokens)、图标 (Icons)、组件 (Components) 以及 AI 技能 (Skills) 的统一管理与分发。

## 📦 项目架构

本项目由以下核心包组成，所有包均发布在 `@life-ds` 作用域下：

| 包名 | 说明 | 目录 |
| :--- | :--- | :--- |
| **[@life-ds/tokens](./packages/tokens)** | 设计系统底层变量（色彩、间距、排版、阴影等） | `packages/tokens` |
| **[@life-ds/icons](./packages/icons)** | 标准化 SVG Sprite 图标库，支持自动注入与 CSS 换色 | `packages/icons` |
| **[@life-ds/components-web](./packages/components-web)** | 核心 React Web 组件库、样式资源及自动化接入工具 (CLI) | `packages/components-web` |
| **[@life-ds/skills](./packages/skills)** | 为 Trae/Coze 等 Agent 准备的设计规范 Prompt 与技能集 | `packages/skills` |

---

## 🚀 接入指南

### 1. 接入 React 组件库与样式 (Components-Web)

这是最推荐的接入方式。`@life-ds/components-web` 提供 React 组件 API，`npx life-ds init` 会自动为您准备 Token、基础样式和图标资源。

```bash
# 1. 安装组件库包
npm install @life-ds/components-web

# 2. 运行初始化工具，提取资产到您的项目目录（如 `styles/`、`src/styles/`、`assets/`、`src/assets/` 或 `public/assets/`）
npx life-ds init
```

随后在您的入口文件或 HTML 模板中引入生成的 CSS：
```html
<link rel="stylesheet" href="./styles/life-ds-tokens.css">
<link rel="stylesheet" href="./styles/base.css">
<link rel="stylesheet" href="./styles/components.css">
```

完成样式准备后，请在 React 项目中直接导入并使用组件：

```tsx
import React from 'react';
import { Navbar, Menu, FilterGroup, Filter, Button } from '@life-ds/components-web';

export function App() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Menu />
        <main style={{ padding: 24 }}>
          <FilterGroup size="small" onQuery={() => {}} onReset={() => {}}>
            <Filter type="input" size="small" label="商品名称" placeholder="请输入" value="" onChange={() => {}} />
            <Filter type="select" size="small" label="商品状态" placeholder="请选择" onClick={() => {}} />
          </FilterGroup>
          <Button variant="primary">查询</Button>
        </main>
      </div>
    </>
  );
}
```

在 React 项目中，请优先使用 `@life-ds/components-web` 提供的组件，避免手写 `.lds-` DOM 结构或仅通过 class 名拼装组件。若页面通过 `@life-ds/components-web` 使用图标，图标注入会自动完成；只有在你单独使用 `@life-ds/icons` 或手写 `<svg><use /></svg>` 时，才需要在入口文件中显式执行 `import '@life-ds/icons';`。

### 2. 接入 AI 技能集 (Skills)

如果您希望在 Trae 或其他 AI 编程助手（Agent）中使用 Life Design System 的规范进行辅助开发，可以接入我们的技能包。

```bash
# 1. 安装技能包
npm install @life-ds/skills

# 2. 获取特定技能的配置（以 Trae 为例）
npx life-ds-skills trae-config life-design-system
```
将输出的 JSON 内容复制并填入 Trae 的 `skill-creator` 即可完成注册。

---

## 🛠️ 开发者同步指南 (维护者专用)

本项目实现了与 Figma 的高度同步。如果您是设计系统的维护者，请确保本地存在 `.env.local` 并配置了 `FIGMA_TOKEN`。

### 同步设计变量 (Tokens)
```bash
# 从 Figma 拉取并更新色彩、排版、阴影等变量
npm run sync-tokens
```

### 同步图标库 (Icons)
```bash
# 从 Figma 拉取最新 SVG 图标并重新生成雪碧图
npm run sync-icons
```

### 同步 AI 技能 (Skills)
根目录的 `skills/` 目录为技能源码，发布前需同步到分发包：
```bash
# 同步根目录 skills/ 文档到 packages/skills 产物目录
npm run sync-skills
```

---

## 📦 发布与更新

发布前请先确认要发布的包，并在根目录完成对应产物同步：

```bash
# 如果 tokens 有更新，先同步生成最新 CSS
npm run sync-tokens

# 如果 skills 有更新，先同步分发内容
npm run sync-skills

# 如果 components-web 有源码更新，先重新构建 dist
npm run build --workspace=@life-ds/components-web
```

本轮如需发布 `@life-ds/tokens`、`@life-ds/components-web`、`@life-ds/skills`，建议按依赖顺序执行：

```bash
# 1. 发布 tokens
npm publish --workspace=@life-ds/tokens --access public

# 2. 发布 components-web
npm publish --workspace=@life-ds/components-web --access public

# 3. 发布 skills
npm publish --workspace=@life-ds/skills --access public
```

发布完成后，建议同步推送 GitHub 并创建仓库 Release：

```bash
git push origin main
```

推荐使用一个仓库级版本 tag 统一标记本次发布，例如 `1.2.1`：

```bash
# 1. 创建并推送 Git tag
git tag life-ds-v1.2.1
git push origin life-ds-v1.2.1

# 2. 使用 GitHub CLI 创建 Release
gh release create life-ds-v1.2.1 \
  --title "Life Design System v1.2.1" \
  --notes "Release @life-ds/tokens@1.2.1, @life-ds/components-web@1.2.1, @life-ds/skills@1.2.1"
```

如果你更希望保留包级 tag，也可以额外创建：

```bash
git tag tokens-v1.2.1
git tag components-web-v1.2.1
git tag skills-v1.2.1
git push origin tokens-v1.2.1 components-web-v1.2.1 skills-v1.2.1
```

---

© 2026 Life Design System. Built with 抖音来客设计规范.
