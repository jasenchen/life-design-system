### 颜色

请务必使用来自 life-design-system-tokens.css的颜色 Token，并通过基于 CSS 数据属性选择器 (Data Attribute Selector) 结合 CSS Variables (自定义属性) 的方式来实现主题切换。

> \*\*注意事项：**token有2层，底层token不带有业务属性，比如** **`--color-brand-5` 指5号品牌色，二层token都带有业务属性，比如** \*\*`--color-text-primary` 是主要文本的颜色token。
>
> 带有\*\* **`primary` 是**品牌色\*\*；
>
> 带有\*\* **`text` 是**文本色\*\*；
>
> 带有\*\* **`link` 是**链接色\*\*；
>
> 带有\*\* **`border` 是**描边色\*\*；
>
> 带有\*\* **`divider` 是**分割线颜色\*\*；
>
> 带有\*\* **`fill` 是**描边色\*\*；
>
> 带有\*\* **`bg` 是**页面背景色\*\*；
>
> 带有\*\* **`success` 是**成功色\*\*；
>
> 带有\*\* **`warning` 是**警示色\*\*；
>
> 带有\*\* **`danger` 是**错误色\*\*；
>
> 带有\*\* **`info` 是**提示色\*\*；
>
> 带有\*\* **`light` 是**浅色颜色\*\*；
>
> 状态命名：
>
> 带有\*\* **`normal` 是**默认状态\*\*；
>
> 带有\*\* **`hover` 是**hover状态\*\*；
>
> 带有\*\* **`active` 是**激活或者点击状态\*\*；
>
> 带有\*\* **`disable` 是**禁用状态\*\*；

#### 布局表面 (Layout Surface)

**页面背景：**

| Token               | 用途                |
| :------------------ | :---------------- |
| `--color-bg-normal` | 扁平页面背景            |
| `--color-bg-popup`  | 弹层、弹框、popup等组件的背景 |
| `--color-bg-mask`   | 蒙层背景              |

容器背景：

| Token                  | 用途            |
| :--------------------- | :------------ |
| `--color-fill-normal`  | 容器、卡片、组件的默认背景 |
| `--color-fill-gray`    | 灰色容器的背景       |
| `--color-fill-primary` | 浅色主色作为容器的背景   |

- `*-bg `— 整体页面的背景
- `*-fill `— 容器、卡片、组件等的默认背景

<br />

品牌颜色：

> 品牌颜色可以被应用到更广泛的场景，比如按钮的背景色，高亮文字色等场景，在任何需要品牌主色的时候均需要从这部分中使用。

| Token                          | 用途       |
| :----------------------------- | :------- |
| `--color-primary-normal`       | 默认品牌主色   |
| `--color-primary-light-normal` | 默认品牌浅色主色 |

#### 文本颜色

| Token                    | 用途        |
| ------------------------ | --------- |
| `--color-text-primary`   | 主要文本      |
| `--color-text-scondary`  | 次要文本      |
| `--color-text-caption`   | 辅助文本      |
| `--color-text-disable`   | 禁用文本      |
| `--color-text-white`     | 白色文本      |
| `--color-text-important` | 金额等场景的强调色 |

<br />

#### 常见组合模式

| 用例                | Token(s)                                                |
| ----------------- | ------------------------------------------------------- |
| 页面背景 & 容器、组件      | `--color-bg-normal `+ `-color-fill-normal`              |
| 页面上的卡片            | `ui-page-flat-2` / `ui-page-grouped-2`                  |
| 分割线 / 边框          | `--color-divider-normal `或 `--color-border-normal`      |
| 模态框遮罩层 (backdrop) | `--color-bg-mask`                                       |
| 图标颜色              | `--color-text-primary/secondary/caption/disable`(与文本相同) |
| 品牌强调色             | `--color-text-primary`                                  |

