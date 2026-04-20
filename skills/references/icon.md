# 图标参考文档

当任务需要使用 `@byted-tiktok/tux-icons` 选择或实现图标时，请参考此文件。

## 引入模式

在使用 `life-ds` 时，通过 SVG Sprite 的方式引入图标。确保您的项目中已经通过 `npx life-ds init` 将 `sprite.svg` 复制到了 `assets/` 目录。

示例 HTML 用法：
```html
<!-- 假设 sprite.svg 位于当前目录的 assets 文件夹下 -->
<svg class="lds-icon">
  <use href="./assets/sprite.svg#Chevron_Right_Slim_LTR" />
</svg>
```

在支持组件化的项目中（如 React/Vue），您可以封装一个通用的 Icon 组件来简化调用，或者直接在模版中使用 `<svg>` 标签。

## 使用规则
• 在同一层级区域内保持图标尺寸一致。
• 常用尺寸：24, 16
• 纯图标控件必须始终具备可访问名称。
• 不要凭记忆捏造图标组件名称，请核实确切的导出名称。
• 优先使用 **常规的 'TUXIcon'** 而非 'TUXIcon3pt' / 'TUXIconColor' 变体。

## 常用图标名称
| 名称                           | 建议组件                       | 用途                    |
| ------------------------------ | ------------------------------ | ----------------------- |
| Chevron_Left_Offset_LTR        | TUXIconChevronLeftOffsetLTR    | 返回、标题栏返回按钮    |
| Chevron_Right_Offset_Small_LTR | TUXIconChevronRightOffsetSmallLTR | 展开、下一步        |
| Chevron_Right_Slim_LTR         | TUXIconChevronRightSlimLTR     | 细条展开、下一步        |
| X_Mark                         | TUXIconXMark                   | 关闭、清除、取消        |
| Magnifying_Glass               | TUXIconMagnifyingGlass         | 搜索                    |
| Camera                         | TUXIconCamera                  | 相机                    |
| Play                           | TUXIconPlay                    | 播放视频                |
| Pause_Fill                     | TUXIconPauseFill               | 暂停                    |
| Music_Note_S_Alt               | TUXIconMusicNoteSAlt           | 音乐                    |
| Speaker_2_LTR                  | TUXIconSpeaker2LTR             | 音量、扬声器            |
| Speaker_X_Mark_LTR             | TUXIconSpeakerXMarkLTR         | 静音                    |
| Shopping_Cart_LTR              | TUXIconShoppingCartLTR         | 购物车                  |
| Wallet                         | TUXIconWallet                  | 钱包、支付              |
| Eye                            | TUXIconEye                     | 可见、浏览量            |
| Eye_Slash                      | TUXIconEyeSlash                | 隐藏                    |
| Clock                          | TUXIconClock                   | 时间、历史              |
| Calendar                       | TUXIconCalendar                | 日期、事件              |
| Info_Circle                    | TUXIconInfoCircle              | 信息                    |
| Exclamation_Mark_Triangle      | TUXIconExclamationMarkTriangle | 警告、提示              |
| Question_Mark_Circle_LTR       | TUXIconQuestionMarkCircleLTR   | 帮助                    |
| QR_Code                        | TUXIconQRCode                  | 二维码、扫码            |
| Link                           | TUXIconLink                    | 链接、URL               |
| Number                         | TUXIconNumber                  | 井号、标签              |
| At                             | TUXIconAt                      | 提及                    |
| Sun                            | TUXIconSun                     | 浅色模式                |
| Moon                           | TUXIconMoon                    | 深色模式                |
| Pin                            | TUXIconPin                     | 固定、标记              |
| Gift                           | TUXIconGift                    | 礼物、奖品              |
| Fire                           | TUXIconFire                    | 热门、 trending         |
| Scan                           | TUXIconScan                    | 扫描                    |

## 选择指南

优先根据意图选择图标：
• 导航类：chevrons（箭头）
• 关闭或清除类：`X_Mark`
• 搜索类：`Magnifying_Glass`
• 媒体播放类：`Play`、`Pause_Fill`
• 音频状态类：`Speaker_2_LTR`、`Speaker_X_Mark_LTR`
• 电商类：`Shopping_Cart_LTR`、`Wallet`
• 可见性类：`Eye`、`Eye_Slash`
• 系统或工具类：`Info_Circle`、`Question_Mark_Circle_LTR`、`Link`、`QR_Code`
• 主题类：`Sun`、`Moon`

当有多个图标可用时，请优先选择：
1. 仓库其他地方已在使用的图标
2. 功能语义更清晰的图标
3. 视觉上更简洁的图标
