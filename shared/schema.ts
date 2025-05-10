import { pgTable, text, serial, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Suspects data
export const suspects = pgTable("suspects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // ransomware group, state-sponsored, insider, etc.
  region: text("region").notNull(),
  motive: text("motive").notNull(),
  description: text("description").notNull(),
  tactics: json("tactics").notNull(), // Array of known tactics
  evidenceLinks: json("evidence_links").notNull(), // Array of evidence IDs related to suspect
});

export const insertSuspectSchema = createInsertSchema(suspects).omit({
  id: true,
});

// Evidence items
export const evidenceItems = pgTable("evidence_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // digital evidence, network logs, email, etc.
  description: text("description").notNull(),
  imageUrl: text("image_url"), // URL to evidence image/thumbnail
  detailContent: json("detail_content").notNull(), // Detailed content when viewing evidence
  isUnlocked: boolean("is_unlocked").default(false), // If evidence is available to user
});

export const insertEvidenceItemSchema = createInsertSchema(evidenceItems).omit({
  id: true,
});

// Decision points in the investigation
export const decisions = pgTable("decisions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  options: json("options").notNull(), // Array of decision options
  nextStates: json("next_states").notNull(), // State transitions based on decisions
});

export const insertDecisionSchema = createInsertSchema(decisions).omit({
  id: true,
});

// User progress and state
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  currentStep: text("current_step").notNull().default("intro"),
  unlockedEvidence: json("unlocked_evidence").notNull().default([]), // Array of unlocked evidence IDs
  decisions: json("decisions").notNull().default({}), // Map of decision ID to selected option
  timeRemaining: integer("time_remaining").notNull().default(172800), // 48 hours in seconds
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastUpdated: true,
});

// Define types for schema
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Suspect = typeof suspects.$inferSelect;
export type InsertSuspect = z.infer<typeof insertSuspectSchema>;

export type EvidenceItem = typeof evidenceItems.$inferSelect;
export type InsertEvidenceItem = z.infer<typeof insertEvidenceItemSchema>;

export type Decision = typeof decisions.$inferSelect;
export type InsertDecision = z.infer<typeof insertDecisionSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

// Decision option type
export type DecisionOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  status?: string;
  outcome: string;
};
