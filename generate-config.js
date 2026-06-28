const fs = require('fs');
const path = require('path');

// Accept several common env var naming conventions
const supabaseUrl  = process.env.SUPABASE_URL      || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey  = process.env.SUPABASE_ANON_KEY  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.ANONAPI || '';
const claudeKey    = process.env.CLAUDE_API_KEY     || process.env.CLAUDEAPI || '';

const cfg = JSON.stringify({ supabaseUrl, supabaseKey, claudeKey });

let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

html = html.replace(
  '<script src="config.js" onerror="window.TALLY_CONFIG={}"></script>',
  `<script>window.TALLY_CONFIG=${cfg};</script>`
);

fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);
console.log('Built public/index.html');
console.log('  supabaseUrl:  ', supabaseUrl  ? '✓ set' : '✗ MISSING');
console.log('  supabaseKey:  ', supabaseKey  ? '✓ set' : '✗ MISSING');
console.log('  claudeKey:    ', claudeKey    ? '✓ set' : '✗ MISSING');
