---
name: "life-design-system"
description: "使用 @life-ds 构建或优化抖音来客风格的 React Web 界面。当需要根据截图、设计稿、文本提示或现有代码实现或优化页面时使用。"
---

# 强制性规则

以下规则适用于所有任务。没有任何例外。

1. **优先使用** `life-ds` 提供的 **React 组件。** 在构建自定义 UI 之前，务必优先使用 `@life-ds/components-web` 提供的 React 组件。当存在等效的 `life-ds` 组件时，禁止创建自定义组件，禁止对组件样式进行覆盖和魔改。在 React 项目中，禁止手写 `.lds-` DOM 结构或自行拼装已提供的组件。
2. **所有视觉样式均使用语义化 Tokens。** 颜色、排版、圆角和阴影必须使用 design tokens。原则上严禁在 UI 中硬编码色值、字号或圆角大小，除非由设计师提供设计稿中的圆角和间距在token中不存在时可采用硬编码，但需要告知。
3. 所有文本的字体族均使用`--font-normal`，你可以在全局层面使用这个字体族的token。`--font-number` 仅用于金额、价格、成交额、库存、统计指标等数据展示场景；时间、编号、ID、纯英文串等内容仍使用 `--font-normal`。
4. **使用** `@life-ds/icons` **图标。** 当页面使用 `@life-ds/components-web` 提供的 `Icon` 组件或任何内置图标组件时，组件库会自动触发 `@life-ds/icons` 的 SVG Sprite 注入；当项目单独使用 `@life-ds/icons` 或手写 `<svg><use /></svg>` 引用图标时，仍需在应用入口文件（如 `main.tsx`、`index.tsx`、`main.js`）中显式执行 `import '@life-ds/icons';`。不要捏造图标名称 —— 务必核实存在完全一致的导出项。
5. 除非是全屏页面、弹框等非典型页面类型，否则必须使用基础结构构建页面的基础框架。包含顶部导航、左侧菜单和中间内容区域，对于大部分页面，均需要遵循此结构，且不要对组件和样式进行修改！页面基础框架请阅读 [design/layout.md](design/layout.md)
6. **在能提升清晰度的地方考虑使用动效。** 对于交互状态变化（展开/收起、切换、焦点滑动、错误反馈），优先使用 life-ds 组件内置的动效。仅对非组件元素使用自定义动效，并遵循 [design/motion.md](design/motion.md) 的预设以保持一致性。
7. **遵循现有项目模式。** 如果仓库中已经使用了 life-ds 组件或本地封装组件，请在其基础上进行扩展，而不是创建平行的结构。
8. 每个项目的页面，需要增加字体平滑的代码：`-webkit-font-smoothing: antialiased`
9. **生成任何页面前，必须先阅读设计原则文档。** 在生成、修改或优化任何页面之前，必须先阅读 [design/design.md](design/design.md)，并以其中的设计原则作为页面实现的底层依据，确保页面框架、组件使用、信息层级、视觉样式与交互表达均符合设计原则后才可继续实现。
10. **列表页筛选区必须优先使用标准筛选器组件。** 当页面存在列表筛选区时，优先使用 `FilterGroup`、`Filter`、`FilterSelect`、`FilterDatePicker`、`FilterTimePicker` 等标准筛选器组件；不要因为局部实现问题退回到普通 `Form`、裸 `Input`、裸 `Select` 或自拼 DOM 结构来替代列表页筛选区。

***

# 核心工作流

> ⚠️ **重要提示 (Agent System Prompt)：**
> 本项目在 `design/` 与 `components/` 目录下分别维护设计规范和组件文档。在实现任何 UI（如按钮、筛选器、表格、布局）之前，你 **必须** 使用文件读取工具查阅对应的 `.md` 参考文件，并优先使用 `@life-ds/components-web` 的 React 组件 API。禁止凭空猜测组件实现，禁止手写 `.lds-` DOM/class 结构替代现有 React 组件。

## 1. 优先检查 Life Design System (life-ds) 的引入情况

在开始任何 UI 开发之前，AI 必须首先检查当前项目是否已经正确接入了 Life Design System。

### 1.1 检查方法

1. **检查** **`package.json`**：查看 `dependencies` 或 `devDependencies` 中是否包含 `@life-ds/components-web`。
2. **检查本地资产**：查看项目中是否存在 `styles/life-ds-tokens.css`、`styles/components.css` 以及 `assets/sprite.svg` 等文件。

<br />

### 1.2 如果未引入，请按照以下自动化步骤执行接入：

由于 Life Design System 提供了极其便捷的一键接入 CLI 工具，当检测到项目未接入时，AI 必须**严格按照以下 2 步**在终端执行操作，**禁止手动新建 CSS 文件或手动复制粘贴代码**：

1. **安装组件库包**：
   在项目的根目录下执行命令：
   ```bash
   npm install @life-ds/components-web
   ```
   *(该操作会自动将* *`@life-ds/tokens`* *和* *`@life-ds/icons`* *作为依赖项一并下载)*
2. **运行初始化脚本提取本地资产**：
   安装完成后，紧接着执行：
   ```bash
   npx life-ds init
   ```
   *(该 CLI 脚本会自动将必须的 Tokens CSS、基础组件 CSS 以及 Icon SVG 精准复制到项目对应的* *`styles/`* *和* *`assets/`* *目录中。)*
3. **指导用户在入口引入**：
   脚本执行成功后，AI 需同时检查 HTML 入口文件与图标使用方式：
   - 在入口 HTML 文件（如 `index.html`）中，确保 `<head>` 标签内包含以下引入代码：
   ```html
   <link rel="stylesheet" href="./styles/life-ds-tokens.css">
   <link rel="stylesheet" href="./styles/base.css">
   <link rel="stylesheet" href="./styles/components.css">
   ```
   - 若项目未使用 `@life-ds/components-web` 的 `Icon` 组件，而是单独使用 `@life-ds/icons` 或手写 `<svg><use /></svg>` 图标，则必须在应用入口文件（如 `main.tsx`、`index.tsx`、`main.js`）中补充：
   ```ts
   import '@life-ds/icons';
   ```

**注意事项：**

- 绝对不要试图通过 CDN 或手动编写变量的方式来模拟 Life Design System，必须走正规的 `npm install` + `npx life-ds init` 流程。
- 如果在执行 `npx life-ds init` 时遇到权限问题，请使用 `chmod +x node_modules/@life-ds/components-web/bin/cli.mjs` 赋予执行权限后重试。

***

## 2. 将 Life Design System (life-ds) 作为默认的设计系统

将 `@life-ds `的组件和样式作为默认的实现路径。当要实现页面或者UI时，必须阅读对应组件的文档：

- 设计原则：[design/design.md](design/design.md)
- token样式：[design/tokens.md](design/tokens.md)
- 图标：[components/icon.md](components/icon.md)
- 颜色：[design/color.md](design/color.md)
- 组件总览：[components/index.md](components/index.md)
- 动效：[design/motion.md](design/motion.md)

<br />

***

## 2.5. 布局框架

当准备生成页面时，你需要判断需要使用哪个类型的页面，对于大部分业务，必须基于一个标准的页面基础框架，并在内容区域填充内容，请阅读：

- [design/layout.md](design/layout.md)

***

## 2.6. 组件使用

当准备生成页面时，如果需要使用组件，必须阅读对应组件的文档并优先使用 `@life-ds/components-web` 的 React 组件 API：

- 按钮 ：[components/button.md](components/button.md)
- 提示条 ：[components/alert.md](components/alert.md)
- 卡片 ：[components/card.md](components/card.md)
- 键值对 ：[components/keyvalue.md](components/keyvalue.md)
- 全局提示 ：[components/message.md](components/message.md)
- 图标 ：[components/icon.md](components/icon.md)
- 选择器 ：[components/select.md](components/select.md)
- 日期选择器 ：[components/datepicker.md](components/datepicker.md)
- 时间选择器 ：[components/timepicker.md](components/timepicker.md)
- 标签页 ：[components/tabs.md](components/tabs.md)
- 步骤条 ：[components/steps.md](components/steps.md)
- 分页器 ：[components/pagination.md](components/pagination.md)
- 表格 ：[components/table.md](components/table.md)
- 筛选器 ：[components/filter.md](components/filter.md)
- 标签 ：[components/tag.md](components/tag.md)
- 多选框 ：[components/checkbox.md](components/checkbox.md)
- 单选框 ：[components/radio.md](components/radio.md)
- 开关 ：[components/switch.md](components/switch.md)
- 搜索框 ：[components/search.md](components/search.md)
- 页面标题区 ：[components/pageheader.md](components/pageheader.md)
- 抽屉 ：[components/drawer.md](components/drawer.md)
- 表单 ：[components/form.md](components/form.md)

***

<br />

## 3. 阅读图片指引

如果用户提供了截图、设计稿或其他视觉参考，必须阅读文档：

- [design/image-analysis.md](design/image-analysis.md)

使用图片来推断布局结构、层级、组件、Token 角色和状态 —— 然后使用 life-ds 组件和 Tokens 进行实现。

若截图内容为原型图等简单的线框图，请不要严格按照截图的样式和布局实现，务必保证其涉及风格、布局框架、组件使用、样式token等符合来客设计规范、页面规范、组件规范和样式规范。

如果追求像素级完美的克隆会导致糟糕的 Web 端实现效果，请不要这么做。在需要时使用占位图（例如 `https://picsum.photos/seed/reel-fashion/720/1280`）。

***



## 4. 优先使用可用的 Figma 源数据

如果连接了 Figma MCP 服务器，或者你可以读取 Figma 文件/节点数据，始终优先将其作为权威的设计数据源：

1. **将 Figma 样式 / Tokens / 变量映射到 @life-ds/tokens。** Figma 节点可能带有颜色样式、文本样式、效果样式，或绑定的变量。这些都是设计 Token 层的表现形式。读取当前存在的任何形式 —— 样式名称、变量别名或原始 Token 引用 —— 并将其解析为对应的 @life-ds/tokens 语义 Token（颜色、排版预设、圆角、阴影）。绝不要硬编码解析后的 hex/px 值；始终使用 @life-ds/tokens的Token，若由设计师提供设计稿中的圆角和间距在token中不存在，需要你进行判断是否需要更改为token，但需要告知。
2. **将 Figma 组件映射到 @life-ds/components-web 组件。** 当 Figma 节点是设计系统组件（例如 `Button`、`NavBar`、`tabs`）的实例时，识别出匹配的 `@life-ds/components-web` 组件，并将其变体属性转化为 **life-ds** 的属性和变体类型。
3. **从 Figma 提取布局。** 使用自动布局 (auto-layout) 属性（padding、gap、alignment）来指导 CSS/布局决策，在适用时将它们转换为  token 值。

如果某个 Figma 样式/Token/组件没有明确对应的 `@life-ds` 等效项，请明确记录此缺失，按照设计稿的样式实现。

***

## 5. 实施开发

在编写代码之前，请检查代码仓库：检查 `@life-ds/components-web`、`@life-ds/tokens` 、`@life-ds/icons` 和本地`@life-ds`封装是否已经配置好。遵循现有的模式。

构建优先级：

1. 复用仓库中已有的实现
2. 使用经过验证的 `@life-ds/components-web`、`@life-ds/tokens`、`@life-ds/icons` API
3. 仅当没有等效的 life-ds 组件时，才进行最少的本地扩展

***

## 6. 交付可运行的 UI

保持分析简明扼要，将重心放在实现上。

除非用户只要求进行分析，否则需交付：

- 所选择的起始点
- （适用时）一份简明的结构读取分析
- 具体的代码实现或补丁 (patch)
- 重要的假设或阻断因素 (blockers)

***

## 合规性检查清单

在交付前，请验证：

- 所使用的所有 life-ds组件 API 在已安装的依赖包中确实存在
- 颜色、排版、圆角和阴影全部使用了语义化 Tokens，特殊情况下圆角和间距可以硬编码，
- 所有字体族均使用token：--font-normal；`--font-number` 仅用于金额、价格、成交额、库存、统计指标等数据展示场景，时间、编号、ID、纯英文串等内容仍使用 `--font-normal`。
- 图标来自于 `@life-ds/icons` 且导出名称已核实
- 若页面未通过 `@life-ds/components-web` 的 `Icon` 组件使用图标，而是单独使用 `@life-ds/icons` 或手写 `<svg><use /></svg>`，则应用入口文件中已显式引入 `import '@life-ds/icons';`
- 若页面存在列表页筛选区，则已优先使用 `FilterGroup`、`Filter`、`FilterSelect`、`FilterDatePicker`、`FilterTimePicker` 等标准筛选器组件，而不是退回到表单控件组合或自定义筛选容器
- 悬停 (Hover)、聚焦 (focus)、激活 (active)、禁用 (disabled) 和加载中 (loading) 状态均已处理
- 焦点可见性强
- 响应式行为能够自适应结构，而不仅仅是尺寸
- 动效用于阐明状态变化，而不是用于装饰
- 代码实现遵循了仓库现有的规范
- 所有页面的所有元素均已依据 [design/design.md](design/design.md) 的设计原则重新 review；凡是不符合设计原则的布局、组件、样式、层级或交互，均已修改至符合要求后才交付
