export default function handler(req, res) {
  const anonKey   = process.env.anonapi    || process.env.ANONAPI    || process.env.SUPABASE_ANON_KEY || '';
  const claudeKey = process.env.claudeapi  || process.env.CLAUDEAPI  || process.env.CLAUDE_API_KEY   || '';

  let supabaseUrl = process.env.SUPABASE_URL || '';
  if (!supabaseUrl && anonKey) {
    try {
      const b64     = anonKey.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
      const payload = JSON.parse(Buffer.from(b64, 'base64').toString());
      supabaseUrl   = `https://${payload.ref}.supabase.co`;
    } catch(e) {}
  }

  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(
    `window.TALLY_CONFIG={supabaseUrl:"${supabaseUrl}",supabaseKey:"${anonKey}",claudeKey:"${claudeKey}"};`
  );
}
