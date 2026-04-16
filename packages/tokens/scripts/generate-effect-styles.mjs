import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_FILE_KEY = 'GFYxmlAZJ0dS90jYgmvtSE'; 
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is required.');
  console.error('Usage: FIGMA_TOKEN="your_pat" node scripts/generate-effect-styles.mjs');
  process.exit(1);
}

async function fetchStyles() {
  console.log(`Fetching styles metadata from Figma file: ${FIGMA_FILE_KEY}...`);
  const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/styles`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch styles: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const effectStyles = data.meta.styles.filter(style => style.style_type === 'EFFECT');
  console.log(`Found ${effectStyles.length} EFFECT styles.`);
  return effectStyles;
}

async function fetchNodes(nodeIds) {
  if (nodeIds.length === 0) return {};
  
  console.log(`Fetching node details for ${nodeIds.length} nodes to extract effect properties...`);
  const CHUNK_SIZE = 100;
  let resultNodes = {};

  for (let i = 0; i < nodeIds.length; i += CHUNK_SIZE) {
    const chunk = nodeIds.slice(i, i + CHUNK_SIZE);
    const idsQuery = chunk.join(',');
    const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${idsQuery}`, {
      headers: { 'X-Figma-Token': FIGMA_TOKEN }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch nodes: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    resultNodes = { ...resultNodes, ...data.nodes };
  }

  return resultNodes;
}

const formatName = (name) => {
  // e.g. "Shadow/shadow-normal" -> "--shadow-normal"
  const parts = name.split('/');
  if (parts.length > 1) {
    parts.shift();
  }
  const formatted = parts.join('-').replace(/\s+/g, '-').toLowerCase();
  return '--' + formatted;
};

const rgbaToCSS = (color) => {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? Number(color.a.toFixed(3)) : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

async function generateEffectTokens() {
  try {
    const effectStylesMeta = await fetchStyles();
    
    const nodeIdsToFetch = effectStylesMeta.map(style => style.node_id);
    const nodesData = await fetchNodes(nodeIdsToFetch);

    let cssRules = [];

    effectStylesMeta.forEach(styleMeta => {
      const nodeObj = nodesData[styleMeta.node_id];
      if (nodeObj && nodeObj.document && nodeObj.document.effects) {
        const effects = nodeObj.document.effects;
        const cssName = formatName(styleMeta.name);
        
        // Effects array can contain multiple shadows, e.g. [ {DROP_SHADOW}, {DROP_SHADOW} ]
        // We join them with commas for the CSS box-shadow property.
        const shadowStrings = [];

        effects.forEach(effect => {
          if (effect.visible && (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW')) {
            const isInner = effect.type === 'INNER_SHADOW' ? 'inset ' : '';
            const x = effect.offset.x ? `${effect.offset.x}px` : '0';
            const y = effect.offset.y ? `${effect.offset.y}px` : '0';
            const blur = effect.radius ? `${effect.radius}px` : '0';
            const spread = effect.spread ? `${effect.spread}px` : '0';
            const color = rgbaToCSS(effect.color);
            
            let shadowStr = `${isInner}${x} ${y} ${blur}`;
            if (effect.spread !== undefined && effect.spread !== 0) {
                shadowStr += ` ${spread}`;
            }
            shadowStr += ` ${color}`;
            
            shadowStrings.push(shadowStr.trim());
          }
        });

        if (shadowStrings.length > 0) {
          cssRules.push(`  ${cssName}: ${shadowStrings.join(', ')}; /* ${styleMeta.name} */`);
        }
      }
    });

    if (cssRules.length > 0) {
      const outputPath = path.resolve(__dirname, '../life-design-system-tokens.css');
      let existingCss = '';
      if (fs.existsSync(outputPath)) {
        existingCss = fs.readFileSync(outputPath, 'utf-8');
      }

      const effectStylesMarker = '/* ====== Effect/Shadow Styles ====== */';
      if (existingCss.includes(effectStylesMarker)) {
        existingCss = existingCss.split(effectStylesMarker)[0];
      }

      let appendCss = `\n${effectStylesMarker}\n:root {\n${cssRules.join('\n')}\n}\n`;
      fs.writeFileSync(outputPath, existingCss.trim() + '\n' + appendCss, 'utf-8');

      console.log(`✅ Successfully extracted and appended ${cssRules.length} Effect Styles!`);
    } else {
      console.log('⚠️ No Effect Styles found or extracted.');
    }

  } catch (error) {
    console.error('Unhandled error:', error);
    process.exit(1);
  }
}

generateEffectTokens();