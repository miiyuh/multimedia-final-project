import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema, insertUserProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the cybercrime investigation simulation
  
  // Get all suspects
  app.get("/api/suspects", async (req: Request, res: Response) => {
    try {
      const suspects = await storage.getSuspects();
      return res.json(suspects);
    } catch (error) {
      console.error("Error fetching suspects:", error);
      return res.status(500).json({ message: "Failed to fetch suspects" });
    }
  });
  
  // Get a specific suspect
  app.get("/api/suspects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid suspect ID" });
      }
      
      const suspect = await storage.getSuspect(id);
      if (!suspect) {
        return res.status(404).json({ message: "Suspect not found" });
      }
      
      return res.json(suspect);
    } catch (error) {
      console.error("Error fetching suspect:", error);
      return res.status(500).json({ message: "Failed to fetch suspect" });
    }
  });
  
  // Get all evidence items
  app.get("/api/evidence", async (req: Request, res: Response) => {
    try {
      const evidenceItems = await storage.getEvidenceItems();
      return res.json(evidenceItems);
    } catch (error) {
      console.error("Error fetching evidence:", error);
      return res.status(500).json({ message: "Failed to fetch evidence" });
    }
  });
  
  // Get a specific evidence item
  app.get("/api/evidence/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid evidence ID" });
      }
      
      const evidenceItem = await storage.getEvidenceItem(id);
      if (!evidenceItem) {
        return res.status(404).json({ message: "Evidence not found" });
      }
      
      return res.json(evidenceItem);
    } catch (error) {
      console.error("Error fetching evidence item:", error);
      return res.status(500).json({ message: "Failed to fetch evidence item" });
    }
  });
  
  // Get all decisions
  app.get("/api/decisions", async (req: Request, res: Response) => {
    try {
      const decisions = await storage.getDecisions();
      return res.json(decisions);
    } catch (error) {
      console.error("Error fetching decisions:", error);
      return res.status(500).json({ message: "Failed to fetch decisions" });
    }
  });
  
  // Get a specific decision
  app.get("/api/decisions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid decision ID" });
      }
      
      const decision = await storage.getDecision(id);
      if (!decision) {
        return res.status(404).json({ message: "Decision not found" });
      }
      
      return res.json(decision);
    } catch (error) {
      console.error("Error fetching decision:", error);
      return res.status(500).json({ message: "Failed to fetch decision" });
    }
  });
  
  // Make a decision
  app.post("/api/decisions/:id/choose", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid decision ID" });
      }
      
      const decision = await storage.getDecision(id);
      if (!decision) {
        return res.status(404).json({ message: "Decision not found" });
      }
      
      const choiceSchema = z.object({
        userId: z.number(),
        optionId: z.string()
      });
      
      const validatedData = choiceSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ message: "Invalid request data", errors: validatedData.error });
      }
      
      const { userId, optionId } = validatedData.data;
      
      // Check if the option exists in the decision
      const option = decision.options.find(opt => opt.id === optionId);
      if (!option) {
        return res.status(400).json({ message: "Invalid option ID" });
      }
      
      // Get user progress or create if it doesn't exist
      let userProgress = await storage.getUserProgress(userId);
      
      if (!userProgress) {
        // Create new progress record
        userProgress = await storage.createUserProgress({
          userId,
          currentStep: decision.nextStates[optionId] || "intro",
          unlockedEvidence: [],
          decisions: { [decision.id]: optionId },
          timeRemaining: 172800 // 48 hours in seconds
        });
      } else {
        // Update existing progress
        const decisions = { ...userProgress.decisions, [decision.id]: optionId };
        userProgress = await storage.updateUserProgress(userId, {
          currentStep: decision.nextStates[optionId] || userProgress.currentStep,
          decisions
        });
      }
      
      return res.json({ success: true, userProgress, outcome: option.outcome });
    } catch (error) {
      console.error("Error processing decision:", error);
      return res.status(500).json({ message: "Failed to process decision" });
    }
  });
  
  // Get user progress
  app.get("/api/progress/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const progress = await storage.getUserProgress(userId);
      if (!progress) {
        return res.status(404).json({ message: "User progress not found" });
      }
      
      return res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      return res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });
  
  // Create user (for demo/simulation purposes)
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ message: "Invalid user data", errors: validatedData.error });
      }
      
      const existingUser = await storage.getUserByUsername(validatedData.data.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(validatedData.data);
      
      // Create initial user progress
      await storage.createUserProgress({
        userId: user.id,
        currentStep: "intro",
        unlockedEvidence: [1, 2, 3, 4, 5, 6], // Start with all evidence unlocked for demo
        decisions: {},
        timeRemaining: 172800 // 48 hours in seconds
      });
      
      return res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Update user progress manually (for testing/debugging)
  app.put("/api/progress/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const validatedData = insertUserProgressSchema.partial().safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ message: "Invalid progress data", errors: validatedData.error });
      }
      
      const updatedProgress = await storage.updateUserProgress(userId, validatedData.data);
      if (!updatedProgress) {
        return res.status(404).json({ message: "User progress not found" });
      }
      
      return res.json(updatedProgress);
    } catch (error) {
      console.error("Error updating user progress:", error);
      return res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
