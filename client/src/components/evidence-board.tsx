import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { EvidenceCard } from './evidence-card';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { evidenceFilters } from '@/lib/utils';
import type { EvidenceItem } from '@shared/schema';

const EvidenceBoard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: evidenceItems, isLoading } = useQuery<EvidenceItem[]>({
    queryKey: ['/api/evidence'],
  });
  
  // Filter evidence based on selected filter
  const filteredEvidence = evidenceItems?.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });
  
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
          <h2 className="text-3xl font-bold font-mono text-primary mb-2">EVIDENCE BOARD</h2>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Examine the collected evidence to identify attack vectors, attacker techniques, and potential recovery methods. 
            Click on each item for detailed analysis.
          </p>
        </motion.div>
        
        {/* Evidence Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {evidenceFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              className={activeFilter === filter.id 
                ? "bg-primary text-white" 
                : "bg-dark-100 hover:bg-dark-100/80 text-light-200"}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* Evidence Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton 
                key={index}
                className="h-[400px] bg-dark-300 rounded-lg border border-dark-100"
              />
            ))
          ) : filteredEvidence && filteredEvidence.length > 0 ? (
            // Evidence items
            filteredEvidence.map((evidence) => (
              <EvidenceCard key={evidence.id} evidence={evidence} />
            ))
          ) : (
            // No evidence found
            <div className="col-span-3 py-12 text-center text-light-300">
              <p>No evidence matching the selected filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default EvidenceBoard;
