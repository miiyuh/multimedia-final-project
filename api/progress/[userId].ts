import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const userId = parseInt(req.query.userId as string);
  if (isNaN(userId)) return res.status(400).json({ message: 'Invalid user ID' });

  const progress = await storage.getUserProgress(userId);
  if (!progress) return res.status(404).json({ message: 'User progress not found' });

  res.status(200).json(progress);
}
