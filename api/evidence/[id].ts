import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid evidence ID' });

  const evidence = await storage.getEvidenceItem(id);
  if (!evidence) return res.status(404).json({ message: 'Evidence not found' });

  res.status(200).json(evidence);
}
