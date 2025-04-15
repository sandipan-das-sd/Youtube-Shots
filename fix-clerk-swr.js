// fix-clerk-swr.js
const fs = require('fs');
const path = require('path');

// Path to the problematic file
const filePath = path.resolve('./node_modules/@clerk/shared/dist/react/index.mjs');

// Read the file content
let content = fs.readFileSync(filePath, 'utf8');

// Replace the problematic imports
content = content.replace(
  `import * as swr_star from "swr";
import { default as default2 } from "swr";
import { default as default3 } from "swr/infinite";`,
  `import * as swr_star from "swr";
// SWR v2.x doesn't have default exports, so create them from the named exports
import { useSWR as default2 } from "swr";
import { useSWRInfinite as default3 } from "swr/infinite";`
);

// Write back the modified content
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed Clerk SWR imports successfully!');