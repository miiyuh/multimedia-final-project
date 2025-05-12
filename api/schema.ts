import { pgTable, text, serial, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// --- Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// --- Suspects
export const suspects = pgTable("suspects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  region: text("region").notNull(),
  motive: text("motive").notNull(),
  description: text("description").notNull(),
  tactics: json("tactics").notNull(),
  evidenceLinks: json("evidence_links").notNull()
});
export const insertSuspectSchema = createInsertSchema(suspects).omit({
  id: true
});

// --- Evidence
export const evidenceItems = pgTable("evidence_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  detailContent: json("detail_content").notNull(),
  isUnlocked: boolean("is_unlocked").default(false)
});
export const insertEvidenceItemSchema = createInsertSchema(evidenceItems).omit({
  id: true
});

// --- Decisions
export const decisions = pgTable("decisions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  options: json("options").notNull(),
  nextStates: json("next_states").notNull()
});
export const insertDecisionSchema = createInsertSchema(decisions).omit({
  id: true
});

// --- User Progress
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  currentStep: text("current_step").notNull().default("intro"),
  unlockedEvidence: json("unlocked_evidence").notNull().default([]),
  decisions: json("decisions").notNull().default({}),
  timeRemaining: integer("time_remaining").notNull().default(172800),
  lastUpdated: timestamp("last_updated").notNull().defaultNow()
});
export const insertUserProgressSchema = z.object({
  userId: z.number(),
  currentStep: z.string().optional(),
  unlockedEvidence: z.array(z.number()).optional(),
  decisions: z.record(z.string(), z.string()).optional(),
  timeRemaining: z.number().optional(),
});

