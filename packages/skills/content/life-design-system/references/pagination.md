# 分页器 (Pagination)

当数据量过大，无法在单个页面内全部加载或展示时，使用分页器将数据分割成多个部分，允许用户通过翻页来浏览不同的数据集。

## 如何识别分页器

可能的分页器通常表现为：

- 位于表格、列表或卡片网格底部的水平数字序列。
- 包含“上一页”和“下一页”的箭头或文本按钮。
- 可能附带“跳转至第 \[ ] 页”的输入框。
- 可能附带“每页显示 \[ ] 条”的下拉选择器。
- 展示“共 \[ ] 条数据”的总数统计信息。

## 最佳实践

- **优先使用 life-ds 组件库中的分页器（Pagination）组件。**
- **位置固定**：通常放置在数据容器（如表格）的右下角或底部居中，保持位置的稳定性。
- **状态清晰**：明确高亮当前所在的页码，让用户清楚自己在整个数据集中的位置。
- **临界状态处理**：当处于第一页时，禁用“上一页”；处于最后一页时，禁用“下一页”。
- **单页隐藏**：当数据总数不足一页（如仅有 5 条数据，而每页限制 10 条）时，默认应隐藏整个分页器组件，避免视觉干扰。
- **加载联动**：点击翻页时，应联动上方的数据列表展示加载中（Loading）状态，防止用户在数据请求期间重复点击。

## 常见布局

- **基础数字分页**：仅包含“上一页”、数字页码序列、“下一页”。适用于数据量适中且用户习惯逐页浏览的场景。
- **精简版分页**：仅包含“上一页”和“下一页”箭头，或只展示“当前页/总页数”（如 1/5）。适用于空间极度受限（如弹窗内或卡片角落）或移动端视图。
- **完整版分页**：包含总数统计、页码序列、每页条数切换器以及快速跳转框。适用于后台管理系统中的重度数据表格。

## 分页器尺寸类名与规范

在使用组件库分页器时，根据可用空间和页面密度，选择合适的尺寸变体。

| 尺寸名称             | React Props           | 目标高度 | 适用场景                             |
| :--------------- | :-------------------- | :--- | :------------------------------- |
| **Default (默认)** | `size="default-size"` | 36px | 常规页面的表格或列表底部；默认会展示条数切换与跳页（默认选项） |
| **Small (小号)**   | `size="small"`        | 28px | 空间受限的卡片内部、抽屉或弹窗底部；通常会关闭条数切换与跳页，仅保留数字页码与前后箭头（精简版） |

说明：
- `size` 仅决定分页按钮/页码的基础尺寸（36/28），不强制决定是否展示「数量切换」与「跳页」。
- 若要做“小号精简版”（保持整体视觉为 28px 高），请设置 `showSizeChanger={false}` 且 `showQuickJumper={false}`；否则启用跳页会引入输入框区域，整体高度会按输入框尺寸表现。

**示例代码**：

```tsx
import React from 'react';
import { Pagination } from '@life-ds/components-web';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* ✅ 默认（完整版）：36px，高频用于表格底部 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          size="default-size"
          total={500}
          defaultCurrent={2}
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 50]}
          // 默认就是 true，这里显式写出便于理解
          showSizeChanger={true}
          showQuickJumper={true}
          onChange={(page, pageSize) => {
            console.log('page change:', page, pageSize);
          }}
        />
      </div>

      {/* ✅ 小号（精简版）：28px，空间受限场景 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          size="small"
          total={500}
          defaultCurrent={2}
          defaultPageSize={10}
          // 关闭「数量切换」与「跳页」以保持整体视觉为 28px
          showSizeChanger={false}
          showQuickJumper={false}
        />
      </div>
    </div>
  );
}
```

## 实现要点

在实现分页器时，请确保代码涵盖以下状态和逻辑：

- 默认 (Default) - 可点击的页码和箭头
- 悬停 (Hover)
- 激活 (Active) - 当前页码必须有明显的视觉区分（如主色背景）
- 禁用 (Disabled) - 第一页的“上一页”和最后一页的“下一页”必须不可点击
- 折叠省略 (Ellipsis) - 当页数极多（如 100 页）时，必须处理中间页码的折叠省略（如 1 2 3 ... 99 100），防止撑爆页面。
- 联动逻辑 - 切换“每页显示条数”时，应自动将当前页码重置为第 1 页。

## 反例（禁止）

```html
<!-- ❌ 禁止：手写 .lds-pagination DOM 结构与类名 -->
<div class="lds-pagination lds-pagination--default-size">...</div>
```

必须使用 `@life-ds/components-web` 的 React 组件：`<Pagination />`。

## 兜底策略

如果模式不明确：

- 选择最基础的“上一页/数字序列/下一页”标准变体。
- 确保它位于数据的正下方并右对齐。
- 除非有特殊的无限滚动（Infinite Scroll）需求，否则在长列表中始终提供分页器。
