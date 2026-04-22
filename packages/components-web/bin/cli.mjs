#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();

console.log('🚀 初始化 Life Design System...');

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath) {
  if (!(await fileExists(dirPath))) {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

function resolvePackagePath(packageName, relativePath) {
  try {
    const packageJsonPath = require.resolve(`${packageName}/package.json`, { paths: [cwd, __dirname] });
    const packageDir = path.dirname(packageJsonPath);
    return path.join(packageDir, relativePath);
  } catch (error) {
    return null;
  }
}

async function installMissingDependencies() {
  const tokensPath = resolvePackagePath('@life-ds/tokens', 'life-ds-tokens.css');
  const iconsPath = resolvePackagePath('@life-ds/icons', 'assets/sprite.svg');

  if (!tokensPath || !iconsPath) {
    console.log('📦 正在补全缺失的 @life-ds/tokens 或 @life-ds/icons 依赖...');
    try {
      execSync('npm install @life-ds/tokens @life-ds/icons --no-save', { stdio: 'inherit', cwd });
    } catch (error) {
      console.warn('⚠️ 自动安装依赖失败，将尝试直接使用当前包内的相对路径...');
    }
  }
}

async function main() {
  await installMissingDependencies();

  // 首先尝试通过 require.resolve 查找，如果找不到，尝试相对路径 (用于本地调试或被直接复制时)
  let tokensSrc = resolvePackagePath('@life-ds/tokens', 'life-ds-tokens.css');
  let iconsSrc = resolvePackagePath('@life-ds/icons', 'assets/sprite.svg');
  
  if (!tokensSrc) {
    tokensSrc = path.join(__dirname, '../../tokens/life-ds-tokens.css');
  }
  if (!iconsSrc) {
    iconsSrc = path.join(__dirname, '../../icons/assets/sprite.svg');
  }

  const baseSrc = resolvePackagePath('@life-ds/components-web', 'styles/base.css') || path.join(__dirname, '../styles/base.css');
  const componentsSrc = resolvePackagePath('@life-ds/components-web', 'styles/components.css') || path.join(__dirname, '../styles/components.css');

  if (!(await fileExists(tokensSrc)) || !(await fileExists(iconsSrc)) || !(await fileExists(baseSrc)) || !(await fileExists(componentsSrc))) {
    console.error('❌ 无法找到所需的设计资产文件，请确保 npm 依赖已正确安装。');
    process.exit(1);
  }

  // 决定输出目录
  const isSrcExists = await fileExists(path.join(cwd, 'src'));
  const isPublicExists = await fileExists(path.join(cwd, 'public'));

  const stylesDestDir = path.join(cwd, isSrcExists ? 'src/styles' : 'styles');
  const assetsDestDir = path.join(cwd, isPublicExists ? 'public/assets' : 'assets');

  await ensureDir(stylesDestDir);
  await ensureDir(assetsDestDir);

  // 拷贝文件
  console.log('📂 正在提取设计系统资产到本地...');
  
  await fs.copyFile(tokensSrc, path.join(stylesDestDir, 'life-ds-tokens.css'));
  console.log(`   ✅ 提取: ${path.relative(cwd, path.join(stylesDestDir, 'life-ds-tokens.css'))}`);

  await fs.copyFile(baseSrc, path.join(stylesDestDir, 'base.css'));
  console.log(`   ✅ 提取: ${path.relative(cwd, path.join(stylesDestDir, 'base.css'))}`);

  await fs.copyFile(componentsSrc, path.join(stylesDestDir, 'components.css'));
  console.log(`   ✅ 提取: ${path.relative(cwd, path.join(stylesDestDir, 'components.css'))}`);

  await fs.copyFile(iconsSrc, path.join(assetsDestDir, 'sprite.svg'));
  console.log(`   ✅ 提取: ${path.relative(cwd, path.join(assetsDestDir, 'sprite.svg'))}`);

  console.log('\n🎉 Life Design System 初始化完成！');
  console.log('\n接下来，请在您的 HTML 或入口文件中引入 these 文件：');
  console.log(`
  <link rel="stylesheet" href="./${path.relative(cwd, path.join(stylesDestDir, 'life-ds-tokens.css'))}">
  <link rel="stylesheet" href="./${path.relative(cwd, path.join(stylesDestDir, 'base.css'))}">
  <link rel="stylesheet" href="./${path.relative(cwd, path.join(stylesDestDir, 'components.css'))}">
  `);
}

main().catch(error => {
  console.error('❌ 初始化过程中发生错误:', error);
  process.exit(1);
});