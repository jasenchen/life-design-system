#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../content');

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'install':
      installSkill();
      break;
    case 'install-claude':
      installClaudeSkill(args[0]);
      break;
    case 'list':
      listSkills();
      break;
    case 'get':
      if (!args[0]) {
        console.error('Error: Skill name required.');
        showHelp();
        process.exit(1);
      }
      getSkill(args[0]);
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

function listSkills() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found.');
    return;
  }

  const skills = getPackagedSkills();
  if (skills.length === 0) {
    console.log('No skills found in content/');
    return;
  }

  skills.forEach(({ skillFile }) => {
    const content = fs.readFileSync(skillFile, 'utf-8');
    const nameMatch = content.match(/name:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);

    if (nameMatch) {
      console.log(`- ${nameMatch[1].trim()}: ${descMatch ? descMatch[1].trim() : ''}`);
    }
  });
}

function getSkillContent(content) {
  const lines = content.split('\n');
  let startIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('name:') || line.startsWith('description:') || line === '***' || /^[-*]{3,}$/.test(line)) {
      startIdx = i + 1;
    } else if (line !== '') {
      break;
    }
  }
  return lines.slice(startIdx).join('\n').trim();
}

function getSkill(name) {
  const skills = getPackagedSkills();
  if (skills.length === 0) {
    console.error('Error: No packaged skills found.');
    return;
  }

  for (const { skillDirName, skillFile } of skills) {
    const content = fs.readFileSync(skillFile, 'utf-8');
    const nameMatch = content.match(/name:\s*(.*)/);
    const resolvedName = nameMatch ? nameMatch[1].trim() : skillDirName;

    if (resolvedName === name || skillDirName === name) {
      console.log(getSkillContent(content));
      return;
    }
  }

  console.error(`Error: Skill "${name}" not found.`);
}

function installSkill() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found in the package.');
    return;
  }

  const targetRootDir = path.join(process.cwd(), '.trae', 'skills');
  try {
    installSkillsTo(targetRootDir);
    console.log('✅ Skills 已成功安装到本地 Trae！');
    console.log(`📂 路径: ${path.relative(process.cwd(), targetRootDir)}`);
    console.log(`\n现在您可以在 Trae 中重新加载或打开 Skill 面板使用它了！`);
  } catch (error) {
    console.error('❌ 安装技能失败:', error);
  }
}

function installClaudeSkill(scope = 'project') {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found in the package.');
    return;
  }

  const normalizedScope = scope === 'user' || scope === '--user' || scope === '--global'
    ? 'user'
    : scope === 'project' || scope === undefined
      ? 'project'
      : null;

  if (!normalizedScope) {
    console.error('Error: Invalid scope. Use "project" or "user".');
    showHelp();
    process.exit(1);
  }

  const targetRootDir = normalizedScope === 'user'
    ? path.join(os.homedir(), '.claude', 'skills')
    : path.join(process.cwd(), '.claude', 'skills');

  try {
    installSkillsTo(targetRootDir);
    console.log('✅ Skills 已成功安装到 Claude Code！');
    console.log(`📂 路径: ${targetRootDir}`);
    if (normalizedScope === 'project') {
      console.log('\n当前为项目级安装，仅对当前项目生效。');
    } else {
      console.log('\n当前为个人级安装，对当前用户的所有 Claude Code 项目生效。');
    }
    console.log('现在您可以在 Claude Code 中自动使用它，或通过 /life-design-system 手动调用。');
  } catch (error) {
    console.error('❌ 安装 Claude Code 技能失败:', error);
  }
}

function getPackagedSkills() {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillDir = path.join(CONTENT_DIR, entry.name);
      const skillFile = path.join(skillDir, 'SKILL.md');
      return {
        skillDirName: entry.name,
        skillDir,
        skillFile,
      };
    })
    .filter(({ skillFile }) => fs.existsSync(skillFile));
}

function installSkillsTo(targetRootDir) {
  const skills = getPackagedSkills();
  if (skills.length === 0) {
    throw new Error('No packaged skills found in content/.');
  }

  fs.mkdirSync(targetRootDir, { recursive: true });

  skills.forEach(({ skillDirName, skillDir }) => {
    const targetDir = path.join(targetRootDir, skillDirName);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.cpSync(skillDir, targetDir, { recursive: true });
  });
}

function showHelp() {
  console.log(`
Usage: life-ds-skills <command> [args]

Commands:
  install           Install the skill to local .trae/skills/ directory
  install-claude    Install the skill to Claude Code (.claude/skills/). Optional scope: project | user
  list              List all available skills
  get <name>        Get the core prompt for a skill
  help              Show this help message
  `);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
