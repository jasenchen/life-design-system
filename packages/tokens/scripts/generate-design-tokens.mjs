import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_FILE_KEY = 'FYnPediis9frdXBEMjs4F7';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is required.');
  console.error('Usage: FIGMA_TOKEN="your_pat" node scripts/generate-design-tokens.mjs');
  process.exit(1);
}

const formatName = (name) => {
  // Replace the first directory-like prefix (e.g., "primary/") with "--"
  // Keep the rest of the string as is, only lowercasing and replacing spaces with hyphens if needed
  const parts = name.split('/');
  if (parts.length > 1) {
    // Drop the first part ("primary", "brand", etc.)
    parts.shift();
  }
  
  // Join the remaining parts, replace spaces with hyphens, and convert to lowercase
  const formatted = parts.join('-').replace(/\s+/g, '-').toLowerCase();
  
  return '--' + formatted;
};

const formatValue = (val, resolvedType, varName, variables) => {
  if (typeof val === 'object' && val !== null) {
    if (val.type === 'VARIABLE_ALIAS') {
      const aliasVar = variables[val.id];
      if (aliasVar) {
        return `var(${formatName(aliasVar.name)})`;
      }
      return '/* unknown alias */';
    }
    // Color object
    if ('r' in val && 'g' in val && 'b' in val) {
      const r = Math.round(val.r * 255);
      const g = Math.round(val.g * 255);
      const b = Math.round(val.b * 255);
      const a = val.a !== undefined ? Number(val.a.toFixed(3)) : 1;
      
      if (a === 1) {
        const hex = [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        return `#${hex.toUpperCase()}`;
      }
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
  }
  
  if (resolvedType === 'FLOAT') {
    const needsPx = /radius|size|padding|gap|width|height|spacing|margin/i.test(varName);
    if (needsPx && val !== 0) {
      return `${val}px`;
    }
    return val;
  }
  
  if (resolvedType === 'STRING') {
    return `"${val}"`;
  }
  
  return val;
};

async function fetchTokens() {
  console.log(`Fetching variables from Figma file: ${FIGMA_FILE_KEY}...`);
  
  const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Figma API Error (${response.status}):`, text);
    process.exit(1);
  }

  const data = await response.json();
  const meta = data.meta;
  
  if (!meta || !meta.variables || !meta.variableCollections) {
    console.error('No variables found in this Figma file.');
    process.exit(1);
  }

  const variables = meta.variables;
  const collections = meta.variableCollections;

  const cssBlocks = {
    ':root': [],
    ':root, [data-theme="light"]': [],
    '[data-theme="dark"]': []
  };

  for (const [colId, collection] of Object.entries(collections)) {
    const modes = collection.modes;
    
    for (const mode of modes) {
      const modeName = mode.name.toLowerCase();
      let selector = ':root';
      
      if (modes.length > 1) {
        if (modeName.includes('dark')) {
          selector = '[data-theme="dark"]';
        } else {
          selector = ':root, [data-theme="light"]';
        }
      }

      for (const [varId, figmaVar] of Object.entries(variables)) {
        // 忽略已删除但被引用的变量
        if (figmaVar.deletedButReferenced) {
          continue;
        }
        
        if (figmaVar.variableCollectionId === colId) {
          const val = figmaVar.valuesByMode[mode.modeId];
          if (val !== undefined) {
            const cssName = formatName(figmaVar.name);
            let cssValue;
            
            // 检查是否有完整属性声明的 codeSyntax（包含 ":"）
            const hasUsefulCodeSyntax = figmaVar.codeSyntax && figmaVar.codeSyntax.WEB && 
                                      typeof figmaVar.codeSyntax.WEB === 'string' && 
                                      figmaVar.codeSyntax.WEB.includes(':');
            
            if (hasUsefulCodeSyntax) {
              const webSyntax = figmaVar.codeSyntax.WEB;
              // 只提取 value 部分，移除属性名和分号
              if (webSyntax.includes(':')) {
                cssValue = webSyntax.split(':')[1].trim().replace(/;$/, '').replace(/，/g, ',');
              } else {
                cssValue = webSyntax.replace(/，/g, ',');
              }
            } 
            // 否则使用普通处理方式
            else {
              cssValue = formatValue(val, figmaVar.resolvedType, figmaVar.name, variables);
            }
            let cssRule = `  ${cssName}: ${cssValue};`;
            
            // 如果有 description，添加注释
            if (figmaVar.description && figmaVar.description.trim() !== '') {
              // 处理换行符，让注释更整洁
              const description = figmaVar.description.trim().replace(/\n/g, ' ');
              cssRule += ` /* ${description} */`;
            }
            
            cssBlocks[selector].push(cssRule);
          }
        }
      }
    }
  }

  let cssOutput = '/* 自动生成的 Figma Design Tokens */\n/* 请勿手动修改，如需更新请运行 npm run sync-tokens */\n\n';

  for (const [selector, rules] of Object.entries(cssBlocks)) {
    if (rules.length > 0) {
      cssOutput += `${selector} {\n${rules.join('\n')}\n}\n\n`;
    }
  }

  const outputPath = path.resolve(__dirname, '../life-ds-tokens.css');
  fs.writeFileSync(outputPath, cssOutput.trim() + '\n', 'utf-8');
  
  console.log(`✅ Successfully generated ${rulesCount(cssBlocks)} tokens!`);
  console.log(`📁 Saved to: ${outputPath}`);
}

function rulesCount(blocks) {
  return Object.values(blocks).reduce((acc, rules) => acc + rules.length, 0);
}

fetchTokens().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
