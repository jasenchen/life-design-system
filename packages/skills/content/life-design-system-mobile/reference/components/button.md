# 移动端按钮 (Button)

使用 `@life-ds/components-mobile` 的 `Button` 触发明确操作，例如提交、确认、继续或打开下一个流程。

## 使用规则

- 每个页面或操作区只保留一个主按钮。主按钮使用 `primary`，取消或低优先级操作使用 `default`、`secondary` 或 `text`。
- 移动端以触控为先。按钮通过按下态提供反馈，不把 hover 当作必要状态。
- 固定底部操作区优先放置大号主按钮，内容区需要为底部操作区预留空间和安全区距离。
- 图标必须来自 `@life-ds/icons`，使用前核实图标 ID。图标按钮必须提供 `aria-label`。
- 本组件当前不提供 `loading` 属性。提交中的防重复触发由调用方通过 `disabled` 和业务状态控制。

## React 用法

```tsx
import '@life-ds/icons';
import { Button } from '@life-ds/components-mobile';

const AddIcon = () => (
  <svg aria-hidden="true">
    <use href="#ic-add-round-line" />
  </svg>
);

export function Actions() {
  return (
    <>
      <Button variant="primary" size="large">
        确认提交
      </Button>

      <Button variant="secondary" icon={<AddIcon />}>
        添加商品
      </Button>

      <Button variant="text">取消</Button>

      <Button variant="icon" icon={<AddIcon />} aria-label="添加商品" />
    </>
  );
}
```

## API

`ButtonProps` 继承 `React.ButtonHTMLAttributes<HTMLButtonElement>`，支持 `disabled`、`onClick`、`aria-label` 等原生按钮属性。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `'large' \| 'default-size' \| 'small'` | `'default-size'` | 大、默认、小三档尺寸 |
| `variant` | `'primary' \| 'default' \| 'secondary' \| 'text' \| 'icon'` | `'default'` | 主、普通、次要、文字、描边图标按钮 |
| `icon` | `React.ReactNode` | `undefined` | 标准按钮的左侧图标；`icon` 变体中为唯一内容 |

`variant="text"` 且只传入 `icon` 时，会使用紧凑文字图标按钮尺寸。这保留了与 PC Button 一致的公开 API，同时覆盖 Figma 中的文字图标按钮。

## Figma 映射

来源：[`按钮 Button`（节点 `3:876`）](https://www.figma.com/design/kV3m94WlA9kuhuffgWuUtN/%F0%9F%93%B1App%E7%AB%AF%E7%BB%84%E4%BB%B63.0-%E7%94%9F%E6%9C%8D%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=3-876)。

| 类型 | 大 / 默认 / 小 | 状态 Token |
| --- | --- | --- |
| `primary` | 48 / 40 / 32px，高度为胶囊圆角 | `primary-normal`、`primary-active`、`primary-disable` |
| `secondary` | 48 / 40 / 32px，高度为胶囊圆角 | `fill-normal` + `primary-normal` 描边；按下使用 `fill-primary` |
| `default` | 48 / 40 / 32px，高度为胶囊圆角 | `fill-normal` + `border-normal`；按下使用 `fill-primary` |
| `text` | 22 / 20 / 18px，无额外内边距 | 主文本、按下主色、禁用文本 |
| `icon` | 48 / 40 / 32px，方形描边按钮 | 默认填充/描边、按下浅主色、禁用填充/描边 |

颜色、间距、圆角和字体族均映射到现有 Token。Figma 的 `17/15/13px` 中字重字阶、文字图标按钮的 `28px` 外框，以及 `10/8px` 圆角在当前 Token 中没有等价项，因此按设计稿原值实现，没有新增 Token。
