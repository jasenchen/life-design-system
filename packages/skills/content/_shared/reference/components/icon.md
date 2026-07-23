# 图标参考文档

本规范同时适用于 `life-design-system-pc` 和 `life-design-system-mobile`。图标资源唯一来源是 `@life-ds/icons`；具体的 `Icon` React 组件由对应端的组件包提供时，必须遵循该组件包的 API 文档。

## 引入方式

若当前端的组件包没有自动注入 SVG Sprite，或项目直接使用 `@life-ds/icons`，必须在应用入口引入：

```ts
import '@life-ds/icons';
```

通过 Hash ID 引用注入的 Sprite，不要使用静态文件路径：

```html
<svg class="lds-icon" aria-hidden="true">
  <use href="#ic-arrow-right-line" />
</svg>
```

```html
<!-- 错误：不要使用静态资源路径引用 Sprite -->
<svg>
  <use href="/assets/sprite.svg#ic-arrow-right-line" />
</svg>
```

## 使用规则

- 不要凭记忆捏造图标 ID；使用前必须在 `sprite.svg` 或图标包中核实。
- 同一区域保持图标尺寸一致；图标与文字同行时，尺寸小于文字 `line-height`。
- 纯图标控件必须具备可访问名称，装饰性图标应标记为 `aria-hidden="true"`。
- 默认使用线性图标；只有尺寸很小且存在对应资源时，才使用面性图标。
- 颜色使用文本语义 Token，如 `--color-text-primary`、`--color-text-secondary`、`--color-text-caption` 或 `--color-text-disable`。
- 当前端组件包提供额外图标变体时，先阅读该端的组件文档；不要将某一端的专属资源或属性迁移到另一端。

## 命名规则

典型命名方式为 `ic-xxx-line` 或 `ic-xxx-fill`：`ic` 是前缀，`xxx` 表示英文语义，`line` 为线性图标，`fill` 为面性图标。

## 常用图标

| 图标 ID | 用途 |
| --- | --- |
| `ic-arrow-left-line` | 返回、上一页 |
| `ic-arrow-right-line` | 下一步、进入详情 |
| `ic-arrow-up-line` | 向上、收起 |
| `ic-arrow-down-line` | 向下、展开 |
| `ic-add-line` | 新增、添加 |
| `ic-reduce-line` | 删除、减少、移除 |
| `ic-search-line` | 搜索 |
| `ic-menu-line` | 菜单、导航 |
| `ic-more-h-line` | 更多（横向） |
| `ic-more-v-line` | 更多（纵向） |
| `ic-copy-line` | 复制 |
| `ic-delete-line` | 删除（危险操作） |
| `ic-share-line` | 分享 |
| `ic-link-line` | 链接、跳转 |
| `ic-user-line` | 用户、个人 |
| `ic-usergroup-line` | 成员、团队 |
| `ic-info-round-line` | 信息提示 |
| `ic-warning-round-line` | 警告提示 |
| `ic-error-round-line` | 错误提示 |
| `ic-time-round-line` | 时间、历史 |
| `ic-help-line` | 提示、详情、疑问 |

## AI 图标

AI 相关功能优先使用 `ic-ai-` 前缀的线性图标，例如 `ic-ai-spark-line`、`ic-ai-tag-line`、`ic-ai-text-line`、`ic-ai-image-line`、`ic-ai-camera-line` 和 `ic-ai-generate-text-line`。使用前同样需要核实资源存在。
