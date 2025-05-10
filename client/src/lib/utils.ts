import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (seconds <= 0) return "00:00:00";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0')
  ].join(':');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export interface EvidenceFilter {
  id: string;
  label: string;
}

export const evidenceFilters: EvidenceFilter[] = [
  { id: 'all', label: 'All Evidence' },
  { id: 'DIGITAL EVIDENCE', label: 'Digital Forensics' },
  { id: 'NETWORK', label: 'Network Logs' },
  { id: 'EMAIL', label: 'Email Evidence' },
  { id: 'RANSOM DEMAND', label: 'Ransom Notes' },
  { id: 'ACCESS LOGS', label: 'Access Logs' },
  { id: 'MALWARE SAMPLE', label: 'Malware Samples' }
];

export interface Tool {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const investigationTools: Tool[] = [
  {
    id: 'disk_analysis',
    name: 'Disk Analysis',
    icon: 'search',
    description: 'Examine file system artifacts, recover deleted files, and analyze metadata from compromised systems.'
  },
  {
    id: 'network_analyzer',
    name: 'Network Analyzer',
    icon: 'network-wired',
    description: 'Inspect network traffic logs to identify communication patterns, malicious connections, and data exfiltration.'
  },
  {
    id: 'malware_sandbox',
    name: 'Malware Sandbox',
    icon: 'bug',
    description: 'Safely execute suspicious files and ransomware samples in isolated environment to analyze behavior and capabilities.'
  },
  {
    id: 'email_analyzer',
    name: 'Email Analyzer',
    icon: 'envelope',
    description: 'Trace phishing emails to their source, analyze headers, and identify malicious attachments or links.'
  },
  {
    id: 'decryption_lab',
    name: 'Decryption Lab',
    icon: 'key',
    description: 'Attempt to crack encryption keys, analyze encryption algorithms, and explore recovery options for encrypted files.'
  },
  {
    id: 'threat_intelligence',
    name: 'Threat Intelligence',
    icon: 'globe',
    description: 'Cross-reference findings with global threat databases to identify known threat actors, malware strains, and tactics.'
  }
];

export interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  tags: string[];
  position: 'left' | 'right';
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    time: '03:42 AM - INITIAL BREACH',
    title: 'Unauthorized Access Detected',
    description: 'Security logs indicate unusual authentication patterns through the company\'s VPN gateway. Multiple failed login attempts followed by a successful connection from an IP address in Eastern Europe.',
    tags: ['LOG FILES', 'VPN ACCESS'],
    position: 'left'
  },
  {
    id: 2,
    time: '04:15 AM - LATERAL MOVEMENT',
    title: 'Privilege Escalation',
    description: 'Attacker moved through the network, accessing domain controllers and deploying credential harvesting tools. Admin rights were obtained within 33 minutes of initial breach.',
    tags: ['NETWORK TRAFFIC', 'ADMIN ACCESS'],
    position: 'right'
  },
  {
    id: 3,
    time: '04:58 AM - DATA EXFILTRATION',
    title: 'Data Theft Detected',
    description: 'Before encryption, approximately 2.3TB of sensitive data was exfiltrated through an encrypted tunnel to an unknown destination server. Includes intellectual property and customer data.',
    tags: ['DATA TRANSFER', 'CONFIDENTIAL'],
    position: 'left'
  },
  {
    id: 4,
    time: '05:37 AM - ENCRYPTION',
    title: 'Ransomware Deployment',
    description: 'The "BlackVault" ransomware variant was deployed across all networked systems, encrypting files with a .qlock extension. Ransom note delivered to executive team emails.',
    tags: ['RANSOMWARE', 'ENCRYPTION', 'CRITICAL'],
    position: 'right'
  }
];
