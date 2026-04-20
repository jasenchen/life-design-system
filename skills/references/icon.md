# 图标参考文档

当任务需要使用 `@life-ds/icons` 选择或实现图标时，请参考此文件。

## 引入模式

在使用 `life-ds` 时，通过 SVG Sprite 的方式引入图标。确保您的项目中已经通过 `npx life-ds init` 将 `sprite.svg` 复制到了 `assets/` 目录。

示例 HTML 用法：
```html
<!-- 假设 sprite.svg 位于当前目录的 assets 文件夹下 -->
<svg class="lds-icon">
  <use href="./assets/sprite.svg#ic-arrow-right-line" />
</svg>
```

在支持组件化的项目中（如 React/Vue），您可以封装一个通用的 Icon 组件来简化调用，或者直接在模版中使用 `<svg>` 标签。

## 使用规则
• 在同一层级区域内保持图标尺寸一致。
• 常用尺寸：24, 16
• 纯图标控件必须始终具备可访问名称。
• 不要凭记忆捏造图标的 ID 名称，请核实 `sprite.svg` 中确切的图标 ID。
• 优先使用标准的 `lds-icon` 类名来控制图标的样式和尺寸。

## 常用图标名称
| 图标 ID | 用途 |
| --- | --- |
| ic-arrow-left-line | 返回、上一页 |
| ic-arrow-right-line | 下一步、进入详情 |
| ic-arrow-up-line | 向上、收起 |
| ic-arrow-down-line | 向下、展开 |
| ic-add-line | 新增、添加 |
| ic-reduce-line | 删除、减少、移除 |
| ic-search-line | 搜索 |
| ic-menu-line | 菜单、导航 |
| ic-more-h-line | 更多（横向） |
| ic-more-v-line | 更多（纵向） |
| ic-copy-line | 复制 |
| ic-delete-line | 删除（危险操作） |
| ic-share-line | 分享 |
| ic-link-line | 链接、跳转 |
| ic-user-line | 用户、个人 |
| ic-usergroup-line | 成员、团队 |
| ic-info-round-line | 信息提示 |
| ic-warning-round-line | 警告提示 |
| ic-error-round-line | 错误提示 |
| ic-time-round-line | 时间、历史 |

## 选择指南

优先根据意图选择图标：
• 导航类：`ic-arrow-left-line`、`ic-arrow-right-line`、`ic-arrow-up-line`、`ic-arrow-down-line`\n+• 操作类：`ic-add-line`、`ic-reduce-line`、`ic-copy-line`、`ic-delete-line`\n+• 搜索类：`ic-search-line`\n+• 菜单/更多：`ic-menu-line`、`ic-more-h-line`、`ic-more-v-line`\n+• 用户/团队：`ic-user-line`、`ic-usergroup-line`\n+• 状态提示：`ic-info-round-line`、`ic-warning-round-line`、`ic-error-round-line`\n+• 工具类：`ic-link-line`、`ic-share-line`\n+• 时间：`ic-time-round-line`

当有多个图标可用时，请优先选择：
1. 仓库其他地方已在使用的图标
2. 功能语义更清晰的图标
3. 视觉上更简洁的图标
