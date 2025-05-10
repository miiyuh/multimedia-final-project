import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import type { Suspect, EvidenceItem } from '@shared/schema';

interface SuspectCardProps {
  suspect: Suspect;
}

export const SuspectCard = ({ suspect }: SuspectCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Fetch all evidence to show related items
  const { data: allEvidence } = useQuery<EvidenceItem[]>({
    queryKey: ['/api/evidence'],
  });
  
  // Filter evidence related to this suspect
  const relatedEvidence = allEvidence?.filter(item => 
    suspect.evidenceLinks.includes(item.id)
  );
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-dark-200 rounded-lg overflow-hidden border border-dark-100 transition duration-300 hover:border-primary"
      >
        <div className="h-16 bg-primary/20 flex items-center px-6">
          <span className="text-primary font-mono font-bold">THREAT ACTOR PROFILE</span>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-light-100 mb-2">{suspect.name}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-dark-300 rounded-full text-xs font-mono text-danger">{suspect.type}</span>
            <span className="px-3 py-1 bg-dark-300 rounded-full text-xs font-mono text-warning">{suspect.region}</span>
            <span className="px-3 py-1 bg-dark-300 rounded-full text-xs font-mono text-secondary">{suspect.motive}</span>
          </div>
          <p className="text-light-300 mb-4">
            {suspect.description}
          </p>
          <div className="mb-4">
            <div className="text-sm font-bold text-light-200 mb-2">
              {suspect.name === "Insider Threat" ? "SUSPICIOUS INDICATORS:" : "KNOWN TACTICS:"}
            </div>
            <ul className="text-light-300 text-sm">
              {suspect.tactics.map((tactic, index) => (
                <li key={index} className="flex items-start mb-2 last:mb-0">
                  <i className="fas fa-angle-right text-primary mt-1 mr-2"></i>
                  <span>{tactic}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="w-full py-2 bg-dark-100 hover:bg-primary text-light-200 hover:text-white rounded-md transition duration-300 font-medium text-sm"
          >
            View Full Profile & Evidence
          </Button>
        </div>
      </motion.div>
      
      {/* Full Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-200 border-dark-100 max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-mono">
              <span className="text-primary">{suspect.name}</span>
              <span className="ml-auto px-3 py-1 bg-dark-300 rounded-full text-xs font-mono text-danger">{suspect.type}</span>
            </DialogTitle>
            <DialogDescription className="text-light-200 mt-4">
              {suspect.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <h4 className="text-lg font-bold text-light-100 mb-3">Threat Actor Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-dark-300 p-4 rounded-md">
                <h5 className="text-primary font-mono text-sm mb-2">REGION</h5>
                <p className="text-light-200">{suspect.region}</p>
              </div>
              <div className="bg-dark-300 p-4 rounded-md">
                <h5 className="text-primary font-mono text-sm mb-2">MOTIVE</h5>
                <p className="text-light-200">{suspect.motive}</p>
              </div>
            </div>
            
            <h4 className="text-lg font-bold text-light-100 mb-3">Tactics & Techniques</h4>
            <div className="bg-dark-300 p-4 rounded-md mb-6">
              <ul className="text-light-200">
                {suspect.tactics.map((tactic, index) => (
                  <li key={index} className="flex items-start mb-3 last:mb-0">
                    <span className="text-primary mr-2">•</span>
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <h4 className="text-lg font-bold text-light-100 mb-3">Related Evidence</h4>
            {relatedEvidence && relatedEvidence.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {relatedEvidence.map(evidence => (
                  <div key={evidence.id} className="bg-dark-300 p-4 rounded-md border border-dark-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="text-light-100 font-bold">{evidence.title}</h5>
                        <p className="text-light-300 text-sm">{evidence.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-secondary flex items-center ml-2"
                        asChild
                      >
                        <a href={`/evidence/${evidence.id}`}>
                          <span className="mr-1">View</span>
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-light-300 text-center py-4">No related evidence found for this suspect.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
