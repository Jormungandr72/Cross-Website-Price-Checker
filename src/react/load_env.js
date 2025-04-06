const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load external .env
const envPath = path.resolve(__dirname, '../shared-config.env');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}
