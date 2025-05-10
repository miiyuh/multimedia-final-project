import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { SuspectCard } from '@/components/suspect-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { CaseStateProvider } from '@/hooks/use-case-state';
import type { Suspect } from '@shared/schema';

const Suspects = () => {
  const { data: suspects, isLoading, error } = useQuery<Suspect[]>({
    queryKey: ['/api/suspects'],
  });

  return (
    <CaseStateProvider>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold font-mono text-primary mb-2">SUSPECT PROFILES</h1>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Based on digital forensic analysis and intelligence gathering, the following threat actors have been identified as potential suspects.
            Review each profile carefully to understand their motives, tactics, and potential involvement in the Quantum Dynamics ransomware attack.
          </p>
        </motion.div>

        {error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load suspect profiles. Please try again later.</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton 
                key={index}
                className="h-[450px] bg-dark-200 rounded-lg border border-dark-100"
              />
            ))
          ) : suspects && suspects.length > 0 ? (
            // Suspect cards
            suspects.map((suspect) => (
              <SuspectCard key={suspect.id} suspect={suspect} />
            ))
          ) : (
            // No suspects found
            <div className="col-span-3 py-12 text-center text-light-300">
              <p>No suspect profiles available in the database.</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-dark-200 rounded-lg p-6 border border-dark-100">
          <h2 className="text-2xl font-bold font-mono text-primary mb-4">Investigation Guidance</h2>
          <div className="h-1 w-16 bg-secondary mb-6"></div>
          <p className="text-light-200 mb-4">
            When analyzing suspect profiles, consider the following:
          </p>
          <ul className="text-light-200 list-disc pl-8 space-y-2">
            <li>Look for connections between suspect tactics and the observed attack patterns</li>
            <li>Cross-reference evidence items with suspect profiles to establish potential links</li>
            <li>Consider motivation - financial gain, espionage, or insider retribution?</li>
            <li>Evaluate technical capabilities required for this sophisticated attack</li>
            <li>Assess whether multiple threat actors could be working together</li>
          </ul>
        </div>
      </div>
    </CaseStateProvider>
  );
};

export default Suspects;
