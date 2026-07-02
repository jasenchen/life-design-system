# @life-ds/skills

Life Design System 的 AI 技能定义与 Agent 指令集。该包将设计规范、工作流和组件准则打包为标准化的 Prompt，支持在 Trae、Coze 等多种 Agent 平台中快速接入。

## 🚀 引入与使用

### 1. 一键安装 Trae 本地技能

为了避免 Trae 配置体积过大以及丢失上下文，本项目采用了**本地技能机制**。只需执行以下命令：

```bash
npx @life-ds/skills install
```

**命令效果**：
该命令会自动将 `content/` 中的每个技能目录分别安装到当前项目工作区的 `.trae/skills/` 下，例如：

- `.trae/skills/life-design-system/`
- `.trae/skills/prd-design-summarizer/`

### 2. 在 Trae 中使用

执行完上述命令后，重启或刷新 Trae。你将在右侧面板看到名为 `life-design-system` 的本地技能。直接选中它开始对话即可！

*Agent 已经内置了系统指令，它会自动使用文件读取能力去查看本地 `.trae/skills/` 目录下的组件规范文档。*

### 3. 安装到 Claude Code

Claude Code 支持从 `.claude/skills/` 或 `~/.claude/skills/` 目录自动发现技能。现在可以直接使用 `install-claude` 命令完成安装。

#### 项目级安装（仅当前项目可用）

在项目根目录执行：

```bash
npx @life-ds/skills install-claude
```

安装完成后，Claude Code 会在当前项目中自动发现 `life-design-system`。你可以直接让 Claude 在相关 UI 场景下自动使用它，或者手动通过 `/life-design-system` 调用。

#### 个人级安装（所有项目可用）

如果你希望在本机所有项目中复用这个技能，可以执行：

```bash
npx @life-ds/skills install-claude user
```

这样安装后，`life-design-system` 会对当前用户的所有 Claude Code 项目生效。

#### 说明

- Claude Code 的技能目录入口文件是 `SKILL.md`，我们同时复制了 `design/` 设计规范与 `components/` 组件文档，便于技能按需读取详细规范。
- 如果是在已打开的 Claude Code 会话中首次新建 `.claude/skills/` 目录，通常需要重启一次会话以确保新目录被监听；如果目录已存在，后续修改会自动生效。
- `CLAUDE.md` 适合放项目级长期约束，`.claude/skills/` 适合放可按需调用的设计系统技能；两者可以同时使用。

---

## 常用 CLI 命令

除了 `install` 外，我们还提供以下命令供调试或查阅：

```bash
# 安装技能到本地 .trae 目录
npx @life-ds/skills install

# 安装技能到当前项目的 Claude Code
npx @life-ds/skills install-claude

# 安装技能到当前用户的 Claude Code
npx @life-ds/skills install-claude user

# 列出所有可用的 Skills
npx @life-ds/skills list

# 打印某个 Skill 的核心 Prompt 内容
npx @life-ds/skills get life-design-system
```

---

## 🛠️ 开发与更新流程

为了确保开发体验与分发解耦，本项目采用“根目录开发，包目录分发”的模式。

### 1. 修改技能
所有的技能源码均位于根目录的 `skills/` 文件夹下，例如 `skills/life-design-system/`：
- `skills/<skill-name>/SKILL.md`: 核心指令定义。
- `skills/<skill-name>/design/`: 设计规范文档。
- `skills/<skill-name>/components/`: 组件文档。

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
推荐直接在根目录执行，不生成 git tag：
```bash
# 根据修改幅度更新版本 (patch, minor, major)
npm version minor --workspace=@life-ds/skills --no-git-tag-version
```

### 2. 执行发布
发布前请先同步最新 skill 内容，然后在根目录执行（推荐）：
```bash
npm run sync-skills
npm publish --workspace=@life-ds/skills --access public
```
或者在 `packages/skills` 目录下直接执行：
```bash
npm run sync-skills
cd packages/skills
npm publish --access public
```

---

## 📂 目录结构
- `bin/`: CLI 工具源码。
- `content/`: 按技能目录组织的发布产物，每个子目录包含自己的 `SKILL.md` 与支撑文档。
- `index.js`: 包入口。
