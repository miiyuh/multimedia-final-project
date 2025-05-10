import { useState } from "react";
import { PathDecision } from "@/lib/data";

interface DecisionModalProps {
  pathData: PathDecision;
  onClose: () => void;
  onSubmit: (optionIndex: number) => void;
}

export default function DecisionModal({ pathData, onClose, onSubmit }: DecisionModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSubmit(selectedOption);
    } else {
      alert('Please select an option before proceeding.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-dark-900/95 flex items-center justify-center px-4">
      <div className="relative bg-dark-800 border border-dark-600 rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between bg-dark-700 px-6 py-4 rounded-t-lg border-b border-dark-600">
          <h3 className="text-xl font-mono font-bold">{pathData.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-300 mb-6">
            {pathData.description}
          </p>
          
          <div className="space-y-4 mb-6">
            {pathData.options.map((option, index) => (
              <div 
                key={index}
                className={`bg-dark-700 border ${selectedOption === index ? 'border-accent-blue' : 'border-dark-600'} hover:border-accent-blue p-4 rounded-lg cursor-pointer transition-all duration-300`}
                onClick={() => setSelectedOption(index)}
              >
                <label className="flex items-start cursor-pointer">
                  <input 
                    type="radio" 
                    name="decision" 
                    value={`option${index + 1}`} 
                    className="mt-1 mr-3"
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  <div>
                    <h4 className="font-medium mb-1">{option.title}</h4>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleSubmit}
              className="bg-accent-blue hover:bg-accent-blue-dark text-white py-2 px-6 rounded-md transition-colors duration-300"
            >
              Submit Decision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
