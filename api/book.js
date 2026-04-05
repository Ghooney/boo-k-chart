export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { query, isbn } = req.query;
  const searchQuery = isbn || query;
  if (!searchQuery) return res.status(400).json({ error: 'query required' });

  try {
    const url = `https://openapi.naver.com/v1/search/book.json?query=${encodeURIComponent(searchQuery)}&display=1`;
    const response = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': 'uLaCm42l2_xHCYpYuzpI',
        'X-Naver-Client-Secret': 'cp0w4KIOQL',
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
