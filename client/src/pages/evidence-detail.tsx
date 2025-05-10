import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronsLeft, AlertTriangle, FileText, Database, Link2, ArrowRight } from 'lucide-react';
import { CaseStateProvider } from '@/hooks/use-case-state';
import { AudioPlayer } from '@/components/ui/audio-player';
import type { EvidenceItem, Suspect } from '@shared/schema';

const EvidenceDetail = () => {
  const params = useParams();
  const evidenceId = params.id ? parseInt(params.id) : null;
  
  const { data: evidence, isLoading: isLoadingEvidence, error: evidenceError } = useQuery<EvidenceItem>({
    queryKey: [`/api/evidence/${evidenceId}`],
    enabled: evidenceId !== null,
  });
  
  const { data: suspects } = useQuery<Suspect[]>({
    queryKey: ['/api/suspects'],
  });
  
  // Get suspects related to this evidence
  const relatedSuspects = suspects?.filter(suspect => 
    suspect.evidenceLinks.includes(evidenceId || 0)
  );
  
  if (evidenceError) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load evidence details. Please try again later.</AlertDescription>
        </Alert>
        
        <Button variant="outline" asChild>
          <Link href="/evidence">
            <ChevronsLeft className="mr-2 h-4 w-4" />
            Back to Evidence Board
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <CaseStateProvider>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/evidence">
              <ChevronsLeft className="mr-2 h-4 w-4" />
              Back to Evidence Board
            </Link>
          </Button>
        </div>
        
        {isLoadingEvidence ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 bg-dark-200" />
            <Skeleton className="h-6 w-1/4 bg-dark-200" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Skeleton className="h-[300px] bg-dark-200 col-span-2" />
              <Skeleton className="h-[300px] bg-dark-200" />
            </div>
          </div>
        ) : evidence ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold font-mono text-primary mb-2">{evidence.title}</h1>
              <Badge variant="outline" className="bg-primary/20 text-primary border-none">
                {evidence.type}
              </Badge>
              <p className="text-light-200 mt-4 max-w-4xl">
                {evidence.description}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="related">Related Items</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-0">
                    <Card className="bg-dark-200 border-dark-100">
                      <CardContent className="p-6">
                        <div className="relative h-64 sm:h-80 mb-6 overflow-hidden rounded-md">
                          <img 
                            src={evidence.imageUrl || 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
                            alt={evidence.title} 
                            className="w-full h-full object-cover"
                          />
                          {evidence.type === 'RANSOM DEMAND' && (
                            <div className="scanning-overlay"></div>
                          )}
                        </div>
                        
                        <h2 className="text-xl font-bold text-light-100 mb-4">Evidence Description</h2>
                        <p className="text-light-200 mb-6">
                          {evidence.detailContent.fullDescription}
                        </p>
                        
                        <h3 className="text-lg font-bold text-light-100 mb-3">Key Findings</h3>
                        <ul className="text-light-200 list-disc pl-6 space-y-2 mb-6">
                          {evidence.detailContent.keyFindings.map((finding, index) => (
                            <li key={index}>{finding}</li>
                          ))}
                        </ul>
                        
                        {evidence.type === 'RANSOM DEMAND' && (
                          <div className="mb-6">
                            <h3 className="text-lg font-bold text-light-100 mb-3">Ransom Note Audio Transcript</h3>
                            <AudioPlayer 
                              src="https://assets.mixkit.co/sfx/preview/mixkit-computer-malfunctioning-1493.mp3" 
                              className="mb-4"
                            />
                            <div className="bg-dark-300 p-4 rounded-md font-mono text-sm text-light-200">
                              <p className="mb-2">TRANSCRIPT:</p>
                              <p className="mb-2">
                                "Your network has been breached and your files are now encrypted with military-grade encryption.
                                We have also downloaded a copy of your sensitive data.
                              </p>
                              <p className="mb-2">
                                To receive the decryption key and prevent the publication of your data, you must pay 
                                2.75 million dollars in Bitcoin within 72 hours. The countdown has begun.
                              </p>
                              <p>
                                Any attempt to recover files without our decryption tool will result in permanent data loss.
                                Instructions for payment are in the text file on each encrypted system."
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-4">
                          {evidence.detailContent.analysisTools.map((tool, index) => (
                            <Link key={index} href="/tools">
                              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                Analyze with {tool}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="analysis" className="mt-0">
                    <Card className="bg-dark-200 border-dark-100">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-light-100 mb-4">Forensic Analysis</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-dark-300 p-4 rounded-md">
                            <div className="flex items-center mb-3">
                              <FileText className="text-primary mr-2 h-5 w-5" />
                              <h3 className="text-lg font-bold text-light-100">Technical Details</h3>
                            </div>
                            
                            {evidence.type === 'MALWARE SAMPLE' && (
                              <div className="space-y-3 text-light-200">
                                <div>
                                  <span className="text-primary font-mono text-sm">FILE HASH (SHA-256):</span>
                                  <p className="text-xs font-mono mt-1 break-all">8e4a8a5c9b2d7f1e6a3d4c5b8a9e7f1d2c3b4a5d6e8a7c9b8a7d6e5f4c3b2a1d9</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">FILE SIZE:</span>
                                  <p>3.2 MB (3,354,624 bytes)</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">COMPILATION TIMESTAMP:</span>
                                  <p>2023-12-10 14:37:22 UTC</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">ENCRYPTION METHOD:</span>
                                  <p>AES-256 + RSA-4096</p>
                                </div>
                              </div>
                            )}
                            
                            {evidence.type === 'NETWORK' && (
                              <div className="space-y-3 text-light-200">
                                <div>
                                  <span className="text-primary font-mono text-sm">PACKET CAPTURE SIZE:</span>
                                  <p>2.7 GB</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">CAPTURE TIMEFRAME:</span>
                                  <p>December 11-14, 2023</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">CONNECTIONS LOGGED:</span>
                                  <p>17,842 unique connections</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">DATA EXFILTRATION VOLUME:</span>
                                  <p>2.3 TB to external IPs</p>
                                </div>
                              </div>
                            )}
                            
                            {evidence.type === 'EMAIL' && (
                              <div className="space-y-3 text-light-200">
                                <div>
                                  <span className="text-primary font-mono text-sm">SENDER:</span>
                                  <p>it-director@quantum-dynamics-corp.com (Spoofed)</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">TRUE SOURCE:</span>
                                  <p>it-support@quantumdynamicscorp-it.com</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">RECEIVED TIME:</span>
                                  <p>December 7, 2023 09:14:36 UTC</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">ATTACHMENT TYPE:</span>
                                  <p>DOCX with malicious macros</p>
                                </div>
                              </div>
                            )}
                            
                            {evidence.type !== 'MALWARE SAMPLE' && evidence.type !== 'NETWORK' && evidence.type !== 'EMAIL' && (
                              <div className="space-y-3 text-light-200">
                                <div>
                                  <span className="text-primary font-mono text-sm">EVIDENCE ID:</span>
                                  <p>#{evidence.id.toString().padStart(3, '0')}</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">COLLECTION DATE:</span>
                                  <p>December 14, 2023</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">EVIDENCE TYPE:</span>
                                  <p>{evidence.type}</p>
                                </div>
                                <div>
                                  <span className="text-primary font-mono text-sm">CHAIN OF CUSTODY:</span>
                                  <p>Maintained - Digital Signature Verified</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="bg-dark-300 p-4 rounded-md">
                            <div className="flex items-center mb-3">
                              <Database className="text-primary mr-2 h-5 w-5" />
                              <h3 className="text-lg font-bold text-light-100">Analysis Results</h3>
                            </div>
                            
                            <div className="space-y-3 text-light-200">
                              <div>
                                <span className="text-primary font-mono text-sm">ANALYSIS STATUS:</span>
                                <p className="flex items-center">
                                  <span className="inline-block w-2 h-2 rounded-full bg-success mr-2"></span>
                                  Complete
                                </p>
                              </div>
                              <div>
                                <span className="text-primary font-mono text-sm">ANALYSIS METHOD:</span>
                                <p>{evidence.detailContent.analysisTools.join(', ')}</p>
                              </div>
                              <div>
                                <span className="text-primary font-mono text-sm">THREAT SCORE:</span>
                                <p className="font-bold text-danger">92/100 (Critical)</p>
                              </div>
                              <div>
                                <span className="text-primary font-mono text-sm">ATTRIBUTION CONFIDENCE:</span>
                                <p>87% - ShadowVault Group</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-dark-300 p-4 rounded-md">
                          <div className="flex items-center mb-3">
                            <Link2 className="text-primary mr-2 h-5 w-5" />
                            <h3 className="text-lg font-bold text-light-100">Connection to Attack Chain</h3>
                          </div>
                          <p className="text-light-200 mb-4">
                            This evidence is a critical component in understanding the attack methodology used in the Quantum Dynamics 
                            ransomware incident. It provides insights into the {evidence.type.toLowerCase()} phase of the attack and
                            connects directly to multiple stages of the breach.
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {['Initial Access', 'Credential Theft', 'Lateral Movement', 'Data Exfiltration', 'Ransomware Deployment'].map(
                              (stage, index) => (
                                <Badge key={index} variant="secondary" className="bg-dark-100 text-light-200">
                                  {stage}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="related" className="mt-0">
                    <Card className="bg-dark-200 border-dark-100">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold text-light-100 mb-4">Related Evidence & Suspects</h2>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-bold text-light-100 mb-3">Associated Suspects</h3>
                          
                          {relatedSuspects && relatedSuspects.length > 0 ? (
                            <div className="space-y-4">
                              {relatedSuspects.map(suspect => (
                                <div key={suspect.id} className="bg-dark-300 p-4 rounded-md flex items-start">
                                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/20 mr-4 flex-shrink-0">
                                    <i className="fas fa-user-secret text-primary"></i>
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-bold text-light-100">{suspect.name}</h4>
                                    <div className="flex flex-wrap gap-2 my-2">
                                      <Badge variant="outline" className="bg-dark-100 text-danger border-none">{suspect.type}</Badge>
                                      <Badge variant="outline" className="bg-dark-100 text-warning border-none">{suspect.region}</Badge>
                                    </div>
                                    <p className="text-light-300 text-sm">{suspect.description}</p>
                                    <Link href={`/suspects?highlight=${suspect.id}`}>
                                      <Button variant="link" className="text-primary px-0 py-0 h-auto mt-2">
                                        View Full Profile
                                        <ArrowRight className="ml-2 h-3 w-3" />
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-light-300 py-4 text-center">No suspects directly linked to this evidence yet.</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-bold text-light-100 mb-3">Connected Evidence</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2].map(i => {
                              // Find another piece of evidence that shares suspects with this one
                              const connectedEvidence = evidence.id + i > 6 ? evidence.id - i : evidence.id + i;
                              return (
                                <Link key={i} href={`/evidence/${connectedEvidence}`}>
                                  <div className="bg-dark-300 p-4 rounded-md border border-dark-100 hover:border-primary transition duration-300 cursor-pointer">
                                    <h4 className="text-md font-bold text-light-100">Evidence #{connectedEvidence.toString().padStart(3, '0')}</h4>
                                    <p className="text-light-300 text-sm">
                                      {connectedEvidence === 1 && "Compromised Workstation Image"}
                                      {connectedEvidence === 2 && "Ransomware Binary Analysis"}
                                      {connectedEvidence === 3 && "Phishing Email"}
                                      {connectedEvidence === 4 && "Network Traffic Logs"}
                                      {connectedEvidence === 5 && "Ransom Note"}
                                      {connectedEvidence === 6 && "VPN Access Records"}
                                    </p>
                                    <div className="flex justify-end mt-2">
                                      <ArrowRight className="h-4 w-4 text-primary" />
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <Card className="bg-dark-200 border-dark-100">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-light-100 mb-4">Investigation Notes</h2>
                    
                    <div className="bg-dark-300 p-4 rounded-md font-mono text-sm text-light-200 mb-4">
                      <p className="mb-2">[CASE #RT-1337 | EVIDENCE #{evidence.id.toString().padStart(3, '0')}]</p>
                      <p className="mb-2">Analysis of {evidence.title.toLowerCase()} reveals several critical insights:</p>
                      <ul className="list-disc pl-5 space-y-1 mb-2">
                        {evidence.detailContent.keyFindings.slice(0, 2).map((finding, index) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                      <p>This evidence strongly links to {relatedSuspects?.map(s => s.name).join(', ') || 'unknown actors'}.</p>
                    </div>
                    
                    <textarea 
                      className="w-full bg-dark-300 text-light-200 p-4 rounded-md border border-dark-100 focus:border-primary focus:ring-primary resize-none"
                      rows={5}
                      placeholder="Add your investigation notes here..."
                    ></textarea>
                    
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                      Save Notes
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-dark-200 border-dark-100 mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-light-100 mb-4">Recommended Actions</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-search text-primary text-sm"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-light-100">Analyze with {evidence.detailContent.analysisTools[0]}</h3>
                          <p className="text-light-300 text-sm">Extract additional technical details using specialized tools</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-users text-primary text-sm"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-light-100">Review Suspect Profiles</h3>
                          <p className="text-light-300 text-sm">Cross-reference findings with known threat actor tactics</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <i className="fas fa-link text-primary text-sm"></i>
                        </div>
                        <div>
                          <h3 className="font-bold text-light-100">Connect Related Evidence</h3>
                          <p className="text-light-300 text-sm">Build a comprehensive timeline of the attack sequence</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-light-100 mb-2">Evidence Not Found</h2>
            <p className="text-light-300">
              The requested evidence item could not be located in the case file.
            </p>
          </div>
        )}
      </div>
    </CaseStateProvider>
  );
};

export default EvidenceDetail;
