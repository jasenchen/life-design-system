import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_FILE_KEY = 'GFYxmlAZJ0dS90jYgmvtSE'; 
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is required.');
  process.exit(1);
}

async function testVariablesApi() {
  console.log(`Testing Figma Variables API...`);
  const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  });

  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    console.log(await response.text());
    return;
  }

  const data = await response.json();
  
  const outputPath = path.resolve(__dirname, 'variables-dump.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  console.log(`✅ Wrote variables data to: ${outputPath}`);
}

testVariablesApi();