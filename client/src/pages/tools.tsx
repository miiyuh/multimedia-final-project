import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CaseStateProvider, useCaseState } from '@/hooks/use-case-state';
import { AudioPlayer } from '@/components/ui/audio-player';
import { investigationTools } from '@/lib/utils';

const ToolsContent = () => {
  const { toast } = useToast();
  const { updateCaseProgress } = useCaseState();
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<string | null>(null);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  
  const handleLaunchTool = (toolId: string) => {
    setActiveToolId(toolId);
    setShowAnalysisDialog(true);
    
    // Simulate tool analysis
    setTimeout(() => {
      // Generate results based on the selected tool
      const results = getToolResults(toolId);
      setAnalysisResults(results);
      
      // Update case progress
      updateCaseProgress(0.05);
    }, 2000);
  };
  
  const handleCloseAnalysis = () => {
    setShowAnalysisDialog(false);
    setActiveToolId(null);
    setAnalysisResults(null);
    
    toast({
      title: "Analysis Saved",
      description: "Tool analysis results have been added to your case file.",
      duration: 3000,
    });
  };
  
  // Generate tool results based on the tool ID
  const getToolResults = (toolId: string): string => {
    switch (toolId) {
      case 'disk_analysis':
        return "Analysis Complete: Found evidence of credential harvesting (Mimikatz), PowerShell obfuscation techniques, and scheduled tasks for persistence. Recovered deleted registry keys showing security controls were disabled prior to encryption.";
      case 'network_analyzer':
        return "Analysis Complete: Identified unusual data transfers to IP 185.212.47.63 located in Eastern Europe. Connection pattern matches known ShadowVault C2 infrastructure. Total exfiltration: 2.3TB of company data including R&D files.";
      case 'malware_sandbox':
        return "Analysis Complete: BlackVault ransomware identified. Uses AES-256 encryption with unique keys for each file. Contains anti-forensic capabilities and VM detection. Hardcoded communication with C2 servers. Contains Russian language strings in code.";
      case 'email_analyzer':
        return "Analysis Complete: Phishing email originated from spoofed internal domain. Document contained macro code that established initial access. Headers reveal true sender IP: 91.185.46.12, previously associated with ShadowVault campaigns.";
      case 'decryption_lab':
        return "Analysis Complete: Encryption scheme uses hybrid RSA-4096/AES-256 approach. Brute force not feasible. Key structure indicates potential recovery method through memory analysis of unpatched systems. Recovery chance: 28%";
      case 'threat_intelligence':
        return "Analysis Complete: IOCs match ShadowVault group with 87% confidence. Recent campaigns target quantum computing firms. Ransom wallet linked to 3 previous attacks. Group known for data theft + encryption double extortion model.";
      default:
        return "Analysis complete. Results have been saved to the case file.";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold font-mono text-primary mb-2">FORENSIC TOOLKIT</h1>
        <div className="h-1 w-24 bg-secondary mb-6"></div>
        <p className="text-light-200 max-w-4xl">
          Access advanced digital forensics tools to analyze evidence, extract valuable data, and identify attack patterns.
          Each tool is specialized for different aspects of the investigation.
        </p>
      </motion.div>
      
      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tools">Analysis Tools</TabsTrigger>
          <TabsTrigger value="results">Analysis Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investigationTools.map((tool) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-dark-200 rounded-lg border border-dark-100 hover:border-primary transition duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                        <i className={`fas fa-${tool.icon} text-primary text-xl`}></i>
                      </div>
                      <h3 className="text-xl font-bold text-light-100">{tool.name}</h3>
                    </div>
                    <p className="text-light-300 mb-6">{tool.description}</p>
                    <Button 
                      onClick={() => handleLaunchTool(tool.id)} 
                      className="w-full py-3 bg-dark-100 hover:bg-primary text-light-200 hover:text-white rounded-md transition duration-300 font-medium"
                    >
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          <Card className="bg-dark-200 border-dark-100">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-light-100 mb-4">Analysis History & Results</h2>
              
              <div className="space-y-4">
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-primary font-bold">Disk Analysis</div>
                      <div className="text-light-300 text-sm">Executed on Compromised Workstation Image</div>
                    </div>
                    <div className="text-sm text-light-300">13 mins ago</div>
                  </div>
                  <p className="text-light-200 text-sm">
                    Found evidence of credential harvesting (Mimikatz), PowerShell obfuscation techniques, and scheduled tasks for persistence. 
                    Recovered deleted registry keys showing security controls were disabled prior to encryption.
                  </p>
                </div>
                
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-primary font-bold">Network Analyzer</div>
                      <div className="text-light-300 text-sm">Executed on Network Traffic Logs</div>
                    </div>
                    <div className="text-sm text-light-300">47 mins ago</div>
                  </div>
                  <p className="text-light-200 text-sm">
                    Identified unusual data transfers to IP 185.212.47.63 located in Eastern Europe. 
                    Connection pattern matches known ShadowVault C2 infrastructure. 
                    Total exfiltration: 2.3TB of company data including R&D files.
                  </p>
                </div>
                
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-primary font-bold">Malware Sandbox</div>
                      <div className="text-light-300 text-sm">Executed on Ransomware Binary</div>
                    </div>
                    <div className="text-sm text-light-300">2 hrs ago</div>
                  </div>
                  <p className="text-light-200 text-sm">
                    BlackVault ransomware identified. Uses AES-256 encryption with unique keys for each file. 
                    Contains anti-forensic capabilities and VM detection. Hardcoded communication with C2 servers. 
                    Contains Russian language strings in code.
                  </p>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button className="bg-primary hover:bg-primary/90">
                    <span className="mr-2">View Full Analysis Report</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Tool Analysis Dialog */}
      <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
        <DialogContent className="bg-dark-200 border-dark-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary font-mono">
              {investigationTools.find(t => t.id === activeToolId)?.name} Analysis
            </DialogTitle>
            <DialogDescription className="text-light-300">
              {analysisResults 
                ? "Analysis complete. Review the findings below." 
                : "Running analysis on selected evidence..."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-dark-300 border border-dark-100 rounded-lg p-4 font-mono text-sm text-light-200">
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 rounded-full bg-danger mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-warning mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-success mr-2"></div>
              <span className="text-light-300 text-xs font-mono ml-2">
                forensic@{activeToolId ?? 'analysis'} ~
              </span>
            </div>
            
            {!analysisResults ? (
              <>
                <p className="text-primary mb-1">$ initializing {activeToolId}</p>
                <p className="text-light-200 mb-1">Loading analysis modules...</p>
                <p className="text-light-200 mb-1">Scanning evidence database...</p>
                <p className="text-light-200 mb-1 blinking">Processing data...</p>
              </>
            ) : (
              <>
                <p className="text-primary mb-1">$ {activeToolId} --analyze --evidence=all</p>
                <p className="text-light-200 mb-1">Running comprehensive analysis...</p>
                <p className="text-success mb-1">{analysisResults}</p>
                <p className="text-primary terminal-text">$ _</p>
              </>
            )}
          </div>
          
          <AudioPlayer 
            src="https://assets.mixkit.co/sfx/preview/mixkit-tech-interface-scan-2853.mp3" 
            autoPlay={true}
            loop={false}
          />
          
          <DialogFooter>
            <Button 
              onClick={handleCloseAnalysis}
              disabled={!analysisResults}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {analysisResults ? "Save Results" : "Processing..."}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Tools = () => {
  return (
    <CaseStateProvider>
      <ToolsContent />
    </CaseStateProvider>
  );
};

export default Tools;
