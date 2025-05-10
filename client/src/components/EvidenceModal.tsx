import { Evidence } from "@/lib/data";

interface EvidenceModalProps {
  evidence: Evidence;
  onClose: () => void;
}

export default function EvidenceModal({ evidence, onClose }: EvidenceModalProps) {
  const handleDeepScan = () => {
    // In a real implementation, this would trigger an analysis action
    alert('Deep scan initiated on evidence ' + evidence.id);
  };

  const handleCompareSignatures = () => {
    alert('Comparing signatures for evidence ' + evidence.id);
  };

  const handleExtractMetadata = () => {
    alert('Extracting metadata from evidence ' + evidence.id);
  };

  const handleAddToCaseFile = () => {
    alert('Added evidence ' + evidence.id + ' to case file');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-dark-900/95 flex items-center justify-center px-4">
      <div className="relative bg-dark-800 border border-dark-600 rounded-lg w-full max-w-4xl">
        <div className="flex items-center justify-between bg-dark-700 px-6 py-4 rounded-t-lg border-b border-dark-600">
          <h3 className="text-xl font-mono font-bold">{evidence.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-dark-900 rounded-lg overflow-hidden">
              <img src={evidence.image} alt={evidence.title} className="w-full h-64 object-cover" />
            </div>
            <div>
              <div className="mb-4">
                <h4 className="text-gray-400 text-sm mb-1">Evidence ID</h4>
                <p className="font-mono text-accent-blue">{evidence.id}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-gray-400 text-sm mb-1">Type</h4>
                <p className="font-mono">{evidence.type}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-gray-400 text-sm mb-1">Collection Date</h4>
                <p className="font-mono">{evidence.date}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-sm mb-1">Integrity Hash</h4>
                <p className="font-mono text-xs break-all">{evidence.hash}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-gray-400 text-sm mb-2">Analysis Notes</h4>
            <div className="bg-dark-900 rounded-lg p-4 text-gray-300 font-code text-sm">
              {evidence.notes}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleDeepScan}
              className="bg-dark-700 hover:bg-accent-blue text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              Run Deep Scan
            </button>
            <button 
              onClick={handleCompareSignatures}
              className="bg-dark-700 hover:bg-accent-blue text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              Compare Signatures
            </button>
            <button 
              onClick={handleExtractMetadata}
              className="bg-dark-700 hover:bg-accent-blue text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              Extract Metadata
            </button>
            <button 
              onClick={handleAddToCaseFile}
              className="bg-dark-700 hover:bg-accent-green text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              Add to Case File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
