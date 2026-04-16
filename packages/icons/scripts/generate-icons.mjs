import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_FILE_KEY = '8dMex1L8MZSU5zgPQkHZCz';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is required.');
  console.error('Usage: FIGMA_TOKEN="your_pat" npm run sync-icons');
  process.exit(1);
}

// 递归查找指定 id 的节点
function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// 递归提取所有的 COMPONENT 节点及其所属的 COMPONENT_SET
function extractComponents(node, parentSet = null, result = []) {
  if (node.type === 'COMPONENT_SET') {
    parentSet = node;
  }
  
  if (node.type === 'COMPONENT') {
    result.push({ component: node, parentSet });
  }

  if (node.children) {
    for (const child of node.children) {
      extractComponents(child, parentSet, result);
    }
  }
  return result;
}

// 解析图标名称及变体后缀
function resolveIconName(component, parentSet) {
  // 1. 尝试从 Component 或 ComponentSet 的 description 中提取 iconpark name
  const desc = component.description || (parentSet && parentSet.description) || '';
  const match = desc.match(/iconpark name\s*[:：]\s*([\w-]+)/i);
  
  let baseName = '';
  if (match) {
    baseName = match[1].trim();
  } else {
    // 2. 如果没有，则使用父级名称或自身名称
    baseName = parentSet ? parentSet.name : component.name;
    baseName = baseName.trim();
  }
  
  // 3. 处理变体后缀
  // Figma 中变体通常表示为 "属性名=属性值, 属性名2=属性值2" (例如: "类型=line" 或 "Type=fill")
  let suffix = '';
  if (component.name.includes('=')) {
    const parts = component.name.split(',').map(s => s.trim().split('='));
    // 查找表示类型或线面属性的变体键（可能叫“类型”、“Type”、“Style”等，我们兼容多种可能）
    const typePart = parts.find(p => /^(类型|type|style)$/i.test(p[0].trim()));
    if (typePart && typePart[1]) {
      const t = typePart[1].trim().toLowerCase();
      // 如果提取出的名称还没包含这个变体后缀，则加上
      if (!baseName.endsWith(`-${t}`)) {
        suffix = `-${t}`;
      }
    } else if (parts.length === 1 && parts[0].length === 2) {
      // 如果只有一个变体且没有被正则匹配，直接尝试加上该值
      const t = parts[0][1].trim().toLowerCase();
      if (t === 'line' || t === 'fill') {
        if (!baseName.endsWith(`-${t}`)) {
          suffix = `-${t}`;
        }
      }
    }
  }
  
  return `${baseName}${suffix}`;
}

async function fetchFigma(url) {
  const res = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API Error (${res.status}): ${text}`);
  }
  return res.json();
}

async function downloadSvg(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download SVG: ${res.statusText}`);
  return res.text();
}

async function main() {
  console.log(`Fetching Figma file tree for ${FIGMA_FILE_KEY}...`);
  // 为了确保能遍历到所有嵌套层级的组件，获取到 6 层深度应该足够覆盖常规的 frame 嵌套
  const fileData = await fetchFigma(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}?depth=6`);
  
  const targetCanvasId = '1086:5175';
  const canvasNode = findNodeById(fileData.document, targetCanvasId);
  
  if (!canvasNode) {
    console.error(`Error: Canvas with ID ${targetCanvasId} not found in the file!`);
    process.exit(1);
  }
  
  console.log(`Found canvas "${canvasNode.name}", extracting components...`);
  
  const components = extractComponents(canvasNode);
  console.log(`Found ${components.length} components/variants in the canvas.`);
  
  const iconList = [];
  const ids = [];
  
  for (const { component, parentSet } of components) {
    const iconName = resolveIconName(component, parentSet);
    iconList.push({ id: component.id, name: iconName });
    ids.push(component.id);
  }
  
  if (ids.length === 0) {
    console.log('No components found to download.');
    return;
  }
  
  console.log(`Requesting SVG URLs for ${ids.length} icons...`);
  // Figma image API 一次请求的 id 数量有限制，按 100 分块请求比较安全
  const CHUNK_SIZE = 100;
  const idToUrl = {};
  
  for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
    const chunk = ids.slice(i, i + CHUNK_SIZE).join(',');
    const imagesData = await fetchFigma(`https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${chunk}&format=svg`);
    if (imagesData.images) {
      Object.assign(idToUrl, imagesData.images);
    }
  }
  
  console.log('Downloading SVGs and generating sprite...');
  
  let symbols = '';
  let previewHtmlItems = '';
  
  for (const icon of iconList) {
    const url = idToUrl[icon.id];
    if (!url) {
      console.warn(`Warning: No URL returned for ${icon.name} (${icon.id})`);
      continue;
    }
    
    try {
      let svgContent = await downloadSvg(url);
      
      // 提取 <svg> 标签上的 viewBox 属性
      const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
      
      // 去除首尾的 <svg> 标签包裹
      let innerContent = svgContent.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').trim();
      
      // 替换硬编码颜色为 currentColor（保留 fill="none" 不动）
      innerContent = innerContent.replace(/fill="([^"]+)"/g, (match, p1) => {
        if (p1.toLowerCase() === 'none') return match;
        return 'fill="currentColor"';
      });
      innerContent = innerContent.replace(/stroke="([^"]+)"/g, (match, p1) => {
        if (p1.toLowerCase() === 'none') return match;
        return 'stroke="currentColor"';
      });
      
      symbols += `  <symbol id="${icon.name}" viewBox="${viewBox}">\n    ${innerContent}\n  </symbol>\n`;
      
      previewHtmlItems += `
      <div class="icon-item" onclick="copyName('${icon.name}')">
        <svg class="icon"><use href="#${icon.name}"></use></svg>
        <span class="icon-name">${icon.name}</span>
      </div>`;
      
    } catch (e) {
      console.error(`Failed to process ${icon.name}: ${e.message}`);
    }
  }
  
  const spriteSvg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n${symbols}</svg>`;
  
  const pkgDir = path.resolve(__dirname, '../packages/icons');
  const assetsDir = path.join(pkgDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  const spritePath = path.join(assetsDir, 'sprite.svg');
  fs.writeFileSync(spritePath, spriteSvg);
  
  const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Icon Library Preview</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: #f5f5f5; color: #333; }
  h1 { text-align: center; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px; }
  .icon-item { 
    background: white; border-radius: 8px; padding: 20px; text-align: center; 
    cursor: pointer; transition: all 0.2s; border: 1px solid #eee;
  }
  .icon-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-color: #007aff; color: #007aff; }
  .icon { width: 32px; height: 32px; fill: currentColor; margin-bottom: 10px; }
  .icon-name { display: block; font-size: 12px; word-break: break-all; }
  .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #333; color: white; padding: 10px 20px; border-radius: 4px; display: none; }
</style>
</head>
<body>
  <h1>Life Design System - Icons</h1>
  <p style="text-align: center; color: #666; margin-bottom: 30px;">点击图标复制名称 / Click to copy name</p>
  
  <!-- Sprite 容器 (直接内联以支持本地 file:// 双击打开) -->
  <div id="sprite-container" style="display: none;">
    ${spriteSvg}
  </div>
  
  <div class="grid">
    ${previewHtmlItems}
  </div>

  <div id="toast" class="toast">Copied!</div>

  <script>
    function copyName(name) {
      navigator.clipboard.writeText(name).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = 'Copied: ' + name;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 2000);
      });
    }
  </script>
</body>
</html>`;
  
  const previewPath = path.join(pkgDir, 'icons-preview.html');
  fs.writeFileSync(previewPath, previewHtml);
  
  // 生成一键注入的 index.js
  const indexJsContent = `
const spriteSvg = \`${spriteSvg}\`;

function injectIcons() {
  if (typeof document === 'undefined') return;
  
  const inject = () => {
    if (document.getElementById('life-design-system-icons-sprite')) return;
    const div = document.createElement('div');
    div.id = 'life-design-system-icons-sprite';
    div.style.display = 'none';
    div.innerHTML = spriteSvg;
    document.body.insertBefore(div, document.body.firstChild);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
}

injectIcons();
`;
  fs.writeFileSync(path.join(pkgDir, 'index.js'), indexJsContent.trim() + '\n');
  
  // 生成独立的 package.json
  const packageJsonContent = {
    "name": "life-design-system-icons",
    "version": "1.0.0",
    "description": "Life Design System Icons with auto-inject",
    "main": "index.js",
    "files": [
      "index.js",
      "assets/sprite.svg"
    ],
    "publishConfig": {
      "access": "public"
    }
  };
  fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify(packageJsonContent, null, 2) + '\n');
  
  console.log(`\n✅ Successfully generated life-design-system-icons package with ${iconList.length} icons!`);
  console.log(`📁 Package path: ${pkgDir}`);
  console.log(`👁️ Preview: file://${previewPath}`);
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
