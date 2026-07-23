# 表单 (Form)

在用户需要按字段录入、编辑或确认结构化信息（如新建/编辑实体、配置项、筛选条件）时使用表单，用以组织"标题 + 控件 + 说明/错误"的标准排版。

## 如何识别表单

可能的表单通常表现为：

- 多行"左侧标题 + 右侧控件"的对齐排版，标题列宽度一致。
- 标题文字偏次要色（灰），控件文字为正文色，下方常带浅色说明文案。
- 必填字段的标题旁出现红色小星标 / 必填标识。
- 标题旁伴随灰色问号图标，悬停或点击可查看字段说明。
- 错误时控件下方出现红色提示文字，替换掉原本的灰色说明。

## 最佳实践

- **优先使用 @life-ds/components-web 组件库中的** **`<Form>`** **+** **`<FormItem>`** **组件（如果是在 React 项目中）。**
- 同一个表单中，标题列宽度保持一致，避免逐项调宽度。
- 标题应使用名词短语（如"用户名称"），不要写成完整句子或带冒号。
- 必填字段使用 `required`，不要靠在 label 中手动拼接 `*`。
- 字段说明优先用 `description`（灰色），仅在校验失败时使用 `error`（红色）。
- 同一个 `FormItem` 内尽量只放一个主控件；需要并排多个控件时，自行在 `children` 中组合。
- 所有控件优先使用 `@life-ds/components-web` 提供的 Input / Textarea / Select / Upload 等，确保高度与 label 行高对齐。
- 当 `FormItem` 内使用一组 `Radio` 的 `card` 样式时，同一组卡片宽度应保持一致；如需自定义宽度，应优先在组容器层统一控制，不要对单个卡片分别设置不同宽度。
- **表单提交按钮在任何时候都应保持可点击状态，不要默认置灰或根据字段是否填写动态 disabled**；校验应发生在用户点击提交时，集中检查必填项、格式等信息，并将结果通过每个 `FormItem` 的 `error` 属性回显。
- 校验失败时应聚焦到第一个出错字段，并保持提交按钮仍然可再次点击，允许用户修正后继续提交。
- 仅在请求进行中（Loading）使用按钮的加载态防止重复提交，而不是用 disabled 表达"表单未填完"。

## 常见布局

- **横向 (Horizontal)**：左侧标题 + 右侧控件，适合 PC 端中后台、信息密度较高的编辑页（默认）。
- **纵向 (Vertical)**：标题在上、控件在下，适合窄宽容器（如 Drawer 抽屉、移动端、弹窗内表单）。
- **混合布局**：整体使用横向布局，对个别长字段（如富文本、文件上传）单独设置 `layout="vertical"`。
- **抽屉/对话框中的表单**：与 `<Drawer>`、`<Dialog>` 配合，标题最多4个字时，宽度建议保持默认 90px ，2个字时缩小到 70px，大于4个字时建议自定义到120px，一般文字不建议超过6个字，。

## React 组件用法（推荐）

在 React 项目中，**禁止手写 CSS 类名拼接**，必须使用 `@life-ds/components-web` 包提供的 `<Form>` + `<FormItem>` 组件，以避免标题宽度、必填标识、错误态等结构和样式遗漏。

```tsx
import { Form, FormItem, Input, Textarea } from '@life-ds/components-web';

// ✅ 正确：使用 React 组件
<Form labelWidth={90}>
  <FormItem label="用户名称" htmlFor="name" required>
    <Input id="name" placeholder="请输入用户名称" />
  </FormItem>
  <FormItem
    label="联系方式"
    htmlFor="phone"
    required
    tooltip="用于接收通知短信"
    error="请输入正确的手机号"
  >
    <Input id="phone" placeholder="请输入手机号" />
  </FormItem>
  <FormItem label="备注" htmlFor="remark" description="不超过 200 字">
    <Textarea id="remark" />
  </FormItem>
</Form>

// ✅ 正确：纵向布局（适合 Drawer 内）
<Form layout="vertical">
  <FormItem label="标题">
    <Input />
  </FormItem>
</Form>

// ❌ 错误：在 React 中手动拼接类名
<div className="lds-form">
  <div className="lds-form-item">
    <div className="lds-form-item__label">用户名称</div>
    <div className="lds-form-item__main">...</div>
  </div>
</div>
```

### Form 组件 API

| 属性           | 类型                           | 默认值            | 说明                                   |
| ------------ | ---------------------------- | -------------- | ------------------------------------ |
| `labelWidth` | `number \| string`           | `90`           | 统一设置左侧标题宽度，数字按 px 处理；最小宽度受 70px 限制   |
| `layout`     | `'horizontal' \| 'vertical'` | `'horizontal'` | 表单整体排列方式（横向 / 纵向），可被单个 `FormItem` 覆盖 |

### FormItem 组件 API

| 属性                 | 类型                           | 默认值         | 说明                                       |
| ------------------ | ---------------------------- | ----------- | ---------------------------------------- |
| `label`            | `React.ReactNode`            | `undefined` | 左侧标题内容                                   |
| `htmlFor`          | `string`                     | `undefined` | 关联控件 id，传入时使用 `<label>` 渲染以支持点击聚焦        |
| `required`         | `boolean`                    | `false`     | 是否展示必填标识（红色星标，10px）                      |
| `tooltip`          | `string`                     | `undefined` | 帮助提示文案，会以原生 `title` 形式挂在问号图标上            |
| `onTooltipClick`   | `(e) => void`                | `undefined` | 点击帮助图标的回调，提供时也会渲染问号图标                    |
| `tooltipAriaLabel` | `string`                     | `'查看字段说明'`  | 帮助图标的无障碍名称                               |
| `description`      | `React.ReactNode`            | `undefined` | 控件下方的常规说明文案（灰色 caption）                  |
| `error`            | `React.ReactNode`            | `undefined` | 控件下方的错误文案，存在时会覆盖 `description` 并切换为红色错误态 |
| `labelWidth`       | `number \| string`           | 继承 `Form`   | 单独覆盖当前项的标题宽度                             |
| `layout`           | `'horizontal' \| 'vertical'` | 继承 `Form`   | 单独覆盖当前项的排列方式                             |

***

## 原生 HTML/CSS 用法（非 React 环境）

在非 React 环境中使用表单结构时，**必须**完整组合下表的 BEM 类名，否则会缺失对齐、必填标识、错误态等样式。

| 区块          | 类名                                                                           | 说明                                         |
| :---------- | :--------------------------------------------------------------------------- | :----------------------------------------- |
| **表单容器**    | `.lds-form` + `.lds-form--horizontal` / `.lds-form--vertical`                | 表单根节点，必须组合布局类名                             |
| **表单项**     | `.lds-form-item` + `.lds-form-item--horizontal` / `.lds-form-item--vertical` | 单个字段容器                                     |
| **标题区**     | `.lds-form-item__label` > `.lds-form-item__label-inner`                      | 左侧（或顶部）标题区，宽度由 `--lds-form-label-width` 控制 |
| **问号图标**    | `.lds-form-item__tooltip`（16px）                                              | 标题旁的帮助按钮，内部放 `<svg class="icon">`          |
| **必填标识**    | `.lds-form-item__required`（10px）                                             | 红色必填星标，内部放 `<svg class="icon">`            |
| **主体区**     | `.lds-form-item__main` > `.lds-form-item__control`                           | 右侧（或下方）控件容器                                |
| **说明 / 错误** | `.lds-form-item__message`，错误时追加 `.is-error`                                  | 控件下方的辅助文案                                  |

**布局规格**：

| 属性          | 横向 (Horizontal)                          | 纵向 (Vertical)    |
| :---------- | :--------------------------------------- | :--------------- |
| 主轴方向        | 行（label 左 / 控件右）                         | 列（label 上 / 控件下） |
| 项间距         | 20px                                     | 20px             |
| label 与控件间距 | 20px                                     | 8px              |
| label 高度    | min-height 40px（与 Default 控件对齐）          | min-height 22px  |
| label 宽度    | `--lds-form-label-width`，默认 90px，最小 70px | `auto`           |

**示例代码**：

```html
<!-- ✅ 正确：完整 BEM 结构 -->
<div class="lds-form lds-form--horizontal" style="--lds-form-label-width: 90px;">
  <div class="lds-form-item lds-form-item--horizontal">
    <div class="lds-form-item__label">
      <label class="lds-form-item__label-inner" for="name">
        <span class="lds-form-item__label-text">用户名称</span>
        <span class="lds-form-item__required" aria-hidden="true">
          <svg class="icon" width="10" height="10"><use href="#ic-required-line" /></svg>
        </span>
      </label>
    </div>
    <div class="lds-form-item__main">
      <div class="lds-form-item__control">
        <input id="name" class="lds-input" placeholder="请输入用户名称" />
      </div>
      <div class="lds-form-item__message is-error" role="alert">用户名称必填</div>
    </div>
  </div>
</div>

<!-- ❌ 错误：缺失布局修饰类，标题列宽度与对齐失效 -->
<div class="lds-form">
  <div class="lds-form-item">...</div>
</div>
```

## 实现要点

在实现表单时，请确保覆盖以下行为：

- 标题与控件垂直方向上严格对齐（横向布局下 label 的 `min-height` 与 Default 控件高度 40px 一致）。
- 标题宽度遵循 `--lds-form-label-width`，并强制 `min-width: 70px`，避免过窄塌陷。
- 必填标识使用 `ic-required-line` 图标，尺寸 10px，颜色 `var(--color-danger-normal)`。
- 帮助提示使用 `ic-help-line` 图标，尺寸 16px，颜色 `var(--color-text-caption)`，需具备 hover / active / focus-visible 状态。
- `error` 文案存在时优先级高于 `description`，且整段文字切换为 `var(--color-danger-normal)`，并设置 `role="alert"` 以便屏幕阅读器及时朗读。
- 当 `htmlFor` 提供时，标题区使用 `<label>` 渲染，点击标题可聚焦控件。
- 与 Input / Textarea / Select / Upload 等控件搭配使用时，控件应自行占满 `__control` 宽度。
- 当 `Radio card` 成组出现在表单中时，应默认保持同组等宽；若需要调整宽度，优先为整组提供统一宽度规则，仅在信息密度确有明显差异时才打破等宽。
- **提交按钮应始终保持可点击**：不要根据字段是否填写来 disabled 提交按钮；校验在用户点击提交时一次性触发，错误通过 `FormItem` 的 `error` 回显，提交按钮仅在请求进行中使用 Loading 防重。

## 提交与校验

表单的校验时机统一在"点击提交"这一刻触发，而不是在用户输入过程中持续阻止提交。推荐模式如下：

1. 提交按钮始终保持 `variant="primary"` 可点击状态，**不要使用 `disabled` 表达"字段未填完"**。
2. 点击提交时，业务层集中运行校验规则（必填、格式、长度、异步接口校验等）。
3. 将校验结果映射为 `errors` 对象，并通过对应 `FormItem` 的 `error` 属性回显红色错误文案。
4. 若存在错误，聚焦首个出错字段；若全部通过，再进入真实的请求阶段，此时再对提交按钮使用 Loading 状态防止重复点击。

```tsx
import { useState } from 'react';
import { Button, Form, FormItem, Input } from '@life-ds/components-web';

function CreateUserForm() {
  const [values, setValues] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // ✅ 点击提交时统一校验
    const nextErrors: typeof errors = {};
    if (!values.name) nextErrors.name = '请输入用户名称';
    if (!/^1\d{10}$/.test(values.phone)) nextErrors.phone = '请输入正确的手机号';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await submit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form labelWidth={90}>
      <FormItem label="用户名称" htmlFor="name" required error={errors.name}>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
      </FormItem>
      <FormItem label="联系方式" htmlFor="phone" required error={errors.phone}>
        <Input
          id="phone"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
        />
      </FormItem>
      {/* ✅ 正确：提交按钮始终可点击，仅在请求中使用 Loading */}
      <Button variant="primary" loading={loading} onClick={handleSubmit}>
        提交
      </Button>
      {/* ❌ 错误：根据字段是否填写动态 disabled */}
      {/* <Button variant="primary" disabled={!values.name || !values.phone}>提交</Button> */}
    </Form>
  );
}
```

## 兜底策略

如果模式不明确：

- 默认使用横向布局 + 90px 标题宽度。
- 字段说明优先放在 `description` 而不是控件 `placeholder` 中。
- 若设计稿未提供错误态，仅展示 `description`，不要凭空设计错误文案。
- 不要在 `FormItem` 之外另行包一层 `<form>` 来注入校验逻辑，校验请由业务层控制并把结果通过 `error` 传入。
