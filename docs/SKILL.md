***

name: life-design-system
description: 使用 @byted-tiktok/tux-web 构建或优化 抖音来客原生风格的 React Web 界面。当需要根据截图、设计稿、文本提示或现有代码实现抖音来客风格 UI 时（尤其是期望在 Web 端高度还原原生来客页面模式时）使用。
-----------------------------------------------------------------------------------------------------------------------------------

# 强制性规则

以下规则适用于所有任务。没有任何例外。

1. **优先使用 LD 组件。** 在构建自定义 UI 之前，务必优先使用 `@byted-tiktok/tux-web` 组件。当存在等效的 TUX 组件时，禁止创建自定义组件。
2. **所有视觉样式均使用语义化 Tokens。** 颜色、排版、圆角和阴影必须使用 design tokens。严禁在 UI 中硬编码色值、字号或圆角大小。
3. **所有文本必须使用 TUXText 或 TUX CSS 类。** 例如：`<TUXText typographyPreset='H1-Bold'>` 或 `<div className='H1-Bold'>`。严禁直接设置原始的 `font-size` 或 `font-weight` 值。
4. **使用 LD 图标。** 从 `life-design-system-icons`导入。不要捏造图标名称 —— 务必核实存在完全一致的导出项。
5. **不要凭空猜测 TUX APIs。** 将 `node_modules/@byted-tiktok/tux-web` 和项目中现有的用法作为事实依据进行检查。
6. **在能提升清晰度的地方考虑使用动效。** 对于交互状态变化（展开/收起、切换、焦点滑动、错误反馈），优先使用 LD 组件内置的动效。仅对非组件元素使用自定义动效，并遵循 [references/motion.md](references/motion.md) 的预设以保持一致性。
7. **遵循现有项目模式。** 如果仓库中已经使用了 LD 组件或本地封装组件，请在其基础上进行扩展，而不是创建平行的结构。
8. 每个项目的页面，需要增加字体平滑的代码：`-webkit-font-smoothing: antialiased`

***

# 核心工作流

## 1. 优先检查 life design system

检查是否已安装组件库`LD-web`、icon库`life-design-system-icons`、样式库`life-design-system-tokens`

<br />

如果未安装，在从头开始设计或实现之前，请遵循以下顺序：

1. \*\*首先安装样式库：\*\*运行 `npm install life-design-system-tokens`。它会安装样式库到项目中，并在项目中引入该样式库。
2. **安装icon库：运行**`npm install life-design-system-tokens`

注意事项：

- 脚本存放在 skill 文件夹中，而不是你当前的工作区根目录。如果你的 skill 目录不同，请相应更新路径。
- 如果上述路径不存在，请定位到已安装的 skill 目录并在那里运行，例如：`ls "$HOME/.trae-cn/skills/tiktok-design-system/scripts"` 或 `find "$HOME/.trae-cn/skills" -maxdepth 3 -path "*/tiktok-design-system/scripts/setup-env.sh" -print`。
- 请在真实的本地开发环境（而不是受限的沙盒环境）中运行上述命令。如果 clone/镜像源 访问被阻断，请停止并报告阻断原因。
- 如果镜像源配置错误，请运行 `npm config set registry https://bnpm.byted.org/` 然后重试。
- 当有现成的模板初始化方案可用时，不要手动构建新的项目结构。

***

## 2. 将 LD 作为默认的设计系统

将 `@byted-tiktok/tux-web` 的组件和样式作为默认的实现路径。

请阅读：

- [references/tokens.md](references/tokens.md)
- [references/icon.md](references/icon.md)
- [references/components.md](references/components.md)
- [references/motion.md](references/motion.md)
- [references/tux-web-implementation.md](references/tux-web-implementation.md)
- [references/stage-manager-page-push.md](references/stage-manager-page-push.md)

如果仓库中已经包含了合适的基于 TUX 的模式或本地封装，请在创建新结构之前优先扩展它们。
不要凭借记忆捏造不存在的 TUX 组件、属性 (props) 或 API。

***

## 2.5. 适用时应用卡片布局模板

当页面在成组的背景上有重复的内容区块时，请阅读：

- [references/layout.md](references/layout.md)

***

## 3. 需要时阅读图片指引

如果用户提供了截图、设计稿或其他视觉参考，也请阅读：

- [references/image-analysis.md](references/image-analysis.md)

使用图片来推断布局结构、层级、组件、Token 角色和状态 —— 然后使用 TUX 组件和 Tokens 进行实现。

如果追求像素级完美的克隆会导致糟糕的 Web 端实现效果，请不要这么做。在需要时使用占位图（例如 `https://picsum.photos/seed/reel-fashion/720/1280`）。

***

## 4. 优先使用可用的 Figma 源数据

如果连接了 Figma MCP 服务器，或者你可以读取 Figma 文件/节点数据，始终优先将其作为权威的设计数据源：

1. **将 Figma 样式 / Tokens / 变量映射到 TUX Tokens。** Figma 节点可能带有颜色样式、文本样式、效果样式，或绑定的变量（包括 Tokens Studio 的定义）。这些都是设计 Token 层的表现形式。读取当前存在的任何形式 —— 样式名称、变量别名或原始 Token 引用 —— 并将其解析为对应的 TUX 语义 Token（颜色、排版预设、圆角、阴影）。绝不要硬编码解析后的 hex/px 值；始终使用 TUX Token。
2. **将 Figma 组件映射到 TUX 组件。** 当 Figma 节点是设计系统组件（例如 `Button`、`NavBar`、`Sheet`）的实例时，识别出匹配的 `@byted-tiktok/tux-web` 组件，并将其变体属性转化为 TUX props。
3. **从 Figma 提取布局。** 使用自动布局 (auto-layout) 属性（padding、gap、alignment）来指导 CSS/布局决策，在适用时将它们转换为 TUX token 值。

如果某个 Figma 样式/Token/组件没有明确对应的 TUX 等效项，请明确记录此缺失，并降级使用最接近的 TUX 选项或最简化的自定义样式。

***

## 5. 实施开发

在编写代码之前，请检查代码仓库：检查 `TUXApp`、`styles.css` 和本地 TUX 封装是否已经配置好。遵循现有的模式。

构建优先级：

1. 复用仓库中已有的实现
2. 使用经过验证的 `@byted-tiktok/tux-web`、`@byted-tiktok/tux-icons`、`@byted-tiktok/tux-color` API
3. 仅当没有等效的 TUX 组件时，才进行最少的本地扩展
4. 对于页面的 push/pop 切换过渡，请使用 [references/stage-manager-page-push.md](references/stage-manager-page-push.md)

如果原生模式无法直接转换为 Web 端模式，请在适配优秀的 Web 模式的同时，保留原有层级和交互意图。

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

- 所使用的所有 TUX API 在已安装的依赖包中确实存在
- 颜色、排版、圆角和阴影全部使用了语义化 Tokens
- 文本使用了 `TUXText` 或 TUX CSS 类，并且 **所有文本均使用 TikTok Sans 字体** —— 除系统状态栏文本外，每一个可见的文本元素都必须使用 `TikTok Sans` 渲染。验证是否有元素回退到了系统或浏览器的默认字体。
- 图标来自于 `@byted-tiktok/tux-icons` 且导出名称已核实
- 页面级别的表面 (Surface) 家族保持一致（仅使用 `flat` 或 `grouped`，不要混用）
- 悬停 (Hover)、聚焦 (focus)、激活 (active)、禁用 (disabled) 和加载中 (loading) 状态均已处理
- 纯图标控件拥有无障碍 (accessible) 名称
- 焦点可见性强
- 响应式行为能够自适应结构，而不仅仅是尺寸
- 动效用于阐明状态变化，而不是用于装饰
- 代码实现遵循了仓库现有的规范

