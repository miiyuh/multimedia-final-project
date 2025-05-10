import React, { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from './use-toast';
import { useMemo } from 'react';

interface CaseState {
  userId: number;
  timeRemaining: number;
  caseProgress: number;
  currentStep: string;
  updateCaseProgress: (increment: number) => void;
  saveCase: () => void;
}

// Create context with default values
const CaseStateContext = createContext<CaseState>({
  userId: 1, // Default user ID
  timeRemaining: 172800, // 48 hours in seconds
  caseProgress: 0,
  currentStep: 'intro',
  updateCaseProgress: () => {},
  saveCase: () => {}
});

// Timer interval in milliseconds
const TIMER_INTERVAL = 1000;

// Custom hook to provide case state
export function useCaseState() {
  return useContext(CaseStateContext);
}

// Provider component
export function CaseStateProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [userId] = useState(1); // Hardcoded for demo
  const [timeRemaining, setTimeRemaining] = useState(172800); // 48 hours in seconds
  const [caseProgress, setCaseProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('intro');
  
  // Load case state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('ransomTrackCase');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setTimeRemaining(parsedState.timeRemaining || 172800);
        setCaseProgress(parsedState.caseProgress || 0);
        setCurrentStep(parsedState.currentStep || 'intro');
      } catch (err) {
        console.error('Failed to parse saved case state:', err);
      }
    }
  }, []);
  
  // Timer effect to count down remaining time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        // Don't go below zero
        const newTime = Math.max(0, prev - 1);
        
        // Save to localStorage on each update
        const currentState = {
          timeRemaining: newTime,
          caseProgress,
          currentStep
        };
        localStorage.setItem('ransomTrackCase', JSON.stringify(currentState));
        
        // Show a warning when time is running low
        if (newTime === 3600) { // 1 hour remaining
          toast({
            title: "Time Running Low",
            description: "Only 1 hour remaining to complete the investigation!",
            variant: "destructive",
            duration: 5000
          });
        }
        
        return newTime;
      });
    }, TIMER_INTERVAL);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [caseProgress, currentStep, toast]);
  
  // Update case progress
  const updateCaseProgress = (increment: number) => {
    setCaseProgress(prev => {
      const newProgress = Math.min(1, prev + increment);
      
      // Save to localStorage
      const currentState = {
        timeRemaining,
        caseProgress: newProgress,
        currentStep
      };
      localStorage.setItem('ransomTrackCase', JSON.stringify(currentState));
      
      return newProgress;
    });
    
    // If progress is updated, also update current step
    if (increment > 0) {
      setCurrentStep('progressing');
    }
  };
  
  // Save current case state
  const saveCase = () => {
    const currentState = {
      timeRemaining,
      caseProgress,
      currentStep
    };
    localStorage.setItem('ransomTrackCase', JSON.stringify(currentState));
    
    toast({
      title: "Case Saved",
      description: "Your investigation progress has been saved.",
      duration: 3000
    });
  };
  
  const contextValue = useMemo(() => ({
  userId,
  timeRemaining,
  caseProgress,
  currentStep,
  updateCaseProgress,
  saveCase
  }), [userId, timeRemaining, caseProgress, currentStep]);
  
  return React.createElement(
    CaseStateContext.Provider,
    { value: contextValue },
    children
  );
}
