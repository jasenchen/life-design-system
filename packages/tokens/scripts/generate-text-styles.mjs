import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_FILE_KEY = 'GFYxmlAZJ0dS90jYgmvtSE'; // The document with the UI/components
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is required.');
  console.error('Usage: FIGMA_TOKEN="your_pat" node scripts/generate-text-styles.mjs');
  process.exit(1);
}

// Function to fetch the Figma file styles metadata
async function fetchStyles() {
  console.log(`Fetching styles metadata from Figma file: ${FIGMA_FILE_KEY}...`);
  const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/styles`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch styles: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  // Filter only TEXT styles
  const textStyles = data.meta.styles.filter(style => style.style_type === 'TEXT');
  console.log(`Found ${textStyles.length} TEXT styles.`);
  return textStyles;
}

// Function to fetch specific nodes by ID to extract the actual text style values
async function fetchNodes(nodeIds) {
  if (nodeIds.length === 0) return {};
  
  console.log(`Fetching node details for ${nodeIds.length} nodes to extract text properties...`);
  // Figma limits node IDs in URL, we chunk them if needed (usually max ~100-400 ids per request)
  // But here we might just have a few dozen.
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
  // Convert "大标题 display/medium" -> "display-medium"
  // First, extract the english part if possible (e.g. split by " " or "/")
  // We'll replace all non-alphanumeric (except slashes) with space, then grab the english looking parts
  
  // A simple strategy based on the user's example "大标题 display/medium" -> "display-medium"
  // Let's strip out Chinese characters and then format the rest
  let formatted = name.replace(/[\u4e00-\u9fa5]+/g, '').trim();
  formatted = formatted.replace(/[\/\s]+/g, '-').toLowerCase();
  
  // If formatting failed or is empty, fallback to the original string
  if (!formatted) {
    formatted = name.replace(/[\/\s]+/g, '-').toLowerCase();
  }
  
  // Clean up any leading or trailing hyphens
  formatted = formatted.replace(/^-+|-+$/g, '');
  
  // According to user request: "--display-bold"
  return '--' + formatted;
};

async function generateTextTokens() {
  try {
    const textStylesMeta = await fetchStyles();
    
    // We need the node_id from each style to get the actual text properties
    const nodeIdsToFetch = textStylesMeta.map(style => style.node_id);
    const nodesData = await fetchNodes(nodeIdsToFetch);

    let cssRules = [];

    textStylesMeta.forEach(styleMeta => {
      const nodeObj = nodesData[styleMeta.node_id];
      if (nodeObj && nodeObj.document && nodeObj.document.style) {
        const textStyle = nodeObj.document.style;
        const cssName = formatName(styleMeta.name);
        
        // Create CSS shorthand or individual properties
        // font-family: "PingFang SC"; font-size: 16px; font-weight: 500; line-height: 1.5;
        const fontFamily = textStyle.fontFamily ? `"${textStyle.fontFamily}"` : 'inherit';
        const fontSize = textStyle.fontSize ? `${Math.round(textStyle.fontSize)}px` : 'inherit';
        const fontWeight = textStyle.fontWeight || 400;
        
        // Line height can be PERCENT or PIXELS
        let lineHeight = 'normal';
        if (textStyle.lineHeightPx) {
          // If we have line height in Px, convert it to a ratio based on font size or use px
          lineHeight = `${Math.round(textStyle.lineHeightPx)}px`;
        } else if (textStyle.lineHeightPercentFontSize && textStyle.fontSize) {
          lineHeight = `${Math.round(textStyle.fontSize * (textStyle.lineHeightPercentFontSize / 100))}px`;
        } else if (textStyle.fontSize) {
          lineHeight = `${Math.round(textStyle.fontSize * 1.5)}px`; // fallback
        }

        // We can output a shorthand font property: "font-weight font-size/line-height font-family"
        // User requested: "--display-bold: 500 32px/40px var(--font-normal); /* 超大标题 */"
        const fontShorthand = `${fontWeight} ${fontSize}/${lineHeight} var(--font-normal)`;

        let cssRule = `  ${cssName}: ${fontShorthand}; /* ${styleMeta.name} */`;
        cssRules.push(cssRule);
      }
    });

    if (cssRules.length > 0) {
      const tokensPath = path.resolve(__dirname, '../life-ds-tokens.css');
      let existingCss = '';
      if (fs.existsSync(tokensPath)) {
        existingCss = fs.readFileSync(tokensPath, 'utf-8');
      }

      // Check if we already appended text styles, to avoid duplicate appends
      const textStylesMarker = '/* ====== Text Styles ====== */';
      if (existingCss.includes(textStylesMarker)) {
        existingCss = existingCss.split(textStylesMarker)[0];
      }

      let appendCss = `\n${textStylesMarker}\n:root {\n${cssRules.join('\n')}}\n`;
      fs.writeFileSync(tokensPath, existingCss.trim() + '\n' + appendCss, 'utf-8');

      console.log(`✅ Successfully extracted and appended ${textStylesMeta.length} Text Styles!`);
    } else {
      console.log('⚠️ No Text Styles found or extracted.');
    }

  } catch (error) {
    console.error('Unhandled error:', error);
    process.exit(1);
  }
}

generateTextTokens();
