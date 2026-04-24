#!/usr/bin/env node

import fs from 'fs';
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

  const skillFile = path.join(CONTENT_DIR, 'SKILL.md');
  if (fs.existsSync(skillFile)) {
    const content = fs.readFileSync(skillFile, 'utf-8');
    const nameMatch = content.match(/name:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);
    
    if (nameMatch) {
      console.log(`- ${nameMatch[1].trim()}: ${descMatch ? descMatch[1].trim() : ''}`);
    }
  } else {
    console.log('No skills found in SKILL.md');
  }
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
  const skillFile = path.join(CONTENT_DIR, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    console.error('Error: SKILL.md not found.');
    return;
  }

  const content = fs.readFileSync(skillFile, 'utf-8');
  const nameMatch = content.match(/name:\s*(.*)/);
  
  if (nameMatch && nameMatch[1].trim() === name) {
    console.log(getSkillContent(content));
  } else {
    console.error(`Error: Skill "${name}" not found.`);
  }
}

function installSkill() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found in the package.');
    return;
  }

  const targetDir = path.join(process.cwd(), '.trae', 'skills', 'life-design-system');
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    // Copy all contents from CONTENT_DIR to targetDir
    fs.cpSync(CONTENT_DIR, targetDir, { recursive: true });
    console.log(`✅ 技能 "life-design-system" 已成功安装到本地！`);
    console.log(`📂 路径: ${path.relative(process.cwd(), targetDir)}`);
    console.log(`\n现在您可以在 Trae 中重新加载或打开 Skill 面板使用它了！`);
  } catch (error) {
    console.error('❌ 安装技能失败:', error);
  }
}

function showHelp() {
  console.log(`
Usage: life-ds-skills <command> [args]

Commands:
  install           Install the skill to local .trae/skills/ directory
  list              List all available skills
  get <name>        Get the core prompt for a skill
  help              Show this help message
  `);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
