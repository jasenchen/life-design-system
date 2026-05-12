# 图标参考文档

当任务需要使用 `@life-ds/icons` 选择或实现图标时，请参考此文件。

## 引入模式

在使用 `@life-ds/icons` 时，请务必注意**不能直接通过静态文件路径引用 SVG Sprite**，因为跨域或代理拦截会导致图标无法渲染。正确的做法是通过包注入脚本，将所有图标集合直接注入到 HTML 的 `<body>` 中。

**第一步：全局注入图标**

在你的前端入口文件（如 `main.tsx` 或 `index.js`）中，引入图标包：

```javascript
// 这会自动将 Sprite 注入到页面的 body 内
import '@life-ds/icons';
```

**第二步：在组件中使用**

在任何 HTML 或组件中，**直接使用 Hash ID 锚点**引用注入的图标，而不要加上路径：

```html
<!-- ✅ 正确：直接使用 Hash ID 引用注入的 SVG -->
<svg class="lds-icon">
  <use href="#ic-arrow-right-line" />
</svg>

<!-- ❌ 错误：不要使用相对或绝对路径，会引发跨域/代理拦截问题 -->
<svg class="lds-icon">
  <use href="/assets/sprite.svg#ic-arrow-right-line" />
</svg>
```

在支持组件化的项目中（如 React/Vue），您可以封装一个通用的 Icon 组件来简化调用，或者直接在模版中使用 `<svg>` 标签。

## 使用规则

• 在同一层级区域内保持图标尺寸一致。

• 常用尺寸参考：12、14、16、18、20、24
• 当 icon 与文字同时使用时，icon 的尺寸应选择小于文字 `line-height` 的那一档
• 纯图标控件必须始终具备可访问名称。
• 不要凭记忆捏造图标的 ID 名称，请核实 `sprite.svg` 中确切的图标 ID。
• 优先使用标准的 `lds-icon` 类名来控制图标的样式和尺寸。

• 常规情况下，均使用线性图标，只有当图标尺寸很小的时候，才会使用对应的面性图标，若线性图标没有对应的面性图标，则使用线性图标

## 命名规则

典型命名方式：ic-xxx-line/ic-xxx-fill。其中ic为前缀，xxx为图标的英文含义，可以是多个词语，-line代表线性图标、-fill代表面性图标。

<br />

## 常用图标名称

| 图标 ID                 | 用途       |
| --------------------- | -------- |
| ic-arrow-left-line    | 返回、上一页   |
| ic-arrow-right-line   | 下一步、进入详情 |
| ic-arrow-up-line      | 向上、收起    |
| ic-arrow-down-line    | 向下、展开    |
| ic-add-line           | 新增、添加    |
| ic-reduce-line        | 删除、减少、移除 |
| ic-search-line        | 搜索       |
| ic-menu-line          | 菜单、导航    |
| ic-more-h-line        | 更多（横向）   |
| ic-more-v-line        | 更多（纵向）   |
| ic-copy-line          | 复制       |
| ic-delete-line        | 删除（危险操作） |
| ic-share-line         | 分享       |
| ic-link-line          | 链接、跳转    |
| ic-user-line          | 用户、个人    |
| ic-usergroup-line     | 成员、团队    |
| ic-info-round-line    | 信息提示     |
| ic-warning-round-line | 警告提示     |
| ic-error-round-line   | 错误提示     |
| ic-time-round-line    | 时间、历史    |
| ic-help-line          | 提示、详情、疑问 |

<br />

## 常用AI类图标

如果项目中有用到 AI 的功能，可使用 `ic-ai-` 前缀的 icon（优先使用 `-line`）。

| 图标 ID                    | 用途                    |
| ------------------------ | --------------------- |
| ic-ai-spark-line         | AI/智能（通用入口、灵感）        |
| ic-ai-tag-line           | AI 标签、AI 分类           |
| ic-ai-select-line        | AI 智能选区/抠图            |
| ic-ai-text-line          | AI 文本（识别/处理/生成）       |
| ic-ai-image-line         | AI 图像（处理/生成）          |
| ic-ai-outpainting-line   | AI 扩图/外延（Outpainting） |
| ic-ai-eliminate-line     | AI 消除/去除（对象移除）        |
| ic-ai-juxtapose-line     | AI 对比/并排（前后对比）        |
| ic-ai-change-bg-类型2      | AI 换背景                |
| ic-ai-camera-line        | AI 相机/拍照（智能拍照）        |
| ic-ai-improve-text-line  | AI 文本优化/润色            |
| ic-ai-generate-text-line | AI 文本生成               |
| ic-ai-hd-line            | AI 高清/增强（HD）          |

<br />

## 选择指南

优先根据意图选择图标：
• 导航类：`ic-arrow-left-line`、`ic-arrow-right-line`、`ic-arrow-up-line`、`ic-arrow-down-line`
• 操作类：`ic-add-line`、`ic-reduce-line`、`ic-copy-line`、`ic-delete-line`
• 搜索类：`ic-search-line`
• 菜单/更多：`ic-menu-line`、`ic-more-h-line`、`ic-more-v-line`
• 用户/团队：`ic-user-line`、`ic-usergroup-line`
• 状态提示：`ic-info-round-line`、`ic-warning-round-line`、`ic-error-round-line`
• 工具类：`ic-link-line`、`ic-share-line`
• 时间：`ic-time-round-line`

当有多个图标可用时，请优先选择：

1. 仓库其他地方已在使用的图标
2. 功能语义更清晰的图标
3. 视觉上更简洁的图标

