import { CaseStateProvider } from '@/hooks/use-case-state';
import EvidenceBoard from '@/components/evidence-board';

const Evidence = () => {
  return (
    <CaseStateProvider>
      <div className="container mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl font-bold font-mono text-primary mb-2">EVIDENCE ANALYSIS</h1>
        <div className="h-1 w-24 bg-secondary mb-6"></div>
        <p className="text-light-200 max-w-4xl mb-8">
          Examine collected evidence to identify attack vectors, understand threat actor techniques, and develop recovery strategies. Each evidence item can be analyzed in detail to reveal important clues.
        </p>
      </div>

      <EvidenceBoard />
    </CaseStateProvider>
  );
};

export default Evidence;
