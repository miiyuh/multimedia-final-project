import { 
  users, 
  suspects, 
  evidenceItems, 
  decisions, 
  userProgress,
  type User, 
  type InsertUser,
  type Suspect,
  type InsertSuspect,
  type EvidenceItem,
  type InsertEvidenceItem,
  type Decision,
  type InsertDecision,
  type UserProgress,
  type InsertUserProgress 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Suspect methods
  getSuspects(): Promise<Suspect[]>;
  getSuspect(id: number): Promise<Suspect | undefined>;
  createSuspect(suspect: InsertSuspect): Promise<Suspect>;
  
  // Evidence methods
  getEvidenceItems(): Promise<EvidenceItem[]>;
  getEvidenceItem(id: number): Promise<EvidenceItem | undefined>;
  createEvidenceItem(item: InsertEvidenceItem): Promise<EvidenceItem>;
  updateEvidenceItem(id: number, item: Partial<InsertEvidenceItem>): Promise<EvidenceItem | undefined>;
  
  // Decision methods
  getDecisions(): Promise<Decision[]>;
  getDecision(id: number): Promise<Decision | undefined>;
  createDecision(decision: InsertDecision): Promise<Decision>;
  
  // User Progress methods
  getUserProgress(userId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: number, progress: Partial<InsertUserProgress>): Promise<UserProgress | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private suspects: Map<number, Suspect>;
  private evidenceItems: Map<number, EvidenceItem>;
  private decisions: Map<number, Decision>;
  private userProgress: Map<number, UserProgress>;
  
  currentUserId: number;
  currentSuspectId: number;
  currentEvidenceId: number;
  currentDecisionId: number;
  currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.suspects = new Map();
    this.evidenceItems = new Map();
    this.decisions = new Map();
    this.userProgress = new Map();
    
    this.currentUserId = 1;
    this.currentSuspectId = 1;
    this.currentEvidenceId = 1;
    this.currentDecisionId = 1;
    this.currentProgressId = 1;
    
    // Initialize with default data
    this.initializeData();
  }

  private initializeData() {
    // Add default suspects
    const defaultSuspects: InsertSuspect[] = [
      {
        name: "ShadowVault Group",
        type: "RANSOMWARE",
        region: "EASTERN EUROPE",
        motive: "FINANCIAL MOTIVE",
        description: "Notorious ransomware gang with suspected ties to Eastern European cybercriminal organizations. Known for targeting financial institutions and technology companies with sophisticated multi-stage attacks.",
        tactics: ["Spear-phishing campaigns targeting executives", "VPN credential theft and exploitation", "Double extortion: data theft + encryption"],
        evidenceLinks: [2, 4, 5]
      },
      {
        name: "APT-Nexus",
        type: "STATE-SPONSORED",
        region: "ASIA-PACIFIC",
        motive: "ESPIONAGE",
        description: "Advanced persistent threat group with suspected state sponsorship. Typically focuses on intellectual property theft and espionage but has recently adopted ransomware tactics as a cover for operations.",
        tactics: ["Zero-day vulnerability exploitation", "Supply chain attacks", "Long-term network persistence"],
        evidenceLinks: [1, 4]
      },
      {
        name: "Insider Threat",
        type: "INTERNAL",
        region: "DISGRUNTLED EMPLOYEE",
        motive: "REVENGE MOTIVE",
        description: "Evidence suggests the possibility of an insider threat. Recent IT department layoffs created potential for a disgruntled employee with privileged access to assist external attackers.",
        tactics: ["Disabled security controls before attack", "Unusual after-hours access", "High-level credentials used in attack"],
        evidenceLinks: [1, 6]
      }
    ];

    defaultSuspects.forEach(suspect => this.createSuspect(suspect));

    // Add default evidence items
    const defaultEvidence: InsertEvidenceItem[] = [
      {
        title: "Compromised Workstation Image",
        type: "DIGITAL EVIDENCE",
        description: "Forensic disk image of Patient Zero - the first compromised workstation belonging to a system administrator.",
        imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        detailContent: {
          fullDescription: "Full disk image from the first compromised workstation in the attack chain. Belongs to System Administrator Jennifer Larson, who reported unusual system behavior 3 days before the attack.",
          keyFindings: [
            "Multiple unauthorized PowerShell scripts executed at 2:34 AM on December 11",
            "Evidence of credential harvesting tool (Mimikatz)",
            "Traces of a phishing document with macro code that connects to external C2 server",
            "Disabled Windows Defender via registry modification"
          ],
          relatedSuspects: [1, 3],
          analysisTools: ["Disk Analysis", "Malware Sandbox"]
        },
        isUnlocked: true
      },
      {
        title: "Ransomware Binary Analysis",
        type: "MALWARE SAMPLE",
        description: "Isolated sample of the BlackVault ransomware executable found on the compromised servers.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        detailContent: {
          fullDescription: "Decompiled ransomware executable found on multiple encrypted servers. The malware appears to be a customized variant of the BlackVault ransomware family with specific targeting for database and backup systems.",
          keyFindings: [
            "Advanced encryption algorithm (AES-256 + RSA-4096)",
            "Configurable parameters suggest it was specifically customized for this target",
            "Hard-coded command and control server IP address: 185.212.47.63",
            "Contains string references to ShadowVault group"
          ],
          relatedSuspects: [1],
          analysisTools: ["Malware Sandbox", "Decryption Lab"]
        },
        isUnlocked: true
      },
      {
        title: "Phishing Email",
        type: "EMAIL",
        description: "Suspected phishing email sent to multiple employees one week before the attack, appearing to be from IT support.",
        imageUrl: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        detailContent: {
          fullDescription: "Spear-phishing email targeting IT staff sent on December 7. The email impersonated the IT director and asked recipients to review an attached 'security policy update' document that contained malicious macros.",
          keyFindings: [
            "Spoofed sender address made to look like internal IT director",
            "Document contained macro code that executes PowerShell command to download stage 2 payload",
            "Utilized recently registered lookalike domain (quantumdynamicscorp-it.com)",
            "Sophisticated social engineering refers to real internal projects"
          ],
          relatedSuspects: [1],
          analysisTools: ["Email Analyzer"]
        },
        isUnlocked: true
      },
      {
        title: "Network Traffic Logs",
        type: "NETWORK",
        description: "Captured packets showing communication between infected systems and command & control servers.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        detailContent: {
          fullDescription: "Network traffic capture from the corporate firewall spanning December 11-14. Shows unusual outbound traffic patterns and data exfiltration activity before encryption occurred.",
          keyFindings: [
            "Large data transfers to IP ranges in Eastern Europe (2.3TB total)",
            "Encrypted command and control traffic to known malicious servers",
            "Evidence of network scanning and lateral movement between systems",
            "Unusual DNS queries for command and control domains"
          ],
          relatedSuspects: [1, 2],
          analysisTools: ["Network Analyzer"]
        },
        isUnlocked: true
      },
      {
        title: "Ransom Note",
        type: "RANSOM DEMAND",
        description: "Text file left on encrypted systems demanding $2.75M in cryptocurrency with 72-hour deadline.",
        imageUrl: "https://images.unsplash.com/photo-1639322537162-32696a348910?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        detailContent: {
          fullDescription: "Ransom note left on all encrypted systems and emailed to executive team. Demands $2.75 million in cryptocurrency within 72 hours and threatens to publish stolen data on dark web leak site.",
          keyFindings: [
            "Identical language and format to previous ShadowVault attacks",
            "Bitcoin wallet address linked to known criminal operations",
            "Specifically mentions sensitive stolen projects by name (insider knowledge)",
            "Includes proof of data theft by attaching samples of confidential files"
          ],
          relatedSuspects: [1],
          analysisTools: ["Threat Intelligence"]
        },
        isUnlocked: true
      },
      {
        title: "VPN Access Records",
        type: "ACCESS LOGS",
        description: "Authentication logs showing suspicious login patterns from unauthorized locations using valid credentials.",
        imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        detailContent: {
          fullDescription: "VPN access logs for the month of December showing unusual authentication patterns. Multiple failed login attempts followed by successful connections from unusual locations.",
          keyFindings: [
            "System admin credentials used from IP addresses in Eastern Europe",
            "Successful logins at 3:14 AM on December 14 (unusual time)",
            "No multi-factor authentication challenges for suspicious logins",
            "Same credentials used simultaneously from different locations"
          ],
          relatedSuspects: [1, 3],
          analysisTools: ["Network Analyzer"]
        },
        isUnlocked: true
      }
    ];

    defaultEvidence.forEach(evidence => this.createEvidenceItem(evidence));

    // Add default decisions
    const defaultDecisions: InsertDecision[] = [
      {
        title: "Investigation Focus",
        description: "The CEO is requesting an immediate briefing on your progress. Time is limited, and you need to prioritize your investigation. Initial evidence suggests multiple possible avenues to pursue. Which investigation path will you prioritize next?",
        options: [
          {
            id: "threat_actor",
            title: "Threat Actor Analysis",
            description: "Focus on identifying the attackers by analyzing their tactics, techniques, and procedures. Trace cryptocurrency transactions and command servers.",
            icon: "user-secret",
            status: "Time Intensive",
            outcome: "You spend valuable time identifying the attackers as the ShadowVault Group. While this provides valuable intelligence, critical systems remain offline longer."
          },
          {
            id: "recovery",
            title: "Recovery Operations",
            description: "Prioritize recovering critical systems and data. Focus on finding decryption methods, evaluating backups, and restoring essential services.",
            icon: "shield-alt",
            status: "CEO's Preference",
            outcome: "You focus on recovery, bringing critical systems back online quickly. This limits financial damage but provides less intelligence about the attackers."
          },
          {
            id: "attack_vector",
            title: "Attack Vector Analysis",
            description: "Determine exactly how the attackers gained access. Focus on the suspected phishing emails and compromised VPN credentials.",
            icon: "door-open",
            status: "CISO's Recommendation",
            outcome: "You identify and close security vulnerabilities, preventing future attacks through the same vector. This balanced approach addresses both security and partial recovery."
          }
        ],
        nextStates: {
          "threat_actor": "actor_analysis",
          "recovery": "recovery_operations",
          "attack_vector": "vector_analysis"
        }
      }
    ];

    defaultDecisions.forEach(decision => this.createDecision(decision));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Suspect methods
  async getSuspects(): Promise<Suspect[]> {
    return Array.from(this.suspects.values());
  }
  
  async getSuspect(id: number): Promise<Suspect | undefined> {
    return this.suspects.get(id);
  }
  
  async createSuspect(insertSuspect: InsertSuspect): Promise<Suspect> {
    const id = this.currentSuspectId++;
    const suspect: Suspect = { ...insertSuspect, id };
    this.suspects.set(id, suspect);
    return suspect;
  }
  
  // Evidence methods
  async getEvidenceItems(): Promise<EvidenceItem[]> {
    return Array.from(this.evidenceItems.values());
  }
  
  async getEvidenceItem(id: number): Promise<EvidenceItem | undefined> {
    return this.evidenceItems.get(id);
  }
  
  async createEvidenceItem(insertItem: InsertEvidenceItem): Promise<EvidenceItem> {
    const id = this.currentEvidenceId++;
    const item: EvidenceItem = { ...insertItem, id };
    this.evidenceItems.set(id, item);
    return item;
  }
  
  async updateEvidenceItem(id: number, updates: Partial<InsertEvidenceItem>): Promise<EvidenceItem | undefined> {
    const item = this.evidenceItems.get(id);
    if (!item) return undefined;
    
    const updatedItem: EvidenceItem = { ...item, ...updates };
    this.evidenceItems.set(id, updatedItem);
    return updatedItem;
  }
  
  // Decision methods
  async getDecisions(): Promise<Decision[]> {
    return Array.from(this.decisions.values());
  }
  
  async getDecision(id: number): Promise<Decision | undefined> {
    return this.decisions.get(id);
  }
  
  async createDecision(insertDecision: InsertDecision): Promise<Decision> {
    const id = this.currentDecisionId++;
    const decision: Decision = { ...insertDecision, id };
    this.decisions.set(id, decision);
    return decision;
  }
  
  // User Progress methods
  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    return this.userProgress.get(userId);
  }
  
  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const timestamp = new Date();
    const progress: UserProgress = { ...insertProgress, id, lastUpdated: timestamp };
    this.userProgress.set(id, progress);
    return progress;
  }
  
  async updateUserProgress(userId: number, updates: Partial<InsertUserProgress>): Promise<UserProgress | undefined> {
    // Find progress by userId
    const progress = Array.from(this.userProgress.values()).find(
      (progress) => progress.userId === userId
    );
    
    if (!progress) return undefined;
    
    const timestamp = new Date();
    const updatedProgress: UserProgress = { 
      ...progress, 
      ...updates, 
      lastUpdated: timestamp 
    };
    
    this.userProgress.set(progress.id, updatedProgress);
    return updatedProgress;
  }
}

export const storage = new MemStorage();
