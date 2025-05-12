import express, { Request, Response } from "express";
import cors from "cors";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema, insertUserProgressSchema } from "./schema";

const app = express();
app.use(cors());
app.use(express.json());

// --- Evidence Handler (GET all or one)
app.get("/api/evidence/:id?", async (req, res) => {
  const id = req.params.id ? parseInt(req.params.id) : null;
  if (id) {
    const item = await storage.getEvidenceItem(id);
    return item ? res.json(item) : res.status(404).json({ message: "Evidence not found" });
  }
  const items = await storage.getEvidenceItems();
  return res.json(items);
});

// --- Suspect Handler (GET all or one)
app.get("/api/suspects/:id?", async (req, res) => {
  const id = req.params.id ? parseInt(req.params.id) : null;
  if (id) {
    const suspect = await storage.getSuspect(id);
    return suspect ? res.json(suspect) : res.status(404).json({ message: "Suspect not found" });
  }
  const suspects = await storage.getSuspects();
  return res.json(suspects);
});

// --- Decision Handler (GET all, one, or choose)
app.get("/api/decisions/:id?", async (req, res) => {
  const id = req.params.id ? parseInt(req.params.id) : null;
  if (id) {
    const decision = await storage.getDecision(id);
    return decision ? res.json(decision) : res.status(404).json({ message: "Decision not found" });
  }
  const decisions = await storage.getDecisions();
  return res.json(decisions);
});

app.post("/api/decisions/:id/choose", async (req, res) => {
  const id = parseInt(req.params.id);
  const schema = z.object({ userId: z.number(), optionId: z.string() });
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });

  const decision = await storage.getDecision(id);
  if (!decision) return res.status(404).json({ message: "Decision not found" });

  const { userId, optionId } = result.data;
  const option = (decision.options as any[]).find((o) => o.id === optionId);
  if (!option) return res.status(400).json({ message: "Invalid optionId" });

  let progress = await storage.getUserProgress(userId);
  if (!progress) {
    progress = await storage.createUserProgress({
      userId,
      currentStep: decision.nextStates[optionId] ?? "intro",
      unlockedEvidence: [],
      decisions: { [id]: optionId },
      timeRemaining: 172800,
    });
  } else {
    progress = await storage.updateUserProgress(userId, {
      currentStep: decision.nextStates[optionId] ?? progress.currentStep,
      decisions: { ...progress.decisions, [id]: optionId },
    });
  }

  res.json({ success: true, outcome: option.outcome, userProgress: progress });
});

// --- Progress Handler (GET + PUT)
app.route("/api/progress/:userId")
  .get(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const progress = await storage.getUserProgress(userId);
    progress ? res.json(progress) : res.status(404).json({ message: "Not found" });
  })
  .put(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const result = insertUserProgressSchema.partial().safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const updated = await storage.updateUserProgress(userId, result.data);
    updated ? res.json(updated) : res.status(404).json({ message: "Not found" });
  });

// --- User creation
app.post("/api/users", async (req, res) => {
  const result = insertUserSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });

  const existing = await storage.getUserByUsername(result.data.username);
  if (existing) return res.status(409).json({ message: "Username already exists" });

  const user = await storage.createUser(result.data);
  await storage.createUserProgress({
    userId: user.id,
    currentStep: "intro",
    unlockedEvidence: [1, 2, 3, 4, 5, 6],
    decisions: {},
    timeRemaining: 172800,
  });

  res.status(201).json(user);
});

// --- Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
