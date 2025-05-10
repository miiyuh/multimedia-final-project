import { useState, useEffect } from 'react';

interface TerminalWindowProps {
  className?: string;
}

export const TerminalWindow = ({ className = '' }: TerminalWindowProps) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const loadingSteps = [
    { text: "$ initializing case file", isCommand: true },
    { text: "Loading evidence collection...", isCommand: false },
    { text: "Preparing digital forensics toolkit...", isCommand: false },
    { text: "Establishing secure connection to DFIR network...", isCommand: false },
    { text: "All systems ready.", isCommand: false, className: "text-success" },
    { text: "$ awaiting investigator input", isCommand: true, showCursor: true }
  ];
  
  useEffect(() => {
    if (loadingStep < loadingSteps.length - 1) {
      const timer = setTimeout(() => {
        setLoadingStep(prev => prev + 1);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [loadingStep, loadingSteps.length]);
  
  return (
    <div className={`terminal-window bg-dark-300 border border-dark-100 rounded-lg p-4 md:p-6 ${className}`}>
      <div className="terminal-header flex items-center mb-4">
        <div className="h-3 w-3 rounded-full bg-danger mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-warning mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-success mr-2"></div>
        <span className="text-light-300 text-sm font-mono ml-2">terminal@forensics ~</span>
      </div>
      <div className="text-left">
        {loadingSteps.slice(0, loadingStep + 1).map((step, index) => (
          <p 
            key={index} 
            className={`font-mono text-sm mb-1 ${
              step.className || (step.isCommand ? 'text-primary' : 'text-light-200')
            } ${
              index === loadingStep && step.showCursor ? 'terminal-text' : ''
            }`}
          >
            {step.text}
          </p>
        ))}
      </div>
    </div>
  );
};
