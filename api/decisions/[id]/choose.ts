import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../storage';
import { z } from 'zod';

const choiceSchema = z.object({
  userId: z.number(),
  optionId: z.string()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const id = parseInt(req.query.id as string);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid decision ID' });

  const parsed = choiceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid data', errors: parsed.error });

  const { userId, optionId } = parsed.data;
  const decision = await storage.getDecision(id);
  if (!decision) return res.status(404).json({ message: 'Decision not found' });

  const option = decision.options.find(opt => opt.id === optionId);
  if (!option) return res.status(400).json({ message: 'Invalid option' });

  let progress = await storage.getUserProgress(userId);
  if (!progress) {
    progress = await storage.createUserProgress({
      userId,
      currentStep: decision.nextStates[optionId] || 'intro',
      unlockedEvidence: [],
      decisions: { [decision.id]: optionId },
      timeRemaining: 172800
    });
  } else {
    progress = await storage.updateUserProgress(userId, {
      currentStep: decision.nextStates[optionId] || progress.currentStep,
      decisions: { ...progress.decisions, [decision.id]: optionId }
    });
  }

  res.status(200).json({ success: true, userProgress: progress, outcome: option.outcome });
}
