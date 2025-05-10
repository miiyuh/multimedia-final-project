import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCaseState } from '@/hooks/use-case-state';
import { queryClient } from '@/lib/queryClient';
import { apiRequest } from '@/lib/queryClient';
import type { Decision, DecisionOption } from '@shared/schema';

const DecisionPoint = () => {
  const { toast } = useToast();
  const { userId, updateCaseProgress } = useCaseState();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [outcomeText, setOutcomeText] = useState<string | null>(null);
  
  // Fetch the first decision
  const { data: decisions, isLoading } = useQuery<Decision[]>({
    queryKey: ['/api/decisions'],
  });
  
  const firstDecision = decisions?.[0];
  
  // Make a decision mutation
  const makeDecisionMutation = useMutation({
    mutationFn: async ({ decisionId, optionId }: { decisionId: number, optionId: string }) => {
      const response = await apiRequest('POST', `/api/decisions/${decisionId}/choose`, {
        userId,
        optionId
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Find the selected option to display the outcome
      const option = firstDecision?.options.find(opt => opt.id === selectedOption) as DecisionOption;
      setOutcomeText(option?.outcome || 'Your decision has been recorded.');
      setShowOutcome(true);
      
      // Update the local case progress
      updateCaseProgress(0.1);
      
      // Invalidate the user progress query
      queryClient.invalidateQueries({ queryKey: [`/api/progress/${userId}`] });
      
      toast({
        title: "Decision Recorded",
        description: "Your decision has been saved to the case file.",
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error('Error making decision:', error);
      toast({
        title: "Error",
        description: "Failed to record your decision. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  });
  
  const handleConfirmDecision = () => {
    if (!selectedOption || !firstDecision) return;
    
    makeDecisionMutation.mutate({
      decisionId: firstDecision.id,
      optionId: selectedOption
    });
  };
  
  if (isLoading || !firstDecision) {
    return (
      <section className="py-16 bg-dark-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-light-300">Loading decision point...</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-dark-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold font-mono text-primary mb-2">DECISION POINT</h2>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Based on your initial investigation, you need to make a strategic decision about your next steps. Choose carefully, as your decisions impact the case outcome.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto bg-dark-300 rounded-lg p-6 md:p-8 border border-dark-100">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-light-100 mb-4">Critical Decision Required: {firstDecision.title}</h3>
            <p className="text-light-200 mb-4">{firstDecision.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {firstDecision.options.map((option: DecisionOption) => (
              <div
                key={option.id}
                className={`bg-dark-200 rounded-lg p-6 border cursor-pointer transition duration-300 ${
                  selectedOption === option.id 
                    ? 'border-primary' 
                    : 'border-dark-100 hover:border-primary'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/20 mb-4">
                  <i className={`fas fa-${option.icon} text-primary`}></i>
                </div>
                <h4 className="text-xl font-bold text-light-100 mb-2">{option.title}</h4>
                <p className="text-light-300 mb-4">
                  {option.description}
                </p>
                {option.status && (
                  <div className={`text-xs font-mono flex items-center ${
                    option.status === "CEO's Preference" 
                      ? 'text-warning' 
                      : option.status === "CISO's Recommendation"
                        ? 'text-success'
                        : 'text-light-300'
                  }`}>
                    <i className={`fas fa-${
                      option.status === "CEO's Preference" 
                        ? 'exclamation-triangle' 
                        : option.status === "CISO's Recommendation"
                          ? 'check-circle'
                          : 'clock'
                    } mr-2`}></i>
                    <span>{option.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleConfirmDecision}
              disabled={!selectedOption || makeDecisionMutation.isPending}
              className="bg-primary hover:bg-primary/90 transition text-white font-bold py-3 px-8 rounded-md inline-flex items-center group"
            >
              <span className="mr-2">
                {makeDecisionMutation.isPending ? 'PROCESSING...' : 'CONFIRM DECISION'}
              </span>
              <i className="fas fa-arrow-right transition group-hover:translate-x-1"></i>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Outcome Dialog */}
      <Dialog open={showOutcome} onOpenChange={setShowOutcome}>
        <DialogContent className="bg-dark-200 border-dark-100">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary font-mono">Decision Outcome</DialogTitle>
            <DialogDescription className="text-light-200">
              {outcomeText}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setShowOutcome(false)}
              className="bg-primary"
            >
              Continue Investigation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DecisionPoint;
