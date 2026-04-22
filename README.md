# Life Design System (life-ds)

Life Design System 是一套面向 Web 开发的高保真设计系统，旨在通过自动化的工作流将 Figma 设计资产完美转化为前端代码。本项目采用 Monorepo 架构，实现了设计变量 (Tokens)、图标 (Icons)、组件 (Components) 以及 AI 技能 (Skills) 的统一管理与分发。

## 📦 项目架构

本项目由以下核心包组成，所有包均发布在 `@life-ds` 作用域下：

| 包名 | 说明 | 目录 |
| :--- | :--- | :--- |
| **[@life-ds/tokens](./packages/tokens)** | 设计系统底层变量（色彩、间距、排版、阴影等） | `packages/tokens` |
| **[@life-ds/icons](./packages/icons)** | 标准化 SVG Sprite 图标库，支持自动注入与 CSS 换色 | `packages/icons` |
| **[@life-ds/components-web](./packages/components-web)** | 核心 Web 组件库样式及自动化接入工具 (CLI) | `packages/components-web` |
| **[@life-ds/skills](./packages/skills)** | 为 Trae/Coze 等 Agent 准备的设计规范 Prompt 与技能集 | `packages/skills` |

---

## 🚀 接入指南

### 1. 接入组件库与样式 (Components-Web)

这是最推荐的接入方式，它会自动为您配置 Token、基础样式和图标资源。

```bash
# 1. 安装组件库包
npm install @life-ds/components-web

# 2. 运行初始化工具，提取资产到您的项目目录（如 styles/ 和 assets/）
npx life-ds init
```

随后在您的 HTML 入口文件中引入生成的 CSS 即可：
```html
<link rel="stylesheet" href="./styles/life-ds-tokens.css">
<link rel="stylesheet" href="./styles/base.css">
<link rel="stylesheet" href="./styles/components.css">
```

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

发布新版本时，建议在根目录执行全量发布：
```bash
# 提交代码到 GitHub
git add . && git commit -m "feat: 更新设计系统" && git push

# 全量发布到 NPM
npm publish --workspaces --access public
```

---

© 2026 Life Design System. Built with 抖音来客设计规范.
