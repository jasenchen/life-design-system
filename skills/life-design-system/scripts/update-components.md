# update-components

用途：

- 更新 `@life-ds/components-web` 的发布产物
- 生成 `dist/` 下的 JS、类型定义和相关输出

命令：

```bash
npm run build --workspace=@life-ds/components-web
```

定义位置：

- `packages/components-web/package.json`

底层实现：

```bash
tsup
```

适用场景：

- 修改组件源码后准备验证构建结果
- 发布前检查组件库是否可以正常构建

说明：

- 当前仓库没有独立的 `sync-components` 脚本
- 组件更新的实际执行方式就是重新构建 `@life-ds/components-web`
