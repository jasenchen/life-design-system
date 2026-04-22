# @life-ds/skills

Life Design System 的 AI 技能定义与 Agent 指令集。该包将设计规范、工作流和组件准则打包为标准化的 Prompt，支持在 Trae、Coze 等多种 Agent 平台中快速接入。

## 🚀 引入与使用

### 1. 作为 CLI 工具使用
您可以使用内置的 CLI 工具来查看和获取技能指令：

```bash
# 列出所有可用技能
npx @life-ds/skills list

# 获取特定技能的核心 Prompt (用于配置 Agent)
npx @life-ds/skills get life-design-system

# 获取 Trae Skill-Creator 专用的 JSON 配置
npx @life-ds/skills trae-config life-design-system
```

### 2. 在 Trae 中注册
1. 在 Trae 中启动 `skill-creator`。
2. 运行 `npx @life-ds/skills trae-config life-design-system`。
3. 将输出的 JSON 内容填入 Trae 的配置界面。

---

## 🛠️ 开发与更新流程

为了确保开发体验与分发解耦，本项目采用“根目录开发，包目录分发”的模式。

### 1. 修改技能
所有的技能源码均位于根目录的 `skills/` 文件夹下：
- `skills/SKILL.md`: 核心指令定义。
- `skills/references/`: 详细的参考文档。

### 2. 同步内容
在根目录修改完文档后，运行同步脚本将内容推送到分发包：
```bash
npm run sync-skills
```
该命令会自动将 `skills/` 下的内容同步到 `packages/skills/content/`。

---

## 📦 发布指南

发布前请确保您已登录 NPM 且拥有 `@life-ds` 作用域的权限。

### 1. 更新版本号
进入包目录修改版本号：
```bash
cd packages/skills
# 根据修改幅度更新版本 (patch, minor, major)
npm version patch
```

### 2. 执行发布
在根目录执行（推荐）：
```bash
npm publish --workspace=@life-ds/skills --access public
```
或者在 `packages/skills` 目录下直接执行：
```bash
npm publish --access public
```

---

## 📂 目录结构
- `bin/`: CLI 工具源码。
- `content/`: 同步后的技能文档内容（发布产物）。
- `index.js`: 包入口。
