// Alpha Vantage — news + sentiment
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { ticker } = req.query;
  if (!ticker) return res.status(400).json({ error: 'ticker required' });
  try {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker.toUpperCase()}&limit=10&apikey=${process.env.ALPHA_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
