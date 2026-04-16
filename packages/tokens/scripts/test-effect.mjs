import fs from 'fs';
import fetch from 'node-fetch';

const FIGMA_FILE_KEY = 'GFYxmlAZJ0dS90jYgmvtSE'; 
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

async function checkEffectStyles() {
  console.log(`Fetching styles metadata...`);
  const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/styles`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
  });

  const data = await response.json();
  const effectStyles = data.meta.styles.filter(style => style.style_type === 'EFFECT');
  
  console.log(`Found ${effectStyles.length} EFFECT styles.`);
  
  if (effectStyles.length > 0) {
    const sampleIds = effectStyles.slice(0, 2).map(s => s.node_id).join(',');
    const nodeRes = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${sampleIds}`, {
        headers: { 'X-Figma-Token': FIGMA_TOKEN }
    });
    const nodeData = await nodeRes.json();
    console.log("Sample nodes:", JSON.stringify(nodeData.nodes, null, 2));
  }
}

checkEffectStyles();