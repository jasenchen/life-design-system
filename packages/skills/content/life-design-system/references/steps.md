# 步骤条 (Steps)

在表单填写、开通流程、资料提交或多阶段向导中，需要展示“当前进度位于第几步”时使用 `Steps`。

## 如何识别 Steps

典型的 `Steps` 通常表现为：

- 一排横向排列的步骤节点，中间通过连线串联。
- 每个步骤包含序号或完成标记，以及标题。
- 当前步骤通常使用主色高亮，已完成步骤显示完成态，未开始步骤使用弱化样式。
- 某些步骤标题下方还会带一行副文案说明。

## 最佳实践

- **优先使用 `@life-ds/components-web` 提供的 `<Steps>` 组件。**
- `Steps` 用于表达有先后顺序的流程阶段，不要用它替代平级切换组件 `Tabs`。
- 标题应简洁明确，概括当前步骤动作；副文案只补充必要说明，不要写成长段文字。
- 步骤数建议控制在用户可快速理解的范围内，常见为 3 到 6 步。
- 上一步、下一步、保存并继续等行为由外部按钮驱动，`Steps` 负责展示当前进度状态。
- 页面级内容应根据当前步骤切换，但步骤条本身应始终保持位置稳定。

## 常见布局

- **表单向导页**：步骤条在顶部，下方是当前步骤对应的表单内容。
- **开通流程页**：步骤条在说明文案下方，配合“上一步 / 下一步”按钮使用。
- **资料审核流**：步骤条展示阶段推进，副文案用于提示每一步需要准备的材料或动作。

```tsx
<Steps
  current={1}
  items={[
    { title: '填写基础信息', description: '门店名称、经营主体与联系人信息' },
    { title: '上传资质材料', description: '营业执照、许可证等必要资料' },
    { title: '配置经营设置' },
    { title: '提交审核', description: '确认无误后提交平台审核' },
  ]}
/>
```

## React 组件用法（推荐）

在 React 项目中，禁止手写 `.lds-steps` DOM 结构，应直接使用组件库提供的 `<Steps>`。

```tsx
import React from 'react';
import { Button, Steps } from '@life-ds/components-web';

export default function StepsDemo() {
  const [current, setCurrent] = React.useState(0);

  const items = [
    { title: '填写基础信息', description: '门店名称、经营主体与联系人信息' },
    { title: '上传资质材料', description: '营业执照、许可证等必要资料' },
    { title: '配置经营设置' },
    { title: '提交审核', description: '确认无误后提交平台审核' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Steps items={items} current={current} />

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button
          variant="default"
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
        >
          上一步
        </Button>
        <Button
          variant="primary"
          onClick={() => setCurrent((prev) => Math.min(prev + 1, items.length - 1))}
          disabled={current === items.length - 1}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
```

### Steps 组件 API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `Array<{ title: string; description?: string; disabled?: boolean }>` | - | 步骤数据源，包含标题和可选副文案 |
| `current` | `number` | `undefined` | 当前步骤索引，受控模式 |
| `defaultCurrent` | `number` | `0` | 默认当前步骤索引，非受控模式 |
| `onChange` | `(current: number) => void` | `undefined` | 点击步骤时的回调，可用于受控切换 |

## 实现要点

- `Steps` 需要至少覆盖三种状态：已完成、进行中、未开始。
- 已完成步骤显示完成标记；进行中步骤显示主色序号圆点；未开始步骤显示弱化序号圆点。
- 标题与副文案的层级必须清晰，副文案允许缺省。
- 连线用于强化流程顺序关系，最后一个步骤不显示后续连线。
- 步骤切换按钮应放在步骤条下方或表单底部，不应混入步骤条内部。

## 兜底策略

如果页面顶部出现的是“有明确先后顺序的流程导航”：

- 优先判断是否为步骤条，而不是标签页。
- 若存在“当前第几步”“上一步 / 下一步”“提交审核”等语义，通常应使用 `Steps`。
- 若只是平级内容切换，没有先后依赖关系，则改用 `Tabs`。
