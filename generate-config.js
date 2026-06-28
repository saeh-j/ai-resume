const fs = require('fs');
const path = require('path');

const cfg = JSON.stringify({
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
  claudeKey:   process.env.CLAUDE_API_KEY   || '',
});

let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Swap the local config.js script tag for an inline config block
html = html.replace(
  '<script src="config.js" onerror="window.TALLY_CONFIG={}"></script>',
  `<script>window.TALLY_CONFIG=${cfg};</script>`
);

fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);
console.log('Built public/index.html');
