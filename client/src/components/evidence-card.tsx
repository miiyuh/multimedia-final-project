import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { EvidenceItem } from '@shared/schema';

interface EvidenceCardProps {
  evidence: EvidenceItem;
}

export const EvidenceCard = ({ evidence }: EvidenceCardProps) => {
  const { id, title, type, description, imageUrl } = evidence;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="evidence-card bg-dark-300 rounded-lg overflow-hidden border border-dark-100 transition duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-mono">
          {type}
        </div>
        {type === 'RANSOM DEMAND' && (
          <div className="scanning-overlay"></div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-light-100">{title}</h3>
        <p className="text-light-300 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-light-300">EVIDENCE #{id.toString().padStart(3, '0')}</span>
          <Link href={`/evidence/${id}`}>
            <a className="text-primary hover:text-secondary flex items-center text-sm">
              <span className="mr-2">Analyze</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
