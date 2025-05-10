import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import CaseBackground from '@/components/case-background';
import { TerminalWindow } from '@/components/terminal-window';
import { CaseStateProvider } from '@/hooks/use-case-state';

const CaseFile = () => {
  return (
    <CaseStateProvider>
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold font-mono text-primary mb-2">CASE FILE</h1>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Case #RT-1337: Ransomware attack against Quantum Dynamics Corp. Review all case materials and incident details to inform your investigation.
          </p>
        </motion.div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Case Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
            <TabsTrigger value="notes">Investigation Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-dark-200 border-dark-100 col-span-1 lg:col-span-2">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-light-100 mb-4">Incident Summary</h2>
                  <p className="text-light-200 mb-4">
                    At 03:42 AM on December 14, Quantum Dynamics Corp's systems were compromised by a sophisticated ransomware attack. 
                    All corporate files were encrypted, and a ransom demand of $2.75 million in cryptocurrency was issued. 
                  </p>
                  <p className="text-light-200 mb-4">
                    The attack has crippled operations across all departments, with critical systems offline and sensitive company 
                    data potentially compromised. Initial investigation indicates this is a "BlackVault" ransomware variant, 
                    known to be deployed by several sophisticated threat actors.
                  </p>
                  <p className="text-light-200">
                    As the lead digital forensic investigator, you have been tasked with identifying the attack vector, 
                    determining the extent of the breach, identifying the threat actors, and developing a recovery strategy 
                    within the next 48 hours.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-200 border-dark-100">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-light-100 mb-4">Case Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">CASE NUMBER</h3>
                      <p className="text-light-200">RT-1337</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">DATE REPORTED</h3>
                      <p className="text-light-200">December 14, 2023 at 06:12 AM</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">PRIORITY</h3>
                      <p className="text-danger font-bold">CRITICAL</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">AFFECTED SYSTEMS</h3>
                      <p className="text-light-200">Enterprise-wide (42 servers, 215+ workstations)</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">RANSOM AMOUNT</h3>
                      <p className="text-light-200">$2.75 million (64.3 BTC)</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">DEADLINE</h3>
                      <p className="text-light-200">December 17, 2023 at 05:37 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card className="bg-dark-200 border-dark-100">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-light-100 mb-4">Terminal Access</h2>
                  <p className="text-light-300 mb-4">
                    Access to case-related systems is available through this terminal interface. Use standard digital forensics commands to analyze evidence.
                  </p>
                  <TerminalWindow />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0">
            <Card className="bg-dark-200 border-dark-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-light-100 mb-6">Incident Timeline</h2>
                <CaseBackground />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="company" className="mt-0">
            <Card className="bg-dark-200 border-dark-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-light-100 mb-4">Quantum Dynamics Corp Profile</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <p className="text-light-200 mb-4">
                      Quantum Dynamics Corp is a leading technology firm specializing in quantum computing research, 
                      advanced AI solutions, and secure cloud infrastructure. Founded in 2008, the company has grown 
                      to over 500 employees with headquarters in Boston and satellite offices in London and Singapore.
                    </p>
                    <p className="text-light-200 mb-4">
                      The company's primary revenue streams include government contracts for secure quantum computing research, 
                      enterprise AI solutions, and proprietary cloud security infrastructure. Annual revenue exceeds $175 million, 
                      with significant growth in the last three years.
                    </p>
                    <p className="text-light-200">
                      Quantum Dynamics holds several classified government contracts and stores sensitive intellectual property 
                      related to next-generation quantum encryption methods, making them a high-value target for both financially 
                      motivated cybercriminals and nation-state threat actors.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">INDUSTRY</h3>
                      <p className="text-light-200">Quantum Computing & AI Technology</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">EMPLOYEES</h3>
                      <p className="text-light-200">512 (as of December 2023)</p>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">KEY PERSONNEL</h3>
                      <ul className="text-light-200 list-disc pl-5 space-y-1">
                        <li>Dr. Elena Cheng, CEO & Co-Founder</li>
                        <li>Marcus Reynolds, CTO</li>
                        <li>Sarah Donovan, CISO</li>
                        <li>James Park, Head of R&D</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-primary font-mono text-sm mb-1">RECENT EVENTS</h3>
                      <ul className="text-light-200 list-disc pl-5 space-y-1">
                        <li>Announced new quantum security platform (Nov 15)</li>
                        <li>IT restructuring with 15 staff layoffs (Oct 22)</li>
                        <li>Secured $45M Series D funding (Sep 8)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-0">
            <Card className="bg-dark-200 border-dark-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-light-100 mb-4">Investigation Notes</h2>
                <ScrollArea className="h-[400px] p-4 bg-dark-300 rounded-md font-mono text-sm text-light-200">
                  <p className="mb-4">
                    [12/14 07:30] - Initial assessment completed. All servers and workstations infected with BlackVault ransomware variant. 
                    Extension .qlock appended to encrypted files. Ransom note found on desktop and emailed to executive team.
                  </p>
                  <p className="mb-4">
                    [12/14 09:15] - Interviewed CISO Sarah Donovan. Security team detected unusual VPN logins at 03:42 but alert was not escalated. 
                    Possible security team understaffing issue following recent layoffs. 
                  </p>
                  <p className="mb-4">
                    [12/14 11:20] - Secured samples of ransomware binary for analysis. Created initial disk images of patient zero system. 
                    Preliminary network traffic logs show large data exfiltration (2.3TB) prior to encryption.
                  </p>
                  <p className="mb-4">
                    [12/14 13:45] - Found phishing email in system admin's inbox from December 7, mimicking IT director's account. 
                    Email contained malicious document "Security_Policy_Update.docx" with embedded macros.
                  </p>
                  <p className="mb-4">
                    [12/14 16:10] - Analyzed VPN logs. Multiple failed login attempts using brute force before successful authentication. 
                    Credential harvesting malware (Mimikatz variant) found on compromised system.
                  </p>
                  <p className="mb-4">
                    [12/14 18:30] - Interviewed former IT security engineer Michael Torres, terminated in October layoffs. 
                    Confirmed Torres had administrative access and his credentials have not been properly deprovisioned.
                  </p>
                  <p className="mb-4">
                    [12/14 21:15] - Identified Bitcoin wallet used in ransom demand. Analysis shows wallet has received payments 
                    from three other recent ransomware victims in financial and healthcare sectors.
                  </p>
                  <p className="mb-4">
                    [12/15 00:40] - Identified command and control server IP: 185.212.47.63. Infrastructure previously linked to 
                    ShadowVault threat group. Russian language strings found in malware binary.
                  </p>
                  <p>
                    [12/15 04:20] - CEO requests immediate briefing to discuss payment vs. recovery options. Deadline for decision: 10:00 AM.
                  </p>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CaseStateProvider>
  );
};

export default CaseFile;
