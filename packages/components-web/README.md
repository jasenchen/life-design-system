# @life-ds/components-web

Life Design System 是一套高保真的 Web 设计系统。为了满足不同业务方灵活接入的需求，本项目采用 Monorepo 架构进行管理，由以下独立 NPM 包组成：

- 🎨 **[@life-ds/tokens](../tokens)**: 提供设计系统所有的色彩、字体、阴影等底层 CSS 变量。
- 🖼️ **[@life-ds/icons](../icons)**: 提供标准化的高质量 SVG Sprite 图标库。
- 🧱 **[@life-ds/components-web](./)**: 提供核心 React Web 组件、样式资源及一键自动化接入工具（CLI）。

---

## 🚀 快速开始 (推荐方式)

如果您希望在您的项目中**完整接入** Life Design System（包含 React 组件、Token 和图标），我们强烈推荐使用 `@life-ds/components-web` 包提供的自动化初始化脚本。

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
- 样式文件：复制到 `styles/` 或 `src/styles/`
- 资源文件：根据项目结构复制到 `assets/`、`src/assets/` 和/或 `public/assets/`
- 包含的核心文件：
  - `life-ds-tokens.css`
  - `base.css`
  - `components.css`
  - `sprite.svg`
  - `logo-laike.svg`

### 3. 在项目中引入样式资源

在您的 HTML 入口文件（如 `index.html`）中引入生成的 CSS 文件，作为组件运行所需的样式基础：

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

### 4. 在 React 中使用组件

完成样式资源接入后，请在 React 项目中直接导入并使用 `@life-ds/components-web` 的组件：

```tsx
import React from 'react';
import {
  Navbar,
  Menu,
  PageHeader,
  FilterGroup,
  Filter,
  Tabs,
  Tab,
  Button,
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Pagination,
} from '@life-ds/components-web';

export function ProductListPage() {
  return (
    <>
      <Navbar />
      <div className="app-main-wrapper">
        <aside className="app-sidebar">
          <div className="app-sidebar__menu">
            <Menu />
          </div>
        </aside>
        <div className="app-body">
          <main className="app-content">
            <PageHeader
              title="商品管理"
              description="统一管理商品信息、状态和售卖配置。"
            />
            <div style={{ marginBottom: 24 }}>
              <FilterGroup onQuery={() => {}} onReset={() => {}}>
                <Filter type="input" label="商品名称" placeholder="请输入" value="" onChange={() => {}} />
                <Filter type="select" label="商品状态" placeholder="请选择" onClick={() => {}} />
                <Filter type="date" label="售卖日期" placeholder="请选择" onClick={() => {}} />
                <Filter type="time" label="售卖时间" placeholder="请选择" onClick={() => {}} />
              </FilterGroup>
            </div>
            <div className="lds-action-bar">
              <Tabs variant="capsule" defaultValue="all">
                <Tab value="all" label="全部" />
                <Tab value="onsale" label="售卖中" />
              </Tabs>
              <Button variant="primary">新建商品</Button>
            </div>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>商品信息</Th>
                    <Th>状态</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>冬季羊绒大衣</Td>
                    <Td>售卖中</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableWrapper>
            <div className="lds-pagination-wrapper">
              <Pagination total={100} current={1} pageSize={10} onChange={() => {}} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
```

在 React 项目中，请优先使用组件库导出的组件，避免手写 `.lds-` DOM/class 结构来拼装已有组件。

图标的使用方式请参考 [Icon 使用指南](../icons/README.md)。

---

## 📦 按需接入指南

如果您的项目不需要完整的 React 组件库，只需使用色彩变量或图标，您可以单独安装它们。

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
请在应用入口文件中执行注入：

```ts
import '@life-ds/icons';
```

随后在页面中直接使用 Hash ID 引用图标，而不要通过静态文件路径引用：

```html
<svg class="lds-icon">
  <use href="#ic-add-round-line"></use>
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
建议在仓库根目录按以下顺序执行，避免依赖版本不同步：

```bash
# 如果 tokens 有更新，先同步生成最新 CSS
npm run sync-tokens

# 重新构建 components-web 的 dist
npm run build --workspace=@life-ds/components-web

# 先发布 tokens，再发布 components-web
npm publish --workspace=@life-ds/tokens --access public
npm publish --workspace=@life-ds/components-web --access public
```

如果本轮还包含 `@life-ds/skills`，请在发布前额外执行：

```bash
npm run sync-skills
npm publish --workspace=@life-ds/skills --access public
```
