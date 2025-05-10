import { createContext, useContext, useState, ReactNode } from "react";
import { Evidence, InvestigationPath, evidenceItems, investigationPaths, PathDecision } from "@/lib/data";

interface GameStateContextType {
  evidenceItems: Evidence[];
  investigationPaths: InvestigationPath[];
  currentProgress: number;
  selectedEvidence: Evidence | null;
  isEvidenceModalOpen: boolean;
  selectedPath: PathDecision | null;
  isDecisionModalOpen: boolean;
  completedDecisions: string[];
  openEvidenceModal: (evidence: Evidence) => void;
  closeEvidenceModal: () => void;
  selectInvestigationPath: (path: InvestigationPath) => void;
  closeDecisionModal: () => void;
  submitDecision: (optionIndex: number) => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<PathDecision | null>(null);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [completedDecisions, setCompletedDecisions] = useState<string[]>([]);
  
  const openEvidenceModal = (evidence: Evidence) => {
    setSelectedEvidence(evidence);
    setIsEvidenceModalOpen(true);
  };
  
  const closeEvidenceModal = () => {
    setIsEvidenceModalOpen(false);
    setSelectedEvidence(null);
  };
  
  const selectInvestigationPath = (path: InvestigationPath) => {
    setSelectedPath(path.decision);
    setIsDecisionModalOpen(true);
  };
  
  const closeDecisionModal = () => {
    setIsDecisionModalOpen(false);
    setSelectedPath(null);
  };
  
  const submitDecision = (optionIndex: number) => {
    if (selectedPath) {
      // Record that this decision was made
      setCompletedDecisions(prev => [...prev, selectedPath.id]);
      
      // Increase progress
      setCurrentProgress(prev => prev + 1);
      
      // Close the modal
      setIsDecisionModalOpen(false);
      setSelectedPath(null);
      
      // Show feedback to the user
      alert(`You've chosen: ${selectedPath.options[optionIndex].title}. This decision has been logged in your investigation report.`);
    }
  };
  
  return (
    <GameStateContext.Provider
      value={{
        evidenceItems,
        investigationPaths,
        currentProgress,
        selectedEvidence,
        isEvidenceModalOpen,
        selectedPath,
        isDecisionModalOpen,
        completedDecisions,
        openEvidenceModal,
        closeEvidenceModal,
        selectInvestigationPath,
        closeDecisionModal,
        submitDecision
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
}
