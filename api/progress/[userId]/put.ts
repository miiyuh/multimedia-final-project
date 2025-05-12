import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../storage';
import { insertUserProgressSchema } from '../../schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = parseInt(req.query.userId as string);
  if (isNaN(userId)) return res.status(400).json({ message: 'Invalid user ID' });

  const parsed = insertUserProgressSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid progress data', errors: parsed.error });

  const updated = await storage.updateUserProgress(userId, parsed.data);
  if (!updated) return res.status(404).json({ message: 'User progress not found' });

  res.status(200).json(updated);
}
