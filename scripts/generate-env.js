const fs = require('fs');
const path = require('path');
require('dotenv').config();

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');

const envConfigFile = `export const environment = {
  production: false,
  openaiApiKey: '${process.env.OPENAI_API_KEY || ''}',
};
`;

fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`✅ Environment file generated at ${targetPath}`);
