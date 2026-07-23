# update-skills

用途：

- 将根目录 `skills/` 下的内容同步到 `packages/skills/content/`
- 在调整 skill 结构、修改文档内容、修正文档引用后刷新分发产物

命令：

```bash
npm run sync-skills
```

定义位置：

- 根脚本：`package.json`

实际执行内容：

```bash
rm -rf packages/skills/content
mkdir -p packages/skills/content
cp -R skills/. packages/skills/content/
```

注意事项：

- 这是文档产物同步，不会自动修正文档内部链接
- 修改 `skills/life-design-system-pc/`、`skills/life-design-system-mobile/` 或 `skills/_shared/` 后，发布前应至少执行一次
