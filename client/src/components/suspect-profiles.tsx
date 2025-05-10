import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { SuspectCard } from './suspect-card';
import { Skeleton } from './ui/skeleton';
import type { Suspect } from '@shared/schema';

const SuspectProfiles = () => {
  const { data: suspects, isLoading } = useQuery<Suspect[]>({
    queryKey: ['/api/suspects'],
  });
  
  return (
    <section className="py-16 bg-dark-300">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold font-mono text-primary mb-2">SUSPECT PROFILES</h2>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Based on threat intelligence analysis and digital forensics, these threat actors have been identified as potential suspects. Review their profiles and associated evidence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton 
                key={index}
                className="h-[400px] bg-dark-200 rounded-lg border border-dark-100"
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
              <p>No suspect profiles available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuspectProfiles;
