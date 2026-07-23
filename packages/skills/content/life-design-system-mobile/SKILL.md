---
name: "life-design-system-mobile"
description: "使用 Life Design System 构建移动端 H5 React 页面。用户提出手机端、H5、触屏、底部导航或安全区页面时使用；不用于 PC 后台或 Taro 小程序。"
---

# Life Design System Mobile

## 适用范围

本 Skill 只处理移动端 H5 / React 页面，包括手机端页面、窄屏内容编排、触屏交互、底部操作区和安全区适配。

- PC 桌面端后台、侧边栏、宽表和桌面筛选器使用 `life-design-system-pc`。
- 微信小程序、Taro 或跨端小程序使用对应的小程序 Skill，不使用本 Skill。
- 用户未说明目标端时，先确认目标设备与运行形态；不得通过同一套页面同时兼容 PC 后台与移动端。

## 强制性规则

1. **先读移动端规范。** 实现任何页面前，必须阅读 [移动端设计原则](reference/foundations/design.md)、[移动端页面规范](reference/pages/mobile.md) 与 [移动端组件现状](reference/components/index.md)。
2. **共享 Token、颜色与图标。** 颜色、排版、圆角、阴影和图标必须遵循共享规范：[Token](../_shared/reference/foundations/tokens.md)、[颜色](../_shared/reference/foundations/colors.md)、[图标](../_shared/reference/components/icon.md)。不得硬编码色值或捏造图标 ID。
3. **不复用桌面端组件。** 禁止使用 `@life-ds/components-web`、`Navbar`、`Menu`、`Table`、`FilterGroup` 等 PC 组件或布局来拼装移动端页面。
4. **不虚构移动组件 API。** `@life-ds/components-mobile` 已发布 `Button`，使用前必须阅读对应组件文档并优先使用其 React API。其余组件尚未发布；没有等效组件时，仅按本 Skill 的规范实现最小必要结构。
5. **以触屏交互为先。** 页面需处理安全区、键盘遮挡、滚动容器、固定底部操作与加载、空、错误、禁用状态；不要把 hover 当作关键交互反馈。
6. **字体规则不变。** 所有常规文本使用 `--font-normal`；`--font-number` 仅用于金额、价格、成交额、库存和统计指标。
7. **Figma 为视觉数据源。** 有可用 Figma 数据时，优先映射到共享 Token；没有对应 Token 或组件时，明确记录缺口，不得伪造既有 API。

## 实施顺序

1. 判断目标是否为移动端 H5 / React，并确认是否有现成移动组件。
2. 阅读共享 Token、颜色、图标规范，以及本 Skill 的页面和组件规范。
3. 将页面拆分为顶部导航、内容区、浮层或底部操作区，确认唯一主操作。
4. 优先复用已发布的移动端组件；当前没有等效组件时，做最小本地实现并保持 API 边界清晰。
5. 验证触控、滚动、安全区、键盘和状态反馈。

## 交付检查

- 没有导入 `@life-ds/components-web` 或套用 PC 的侧栏、宽表布局。
- 颜色、排版、圆角和阴影均使用共享 Token。
- 图标均来自 `@life-ds/icons`，且名称已核实。
- 页面在窄屏下没有横向溢出，固定区域不会遮挡内容或系统安全区。
- 主操作稳定可见，触控、加载、空、错误和禁用状态均已处理。
