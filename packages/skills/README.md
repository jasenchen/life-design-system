# @life-ds/skills

Life Design System 的 AI 技能定义与 Agent 指令集。该包将设计规范、工作流和组件准则打包为标准化的 Prompt，支持在 Trae、Coze 等多种 Agent 平台中快速接入。

## 🚀 引入与使用

### 1. 一键安装 Trae 本地技能

为了避免 Trae 配置体积过大以及丢失上下文，本项目采用了**本地技能机制**。只需执行以下命令：

```bash
npx @life-ds/skills install
```

**命令效果**：
该命令会自动将所有组件的详细参考规范和核心工作流文件 (`SKILL.md`) 复制到当前项目工作区的 `.trae/skills/life-design-system/` 目录下。

### 2. 在 Trae 中使用

执行完上述命令后，重启或刷新 Trae。你将在右侧面板看到名为 `life-design-system` 的本地技能。直接选中它开始对话即可！

*Agent 已经内置了系统指令，它会自动使用文件读取能力去查看本地 `.trae/skills/` 目录下的组件规范文档。*

---

## 常用 CLI 命令

除了 `install` 外，我们还提供以下命令供调试或查阅：

```bash
# 安装技能到本地 .trae 目录
npx @life-ds/skills install

# 列出所有可用的 Skills
npx @life-ds/skills list

# 打印某个 Skill 的核心 Prompt 内容
npx @life-ds/skills get life-design-system
```

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
