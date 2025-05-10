import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, BookOpen, FileText, GraduationCap, HelpCircle, Info } from 'lucide-react';
import { CaseStateProvider } from '@/hooks/use-case-state';

const Resources = () => {
  return (
    <CaseStateProvider>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold font-mono text-primary mb-2">RESOURCES</h1>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Educational materials and reference guides to help you understand ransomware attacks, digital forensics techniques,
            and best practices for cybercrime investigations.
          </p>
        </motion.div>
        
        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guides">Investigation Guides</TabsTrigger>
            <TabsTrigger value="glossary">Cybersecurity Glossary</TabsTrigger>
            <TabsTrigger value="faq">FAQ & Help</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-dark-200 border-dark-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <BookOpen className="mr-2 h-5 w-5" /> Ransomware Investigation Guide
                  </CardTitle>
                  <CardDescription className="text-light-300">
                    Key procedures for analyzing ransomware attacks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        1. Initial Response Procedures
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Isolate affected systems to prevent further spread</li>
                          <li>Preserve volatile memory and logs before powering down</li>
                          <li>Create forensic disk images of affected systems</li>
                          <li>Document all visible ransom notes and encrypted file extensions</li>
                          <li>Establish a secure communication channel separate from compromised network</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        2. Evidence Collection
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Capture full system memory dumps</li>
                          <li>Extract system, security, and application event logs</li>
                          <li>Collect network traffic logs and firewall data</li>
                          <li>Secure email server logs and suspicious messages</li>
                          <li>Obtain sample of ransomware binary for analysis</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        3. Attack Vector Analysis
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Scan for phishing emails with malicious attachments</li>
                          <li>Check RDP, VPN, and remote access logs for brute force attempts</li>
                          <li>Examine recently installed software and patches</li>
                          <li>Review admin account usage and credential access patterns</li>
                          <li>Check for exploitation of known vulnerabilities in public-facing systems</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        4. Malware Analysis Techniques
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Static analysis of ransomware binary without execution</li>
                          <li>Dynamic analysis in isolated sandbox environment</li>
                          <li>Identification of encryption algorithms and key management</li>
                          <li>Analysis of command and control communication</li>
                          <li>Extraction of indicators of compromise (IOCs)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-200 border-dark-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <FileText className="mr-2 h-5 w-5" /> Digital Forensics Reference
                  </CardTitle>
                  <CardDescription className="text-light-300">
                    Essential tools and techniques for digital evidence analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        1. Disk Analysis Techniques
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Master file table (MFT) analysis for NTFS volumes</li>
                          <li>File signature analysis and extension mismatch detection</li>
                          <li>Deleted file recovery and carving techniques</li>
                          <li>Registry hive analysis for system configuration changes</li>
                          <li>Timeline creation with file system timestamps</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        2. Memory Forensics
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Process enumeration and analysis</li>
                          <li>Kernel module and driver inspection</li>
                          <li>Network connection identification</li>
                          <li>Extracting crypto keys from memory</li>
                          <li>Detecting code injection and rootkits</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        3. Network Traffic Analysis
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>PCAP file analysis and packet inspection</li>
                          <li>Command and control (C2) traffic identification</li>
                          <li>Data exfiltration detection techniques</li>
                          <li>DNS query analysis and anomaly detection</li>
                          <li>TLS/SSL traffic inspection methods</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-dark-100">
                      <AccordionTrigger className="text-light-100 hover:text-primary">
                        4. Timeline Analysis
                      </AccordionTrigger>
                      <AccordionContent className="text-light-200">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Event correlation across multiple data sources</li>
                          <li>Identifying temporal gaps and anomalies</li>
                          <li>User activity reconstruction</li>
                          <li>Authentication events and privilege escalation</li>
                          <li>Anti-forensic techniques detection</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="glossary" className="mt-6">
            <Card className="bg-dark-200 border-dark-100">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <GraduationCap className="mr-2 h-5 w-5" /> Cybersecurity Terminology
                </CardTitle>
                <CardDescription className="text-light-300">
                  Key terms and concepts used in cybersecurity investigations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-light-100 mb-2">Ransomware Concepts</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-primary font-mono font-bold">BlackVault</dt>
                        <dd className="text-light-200 text-sm pl-4">A sophisticated ransomware variant that uses hybrid encryption (AES-256 and RSA-4096) to encrypt files and appends the .qlock extension.</dd>
                      </div>
                      <div>
                        <dt className="text-primary font-mono font-bold">Double Extortion</dt>
                        <dd className="text-light-200 text-sm pl-4">An attack strategy where threat actors both encrypt data and steal copies for leverage, threatening to publish sensitive information if ransom isn't paid.</dd>
                      </div>
                      <div>
                        <dt className="text-primary font-mono font-bold">Initial Access Vector</dt>
                        <dd className="text-light-200 text-sm pl-4">The method used by attackers to first gain entry to a network, such as phishing emails, RDP exploitation, or supply chain compromise.</dd>
                      </div>
                      <div>
                        <dt className="text-primary font-mono font-bold">Lateral Movement</dt>
                        <dd className="text-light-200 text-sm pl-4">Techniques used by attackers to move through a network after gaining initial access, often using stolen credentials or exploiting vulnerabilities.</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-light-100 mb-2">Forensic Investigation</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-primary font-mono font-bold">Indicators of Compromise (IOCs)</dt>
                        <dd className="text-light-200 text-sm pl-4">Digital artifacts like IP addresses, file hashes, registry keys, or domain names that identify malicious activity.</dd>
                      </div>
                      <div>
                        <dt className="text-primary font-mono font-bold">Memory Dump</dt>
                        <dd className="text-light-200 text-sm pl-4">A snapshot of the contents of a computer's RAM at a specific point in time, capturing running processes and unencrypted data.</dd>
                      </div>
                      <div>
                        <dt className="text-primary font-mono font-bold">Sandbox Analysis</dt>
                        <dd className="text-light-200 text-sm pl-4">Running suspicious files in an isolated environment to observe their behavior without risking actual systems.</dd>
                      </div>
                      <div>
                        <dt className="text-primary font-mono font-bold">Threat Actor Attribution</dt>
                        <dd className="text-light-200 text-sm pl-4">The process of identifying which individual or group is responsible for a cyberattack based on techniques, infrastructure, and patterns.</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq" className="mt-6">
            <Card className="bg-dark-200 border-dark-100">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <HelpCircle className="mr-2 h-5 w-5" /> Frequently Asked Questions
                </CardTitle>
                <CardDescription className="text-light-300">
                  Help and guidance for the RansomTrack simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-dark-100">
                    <AccordionTrigger className="text-light-100 hover:text-primary">
                      How does the investigation timer work?
                    </AccordionTrigger>
                    <AccordionContent className="text-light-200">
                      <p>
                        The investigation timer simulates the time pressure of a real ransomware incident. You have 48 hours (in simulation time) 
                        to complete your investigation before the ransom deadline expires. Each action and decision you make will consume time. 
                        The timer can be seen in the top-right corner of the navigation bar. If time expires before you've reached conclusions, 
                        your investigation will be considered incomplete.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-dark-100">
                    <AccordionTrigger className="text-light-100 hover:text-primary">
                      What's the best way to analyze evidence?
                    </AccordionTrigger>
                    <AccordionContent className="text-light-200">
                      <p>
                        Start by reviewing the case background and timeline to understand the attack sequence. Then examine evidence 
                        items one by one, using the appropriate forensic tools for each type of evidence. Cross-reference information 
                        between different evidence sources to build a complete picture. The investigation tools can help extract deeper 
                        insights from evidence items.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-dark-100">
                    <AccordionTrigger className="text-light-100 hover:text-primary">
                      How do decisions affect the investigation outcome?
                    </AccordionTrigger>
                    <AccordionContent className="text-light-200">
                      <p>
                        Each decision you make will influence how the investigation proceeds and what evidence becomes available. 
                        Some decisions may open new investigative paths while closing others. Your choices will affect your ability 
                        to identify the threat actors, recover files, and prevent future attacks. There are multiple possible outcomes 
                        based on your decisions throughout the investigation.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border-dark-100">
                    <AccordionTrigger className="text-light-100 hover:text-primary">
                      Can I save my progress and continue later?
                    </AccordionTrigger>
                    <AccordionContent className="text-light-200">
                      <p>
                        Yes, your investigation progress is automatically saved as you work. You can also manually save your 
                        progress by clicking the save icon in the footer. The simulation will remember your current step, 
                        decisions made, evidence examined, and remaining time. When you return, you can continue from where 
                        you left off.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border-dark-100">
                    <AccordionTrigger className="text-light-100 hover:text-primary">
                      Where can I learn more about ransomware investigations?
                    </AccordionTrigger>
                    <AccordionContent className="text-light-200">
                      <p>
                        The Resources section provides detailed guides on ransomware investigations and digital forensics techniques. 
                        For more in-depth learning, we recommend resources from organizations like SANS, NIST, and the FBI's guidance 
                        on ransomware response. Professional certifications like GCFA (GIAC Certified Forensic Analyst) and EnCE 
                        (EnCase Certified Examiner) also provide valuable training.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <Card className="bg-dark-200 border-dark-100">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <AlertCircle className="text-warning h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-light-100 mb-2">Educational Purpose Notice</h3>
                      <p className="text-light-200">
                        This simulation is designed for educational purposes only. The case, evidence, and investigation techniques 
                        presented are fictional but based on real-world ransomware incidents. The tools and techniques demonstrated 
                        should only be used in authorized environments and in accordance with applicable laws and regulations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CaseStateProvider>
  );
};

export default Resources;
