// Supabase — fetch saved analysis history
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    const { ticker } = req.query;
    let query = supabase.from('analyses').select('*').order('created_at', { ascending: false }).limit(50);
    if (ticker) query = query.eq('ticker', ticker.toUpperCase());
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    res.json({ data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
