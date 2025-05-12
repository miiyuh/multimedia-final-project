type User = { id: number; username: string; password: string };
type Suspect = {
  id: number;
  name: string;
  type: string;
  region: string;
  motive: string;
  description: string;
  tactics: string[];
  evidenceLinks: number[];
};
type EvidenceItem = {
  id: number;
  title: string;
  type: string;
  description: string;
  imageUrl: string | null;
  detailContent: {
    fullDescription: string;
    keyFindings: string[];
    relatedSuspects: number[];
    analysisTools: string[];
  };
  isUnlocked: boolean;
};
type DecisionOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: string;
  outcome: string;
};
type Decision = {
  id: number;
  title: string;
  description: string;
  options: DecisionOption[];
  nextStates: Record<string, string>;
};
type UserProgress = {
  id: number;
  userId: number;
  currentStep: string;
  unlockedEvidence: number[];
  decisions: Record<number, string>;
  timeRemaining: number;
  lastUpdated: Date;
};

class MemStorage {
  users = new Map<number, User>();
  suspects = new Map<number, Suspect>();
  evidenceItems = new Map<number, EvidenceItem>();
  decisions = new Map<number, Decision>();
  userProgress = new Map<number, UserProgress>();

  currentUserId = 1;
  currentSuspectId = 1;
  currentEvidenceId = 1;
  currentDecisionId = 1;
  currentProgressId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const suspects: Omit<Suspect, "id">[] = [
      {
        name: "ShadowVault Group",
        type: "RANSOMWARE",
        region: "EASTERN EUROPE",
        motive: "FINANCIAL MOTIVE",
        description: "Notorious ransomware gang with suspected ties...",
        tactics: ["Spear-phishing campaigns", "VPN credential theft"],
        evidenceLinks: [2, 4, 5],
      },
    ];
    suspects.forEach((s) => this.createSuspect(s));

    const evidence: Omit<EvidenceItem, "id">[] = [
      {
        title: "Ransomware Binary Analysis",
        type: "MALWARE SAMPLE",
        description: "BlackVault ransomware sample...",
        imageUrl: "https://images.unsplash.com/photo-example",
        detailContent: {
          fullDescription: "Decompiled ransomware executable...",
          keyFindings: ["Advanced encryption", "Hard-coded IP"],
          relatedSuspects: [1],
          analysisTools: ["Malware Sandbox"],
        },
        isUnlocked: true,
      },
    ];
    evidence.forEach((e) => this.createEvidenceItem(e));

    const decisions: Omit<Decision, "id">[] = [
      {
        title: "Investigation Focus",
        description: "What path will you prioritize?",
        options: [
          {
            id: "threat_actor",
            title: "Threat Actor Analysis",
            description: "Trace the attackers",
            icon: "user-secret",
            status: "Time Intensive",
            outcome: "Identified as ShadowVault",
          },
        ],
        nextStates: {
          threat_actor: "actor_analysis",
        },
      },
    ];
    decisions.forEach((d) => this.createDecision(d));
  }

  // --- User
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const id = this.currentUserId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // --- Suspects
  async getSuspects(): Promise<Suspect[]> {
    return Array.from(this.suspects.values());
  }

  async getSuspect(id: number): Promise<Suspect | undefined> {
    return this.suspects.get(id);
  }

  async createSuspect(suspect: Omit<Suspect, "id">): Promise<Suspect> {
    const id = this.currentSuspectId++;
    const newSuspect = { ...suspect, id };
    this.suspects.set(id, newSuspect);
    return newSuspect;
  }

  // --- Evidence
  async getEvidenceItems(): Promise<EvidenceItem[]> {
    return Array.from(this.evidenceItems.values());
  }

  async getEvidenceItem(id: number): Promise<EvidenceItem | undefined> {
    return this.evidenceItems.get(id);
  }

  async createEvidenceItem(item: Omit<EvidenceItem, "id">): Promise<EvidenceItem> {
    const id = this.currentEvidenceId++;
    const completeItem: EvidenceItem = {
      ...item,
      id,
      imageUrl: item.imageUrl ?? null,
      isUnlocked: item.isUnlocked ?? false,
    };
    this.evidenceItems.set(id, completeItem);
    return completeItem;
  }

  async updateEvidenceItem(id: number, updates: Partial<EvidenceItem>): Promise<EvidenceItem | undefined> {
    const item = this.evidenceItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, ...updates };
    this.evidenceItems.set(id, updated);
    return updated;
  }

  // --- Decisions
  async getDecisions(): Promise<Decision[]> {
    return Array.from(this.decisions.values());
  }

  async getDecision(id: number): Promise<Decision | undefined> {
    return this.decisions.get(id);
  }

  async createDecision(d: Omit<Decision, "id">): Promise<Decision> {
    const id = this.currentDecisionId++;
    const newDecision = { ...d, id };
    this.decisions.set(id, newDecision);
    return newDecision;
  }

  // --- Progress
  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find((p) => p.userId === userId);
  }

  async createUserProgress(progress: Omit<UserProgress, "id" | "lastUpdated">): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const entry: UserProgress = {
      ...progress,
      id,
      lastUpdated: new Date(),
    };
    this.userProgress.set(id, entry);
    return entry;
  }

  async updateUserProgress(userId: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const progress = Array.from(this.userProgress.values()).find((p) => p.userId === userId);
    if (!progress) return undefined;
    const updated: UserProgress = {
      ...progress,
      ...updates,
      unlockedEvidence: updates.unlockedEvidence ?? progress.unlockedEvidence,
      lastUpdated: new Date(),
    };

    this.userProgress.set(progress.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();