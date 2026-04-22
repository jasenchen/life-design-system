#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../content');

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  switch (command) {
    case 'list':
      listSkills();
      break;
    case 'get':
      getSkill(args[1]);
      break;
    case 'trae-config':
      getTraeConfig(args[1]);
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

function getTraeConfig(name) {
  const skillFile = path.join(CONTENT_DIR, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    console.error('Error: SKILL.md not found.');
    return;
  }

  const content = fs.readFileSync(skillFile, 'utf-8');
  const nameMatch = content.match(/name:\s*(.*)/);
  const descMatch = content.match(/description:\s*(.*)/);

  if (nameMatch && nameMatch[1].trim() === name) {
    const config = {
      name: nameMatch[1].trim(),
      description: descMatch ? descMatch[1].trim() : '',
      instructions: getSkillContent(content)
    };
    console.log(JSON.stringify(config, null, 2));
  } else {
    console.error(`Error: Skill "${name}" not found.`);
  }
}

function showHelp() {
  console.log(`
Usage: life-ds-skills <command> [args]

Commands:
  list              List all available skills
  get <name>        Get the core prompt for a skill
  trae-config <name> Get Trae skill-creator config in JSON format
  help              Show this help message
  `);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
