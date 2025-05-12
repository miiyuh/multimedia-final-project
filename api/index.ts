import express, { Request, Response } from "express";
import cors from "cors";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema, insertUserProgressSchema } from "./schema";

const app = express();
app.use(cors());
app.use(express.json());

// ---- API ROUTES ----

// Suspects
app.get("/api/suspects", async (_req, res) => {
  res.json(await storage.getSuspects());
});

app.get("/api/suspects/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const suspect = await storage.getSuspect(id);
  suspect ? res.json(suspect) : res.status(404).json({ message: "Suspect not found" });
});

// Evidence
app.get("/api/evidence", async (_req, res) => {
  res.json(await storage.getEvidenceItems());
});

app.get("/api/evidence/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const evidence = await storage.getEvidenceItem(id);
  evidence ? res.json(evidence) : res.status(404).json({ message: "Evidence not found" });
});

// Decisions
app.get("/api/decisions", async (_req, res) => {
  res.json(await storage.getDecisions());
});

app.get("/api/decisions/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const decision = await storage.getDecision(id);
  decision ? res.json(decision) : res.status(404).json({ message: "Decision not found" });
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
      currentStep: (decision.nextStates as Record<string, string>)[optionId] ?? "intro",
      unlockedEvidence: [],
      decisions: { [id]: optionId },
      timeRemaining: 172800,
    });
  } else {
    progress = await storage.updateUserProgress(userId, {
      currentStep: (decision.nextStates as Record<string, string>)[optionId] ?? progress.currentStep,
      decisions: { ...progress.decisions, [id]: optionId },
    });
  }

  res.json({ success: true, outcome: option.outcome, userProgress: progress });
});

// User Progress
app.get("/api/progress/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const progress = await storage.getUserProgress(userId);
  progress ? res.json(progress) : res.status(404).json({ message: "Not found" });
});

app.put("/api/progress/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const result = insertUserProgressSchema.partial().safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });

  const updated = await storage.updateUserProgress(userId, result.data);
  updated ? res.json(updated) : res.status(404).json({ message: "Not found" });
});

// Users
app.post("/api/users", async (req, res) => {
  const result = insertUserSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error });

  const existing = await storage.getUserByUsername(result.data.username);
  if (existing) return res.status(409).json({ message: "Username exists" });

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

// ---- START SERVER ----
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
