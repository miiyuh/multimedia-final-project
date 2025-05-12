import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const decisions = await storage.getDecisions();
  res.status(200).json(decisions);
}
