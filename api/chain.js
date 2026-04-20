// Polygon.io — options chain snapshot
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { ticker, expiry, type = 'call' } = req.query;
  if (!ticker) return res.status(400).json({ error: 'ticker required' });
  try {
    const params = new URLSearchParams({
      contract_type: type,
      limit: '25',
      apiKey: process.env.POLYGON_KEY
    });
    if (expiry) params.set('expiration_date', expiry);
    const url = `https://api.polygon.io/v3/snapshot/options/${ticker.toUpperCase()}?${params}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
