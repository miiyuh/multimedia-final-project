import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const evidence = await storage.getEvidenceItems();
  res.status(200).json(evidence);
}
