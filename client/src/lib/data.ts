export interface Evidence {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  hash: string;
  image: string;
  notes: string;
}

export interface PathOption {
  title: string;
  description: string;
}

export interface PathDecision {
  id: string;
  title: string;
  description: string;
  options: PathOption[];
}

export interface InvestigationPath {
  id: string;
  title: string;
  description: string;
  image: string;
  techniques: string[];
  decision: PathDecision;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image: string;
}

export const evidenceItems: Evidence[] = [
  {
    id: "EVIDENCE #NTL-2023-001",
    title: "Network Traffic Logs",
    description: "Suspicious outbound connections identified during incident timeframe.",
    type: "Network Capture",
    date: "2023-10-12 06:42 AM",
    hash: "e7c22b994c59d9cf2b48e549b1e24666e4b2880a9b3a7e1c149c63f490759c6f",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    notes: "Analysis of network traffic during the incident timeframe reveals multiple connections to IP address 185.27.134.156 from the infected host. This matches known command and control servers for the ShadowLock ransomware group. Traffic shows evidence of both data exfiltration and command execution protocols."
  },
  {
    id: "EVIDENCE #EML-2023-042",
    title: "Suspicious Email",
    description: "Potentially malicious email received by marketing department with attachment.",
    type: "Email Message",
    date: "2023-10-10 09:13 AM",
    hash: "b3d8f1e79c90b7e1f7d4b29a86c0765ad901a1e87a9f19e40056e5ef45d00123",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    notes: "Email received by Sarah Chen in Marketing containing attachment 'Invoice_October2023.docm'. Sender address (accounting@techgloba1corp.com) appears to be a typo-squatted domain. Email headers suggest actual origin from VPS in Eastern Europe. Macro-enabled document contained obfuscated VBA code that downloads first-stage loader."
  },
  {
    id: "EVIDENCE #BIN-2023-067",
    title: "Ransomware Binary",
    description: "Isolated malicious executable from infected workstation in sandbox environment.",
    type: "Executable File",
    date: "2023-10-12 10:27 AM",
    hash: "f4c98713ae49b5c3b1508b16a9f3b82a04a03e67cd3f71b50acbb738c5f4897a",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    notes: "ShadowLock ransomware executable recovered from infected host. Initial analysis shows hybrid encryption using RSA-2048 for key exchange and AES-256 for file encryption. Binary contains anti-analysis techniques including VM detection and debugger checks. Ransom note template embedded with contact instructions via TOR network."
  },
  {
    id: "EVIDENCE #MEM-2023-013",
    title: "Memory Dump Analysis",
    description: "RAM capture from patient zero workstation showing encryption process.",
    type: "Memory Capture",
    date: "2023-10-12 08:53 AM",
    hash: "a2c12b991c59d9cf2b48e549b1e24666e4b2880a9b3a7e1c149c63f490759fff",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    notes: "Memory dump from patient zero workstation shows encryption process in action. Analysis reveals ransomware targeting specific file extensions including .docx, .xlsx, .pdf, and database backups. Process injection technique identified with DLL hijacking of legitimate Windows service. Found encryption key remnants in memory that may assist with decryption efforts."
  },
  {
    id: "EVIDENCE #CRY-2023-009",
    title: "Cryptocurrency Analysis",
    description: "Bitcoin wallet transaction history linked to ransom demand.",
    type: "Blockchain Data",
    date: "2023-10-12 14:22 PM",
    hash: "d9e1f8a50b3c4d7e6f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    notes: "Blockchain analysis of the Bitcoin wallet shows previous transactions linked to wallets associated with ShadowLock ransomware group. Wallet has received over 275 BTC in the last 6 months from suspected victims. Funds typically move through multiple mixing services before ending up at exchanges with weak KYC requirements."
  },
  {
    id: "EVIDENCE #RAT-2023-028",
    title: "Persistent Backdoor",
    description: "Evidence of a remote access tool installed before the ransomware deployment.",
    type: "Remote Access Tool",
    date: "2023-10-12 11:07 AM",
    hash: "7b3c5d1e9f8a2b4c6d8e0f2a4c6e8a0d2c4e6a8c0e2a4c6e8a0d2c4e6a8c0e2a4",
    image: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    notes: "Remote Access Trojan discovered on three systems, installed two weeks before ransomware deployment. RAT provides persistent access to the network and has keylogging, screen capture, and file exfiltration capabilities. C2 communication uses encrypted channel over port 443 to blend with normal HTTPS traffic. Appears to be customized version of Cobalt Strike beacon."
  }
];

export const pathDecisions: Record<string, PathDecision> = {
  "1": {
    id: "1",
    title: "Phishing Email Analysis",
    description: "You've discovered the phishing email that initiated the attack. Based on your analysis, what is your next course of action?",
    options: [
      {
        title: "Attribute the Email Source",
        description: "Focus on tracing the email's origins through header analysis and sender infrastructure to identify the attackers."
      },
      {
        title: "Analyze Attachment Payload",
        description: "Prioritize reverse-engineering the malicious document attachment to understand the initial infection mechanism."
      },
      {
        title: "Search for Similar Campaigns",
        description: "Look for similar phishing campaigns in threat intelligence databases to connect this to known attack groups."
      }
    ]
  },
  "2": {
    id: "2",
    title: "Ransomware Code Analysis",
    description: "Your analysis of the ransomware code has revealed important technical details. What approach should you prioritize?",
    options: [
      {
        title: "Encryption Implementation Analysis",
        description: "Focus on the encryption algorithms and key management to potentially find weaknesses for file recovery."
      },
      {
        title: "Command & Control Infrastructure",
        description: "Prioritize mapping the C2 infrastructure to identify and potentially take down the attacker's network."
      },
      {
        title: "Behavioral Analysis",
        description: "Study the ransomware's behavior to develop detection rules and prevent future infections of the same strain."
      }
    ]
  },
  "3": {
    id: "3",
    title: "Threat Actor Tracking",
    description: "You've identified potential links to the threat actors. How do you proceed with the investigation?",
    options: [
      {
        title: "Cryptocurrency Trail Analysis",
        description: "Follow the cryptocurrency payments through blockchain analysis to identify exchange points and possible cash-out locations."
      },
      {
        title: "Dark Web Intelligence Gathering",
        description: "Monitor dark web forums and marketplaces for mentions of the attack or data being sold from the victim organization."
      },
      {
        title: "Coordinate with Law Enforcement",
        description: "Share your findings with international law enforcement agencies to assist in attribution and potential arrests."
      }
    ]
  }
};

export const investigationPaths: InvestigationPath[] = [
  {
    id: "1",
    title: "Trace Attack Vector",
    description: "Focus on identifying how the attackers initially gained access to the network. Analyze phishing emails, exploit evidence, and compromised credentials.",
    image: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    techniques: [
      "Email forensics and header analysis",
      "Malicious attachment reverse engineering",
      "Authentication logs examination"
    ],
    decision: pathDecisions["1"]
  },
  {
    id: "2",
    title: "Analyze Ransomware Code",
    description: "Perform deep technical analysis of the ransomware binary to identify encryption methods, command servers, and potential weaknesses for decryption.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    techniques: [
      "Static and dynamic malware analysis",
      "Encryption algorithm identification",
      "Command & control server analysis"
    ],
    decision: pathDecisions["2"]
  },
  {
    id: "3",
    title: "Track Threat Actors",
    description: "Follow the digital trail of the attackers through cryptocurrency transactions, communication channels, and known tactics to identify the threat group.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800",
    techniques: [
      "Blockchain transaction analysis",
      "Dark web forum monitoring",
      "Threat actor attribution techniques"
    ],
    decision: pathDecisions["3"]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    date: "2023-10-10 09:13 AM",
    title: "Initial Compromise",
    description: "Employee in Marketing Department received a phishing email with malicious invoice document.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "2023-10-10 09:27 AM",
    title: "Malware Execution",
    description: "Macro-enabled document executed trojan downloader, establishing connection to command server.",
    image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "2023-10-10 11:42 AM",
    title: "Privilege Escalation",
    description: "Attackers exploited local vulnerability to gain administrator access to domain controller.",
    image: "https://images.unsplash.com/photo-1639322537065-f4c1c124cd45?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "2023-10-11 02:17 AM",
    title: "Lateral Movement",
    description: "Hackers used credential dumping tools to move laterally across network, accessing file servers and databases.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "2023-10-11 23:45 PM",
    title: "Data Exfiltration",
    description: "Approximately 2.3TB of sensitive corporate data exfiltrated to external servers using encrypted channels.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
  },
  {
    date: "2023-10-12 03:27 AM",
    title: "Ransomware Detonation",
    description: "Mass encryption of company files initiated simultaneously across all compromised systems. Ransom notes deployed.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=800"
  }
];
