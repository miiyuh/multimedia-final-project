import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid suspect ID' });

  const suspect = await storage.getSuspect(id);
  if (!suspect) return res.status(404).json({ message: 'Suspect not found' });

  res.status(200).json(suspect);
}
