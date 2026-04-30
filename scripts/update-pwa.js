const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../public/sw.js');
const buildId = Date.now().toString();

try {
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  // Replace CACHE_NAME version
  // It looks for const CACHE_NAME = 'kollabary-v...';
  const newContent = swContent.replace(
    /const CACHE_NAME = 'kollabary-v\d+';/,
    `const CACHE_NAME = 'kollabary-v${buildId}';`
  );

  if (swContent !== newContent) {
    fs.writeFileSync(swPath, newContent);
    console.log(`Service Worker updated with version: ${buildId}`);
  } else {
    // If the regex didn't match, maybe it's already using a placeholder or different format
    // Try a more generic replacement if the specific one fails
    const genericContent = swContent.replace(
      /const CACHE_NAME = '(.+?)';/,
      `const CACHE_NAME = 'kollabary-v${buildId}';`
    );
    if (swContent !== genericContent) {
      fs.writeFileSync(swPath, genericContent);
      console.log(`Service Worker updated with version: ${buildId} (generic match)`);
    } else {
      console.error('Could not find CACHE_NAME in sw.js');
    }
  }
} catch (error) {
  console.error('Error updating Service Worker version:', error);
  process.exit(1);
}
