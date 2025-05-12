import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';
import { insertUserSchema } from './schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const parsed = insertUserSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid user data', errors: parsed.error });

  const existing = await storage.getUserByUsername(parsed.data.username);
  if (existing) return res.status(409).json({ message: 'Username already exists' });

  const user = await storage.createUser(parsed.data);
  await storage.createUserProgress({
    userId: user.id,
    currentStep: 'intro',
    unlockedEvidence: [1, 2, 3, 4, 5, 6],
    decisions: {},
    timeRemaining: 172800
  });

  res.status(201).json({ id: user.id, username: user.username });
}
