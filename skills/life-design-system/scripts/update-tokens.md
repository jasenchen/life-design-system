# update-tokens

用途：

- 更新设计 token CSS
- 更新文本样式
- 更新阴影与效果样式

命令：

```bash
npm run sync-tokens
```

等价 workspace 命令：

```bash
npm run sync-tokens --workspace=@life-ds/tokens
```

定义位置：

- 根脚本：`package.json`
- workspace 脚本：`packages/tokens/package.json`

执行内容：

```bash
node scripts/generate-design-tokens.mjs
node scripts/generate-text-styles.mjs
node scripts/generate-effect-styles.mjs
```

底层脚本位置：

- `packages/tokens/scripts/generate-design-tokens.mjs`
- `packages/tokens/scripts/generate-text-styles.mjs`
- `packages/tokens/scripts/generate-effect-styles.mjs`

注意事项：

- 这些脚本同样依赖 `FIGMA_TOKEN`
- 修改 tokens 后，通常还需要联动检查组件样式产物是否符合预期
