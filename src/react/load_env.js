const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

console.log('Loading environment variables...');

// Load external .env
const envPath = path.resolve(__dirname, '../shared-config.env');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    if (k.startsWith('REACT_APP_')) {
        process.env[k] = envConfig[k];
        console.log(process.env[k], ' set to ', envConfig[k]);
    }
  }
}
