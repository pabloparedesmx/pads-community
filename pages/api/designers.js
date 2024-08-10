import { createXanoClient } from '../../utils/xano';

const xano = createXanoClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const designers = await xano.get('/designers');
      res.status(200).json(designers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch designers' });
    }
  } else if (req.method === 'POST') {
    try {
      const designer = await xano.post('/designers', req.body);
      res.status(201).json(designer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create designer' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
