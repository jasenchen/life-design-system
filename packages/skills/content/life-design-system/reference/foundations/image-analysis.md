# 图像分析指南 (Image Analysis)

当用户提供高保真的 UI 图像、截图、视觉稿、原型图或参考图，并希望实现相应的代码时，请参考此文件。

你的任务不仅仅是描述图像，而是对其进行“逆向工程”，将其转化为可构建的 UI：

- 推断结构
- 识别可能的组件
- 推断可能的 Token 和层级关系
- 识别可见的及隐含的状态
- 将结果转化为良好的 Web 实现，并保持相同的视觉感受

当原生应用和 Web 的约束不同时，应优先保留设计意图，而非追求像素级的模仿。

## 目标

从图像中提取足够的设计系统结构，以实现：

- 布局 (Layout)
- 组件 (Components)
- 间距和尺寸节奏 (Spacing and Sizing Rhythm)
- 表面层级 (Surface Hierarchy)
- 排版层级 (Typography Hierarchy)
- 颜色角色 (Color Roles)
- 图标处理 (Icon Treatment)
- 状态行为 (State Behavior)
- 可见或隐含的动效意图 (Motion Intent)

然后利用这些分析来编写真实的 UI 代码。

## 核心规则

- 将图像视为证据，而非完整的规范。
- 保守地推断缺失的生产环境细节。
- 紧密匹配视觉层级和交互感受。
- 优先选择设计系统的解释，而非临时的视觉模仿。
- 当追求绝对还原会导致 Web 体验不佳时，请使用更优的 Web 模式来保留相同的意图。

## 第一步：识别表面 (Identify The Surface)

首先确定这是哪种类型的页面或组件。

思考：

- 这是一个列表页、详情页、表单页、模态框、新手引导、还是工具 UI？
- 它是全屏的、内嵌的、嵌入式的还是基于浮层的？
- 它更像原生移动端 UI、桌面端 UI 还是移动端 Web？
- 图像显示的是整个屏幕、单个组件还是裁剪后的片段？

这为密度、间距、交互预期和可能的组件提供了上下文。

## 第二步：将图像拆分为区域 (Break The Image Into Regions)

在考虑实现之前，先将图像分解为结构区域。

常见的区域包括：

- 页面标题 ( pageHeader)
- 页面全局导航或菜单（navbar or menu）
- 主内容块 (Primary content block)
- 表单或输入区 (Form or Input area)
- 操作轨或页脚 CTA (Action rail or Footer CTA)
- 标签/导航区 (Tab/Navigation area)
- 底页、抽屉、模态框或浮层 (Sheet, Drawer, Modal, or Overlay)
- 背景和遮罩层 (Background and Backdrop layers)

用区域和阅读顺序来描述布局，而不仅仅是视觉片段。

## 第三步：推断组件边界 (Infer Component Boundaries)

将可见区域映射到可能的可复用组件。

寻找：

- 按钮 (Buttons)
- 标签页 (Tabs)
- 页面导航 (Nav bars)
- 页面菜单（Menu）
- 表单字段 (Form fields)
- 开关或选择器 (Switches or Selectors)
- 标签或徽章 (Chips or Badges)
- 底页、对话框、弹出框 (Sheets, Dialogs, Popovers)
- Toast 或行内反馈 (Toasts or Inline feedback)
- 图标按钮 (Icon buttons)

如果一个可见块是复合的，请将其拆分为子组件，而不是将其视为一个扁平的形状。

优先选择可能的系统组件，而非临时发明。

若截图中的组件与life-design-system-component不一致时，优先使用life-design-system-component，禁止在组件层面私自添加任何功能或者魔改样式！

在决定如何将图像区域映射到可复用 UI 模式时，请阅读 [组件总览](../components/index.md)。

## 第四步：理解层级 (Read The Hierarchy)

确定哪些是视觉上的主要内容、次要内容和辅助内容。

寻找层级信号，例如：

- 尺寸 (Size)
- 字重 (Weight)
- 对比度 (Contrast)
- 间距 (Spacing)
- 位置 (Placement)
- 对齐 (Alignment)
- 包含关系 (Containment)
- 海拔/高度 (Elevation)
- 重复 (Repetition)

识别：

- 主要操作 (Primary action)
- 次要操作 (Secondary action)
- 主要内容 (Primary content)
- 辅助内容 (Support content)
- 元数据 (Metadata)
- 三级框架 (Tertiary chrome)

不要将每个可见元素都视为同等重要。层级结构是代码中最重要的部分之一。

## 第五步：推断 Token 和基础规范 (Infer Tokens And Foundations)

利用图像推断可能的系统级决策。

估算：

- 间距节奏 (Spacing rhythm)
- 圆角家族 (Corner radius family)
- 控件高度 (Control heights)
- 图标尺寸 (Icon sizing)
- 边框使用 (Border usage)
- 表面深度 (Surface depth)
- 相似元素之间可能的 Token 重复

关于页面布局与风格，请阅读来客设计原则：[design.md](design.md)。

不要发明精确的 Token 名称（除非系统已定义），但要推断 Token 。

示例：

- 重复出现的约 8px 的间隙表明存在稳定的间距节奏。
- 重复出现的药丸形状表明存在共享的圆角家族。
- 重复出现的浅色分割线表明存在结构化的边框 Token。
- 在深色模式下，更亮的抬起卡片表明存在明确的层级区分。

## 第六步：推断颜色场景，而不仅仅是颜色 (Infer Color Roles)

不要仅将颜色视为原始色调。应根据场景来理解颜色。

识别可能的：

- 页面背景 (Page background)
- 底页或抬起的表面 (Sheet or Raised surface)
- 文本强调级别 (Text emphasis levels)
- 柔和及强烈的形状填充 (Subtle and Strong shape fills)
- 边框或分割线角色 (Border or Divider roles)
- 强调色用法 (Accent usage)
- 媒体上的覆盖处理 (Overlay treatment on media)

思考：

- 哪些元素使用了中性的系统色？
- 哪里是强调？
- 存在多少个表面层级？
- 设计是否依赖于页面、底页、形状和覆盖层的区分？

阅读 [colors.md](colors.md)。

## 第七步：推断文本层级 (Infer Typography Hierarchy)

根据功能来理解排版，而不仅仅是表面的尺寸。

识别可能的：

- 页面标题 ( pageheader)
- 内容区域(Screen title)
- 区域页眉 (Section header)
- 正文 (Body text)
- 元数据 (Metadata)
- 辅助文本 (Supporting text)
- 按钮文本处理 (Button label treatment)

寻找：

- 字重对比 (Weight contrast)
- 尺寸跳跃 (Size jumps)
- 密度 (Density)
- 行长 (Line length)
- 文本分组 (Text grouping)

如果精确的预设不明显，请保留层级模式，而不是盲目猜测数字。

## 第八步：推断状态和交互行为 (Infer States And Interaction Behavior)

静态图像很少能显示每个状态，因此请推断最基本的生产就绪状态集。

在相关情况下务必推断：

- 悬停 (Hover)
- 聚焦 (Focus)
- 激活 (Active)
- 禁用 (Disabled)
- 加载中 (Loading)
- 空状态 (Empty)
- 错误 (Error)
- 成功 (Success)

同时推断：

- 选中状态 (Selected state)
- 按下状态 (Pressed state)
- 展开或折叠状态 (Expanded or Collapsed state)
- 当前标签或活动的导航项 (Current tab or Active navigation item)
- 模态框打开状态 (Modal open state)
- 输入已填充或占位符状态 (Input filled or Placeholder state)

如果图像仅显示静态，请根据组件类型实现可能缺失的状态。

## 第九步：推断动效意图 (Infer Motion Intent)

静态图像不会直接显示动效，但通常会暗示动效。

寻找可能的动效场景：

- 底页或模态框进入 (Sheet or Modal entrance)
- 标签页切换 (Tab switching)
- 内容展开 (Content expansion)
- 按钮加载转换 (Button loading transition)
- Toast 出现 (Toast appearance)
- 媒体覆盖显示 (Media overlay reveal)
- 骨架屏到内容的转换 (Skeleton-to-content transition)

仅在实现所需的范围内推断动效。不要从静态图像中捏造复杂的动画系统。

阅读 [motion.md](motion.md)。

## 第十步：决定哪些必须精确匹配，哪些可以近似 (Match Exactly VS Approximately)

并非每个细节都值得完全复刻。

紧密匹配：

- 层级结构 (Hierarchy)
- 间距感 (Spacing feel)
- 组件结构 (Component structure)
- 表面深度 (Surface depth)
- 整体交互基调 (Overall interaction tone)

必要时进行近似处理：

- 仅限原生的手势行为 (Native-only gesture behavior)
- 无法很好转化为 Web 的平台特定间距规范
- 截图中的异常排版或渲染瑕疵
- 如果核准的图标集不同，则使用近似的图标

如果还原度和可用性发生冲突，请使用更优的 Web 实现来保留相同的意图。

\*\*重要！\*\*若判断截图为原型图，则只需要关注截图内容，对于截图的UI风格则不必进行遵循，请使用更优的 Web 实现来保留相同的意图。

## 第十一步：对文案信息进行校对

截图的文案可能会使用xx代表数据等不明确的内容，请构造一些真实的文案或者数据替换对应的内容。

## 第十二步：将分析转化为可构建的结构 (Convert To Buildable Structure)

在编码之前，将图像转化为实现计划。

至少确定：

- 页面或组件结构
- 主要的可复用子组件
- 可能的布局容器
- 由 Token 驱动的样式决策
- 响应式适配策略
- 所需的状态覆盖
- 可能的无障碍需求

在建立组件结构之前，不要直接从截图跳转到 CSS 细节。

**重要！**对于截图中涉及组件与组件规范的冲突处理：请优先保证所有组件的使用是符合组件使用规范。

## 第十三步：在真实技术栈中实现 (Implement In The Real Stack)

分析之后，在仓库的实际技术栈中构建 UI。

优先：

- 现有的代码库模式
- 项目中已使用的系统组件
- 存在或明确要求时使用 `@Life-ds/components-web`
- 使用语义化的 Token 映射，而非硬编码的值

## 无障碍规则 (Accessibility Rules)

不要让还原度抹杀可用性。

务必确保：

- 文本保持可读
- 控件具有可访问名称 (Accessible names)
- 聚焦状态可见
- 对比度足够
- 仅图标的操作已标注标签
- 浮层正确管理焦点
- 状态变化在不完全依赖动效的情况下也是可理解的

## 输出预期 (Output Expectations)

使用此文件时，应产出：

- 对图像结构的简要解读
- 可能的组件和 Token 角色
- 任何重要的假设
- 实现的代码

保持分析简洁有用。分析的目的是支持准确的实现，而不是取代它。

## 评审清单 (Review Checklist)

在最终完成前，核实：

- 实现是否保留了图像的层级结构
- 主要组件是否映射正确
- 间距和表面深度是否与来源一致
- 是否添加了可能缺失的状态
- 结果看起来是经过深思熟虑的，而非简单的截图临摹

## 兜底策略 (Fallback)

如果图像不完整、被裁剪、模糊或含义不明：

- 保守地推断缺失的结构
- 保留可见的层级和模式语言
- 实现最基本的生产就绪状态
- 简要说明关键假设
