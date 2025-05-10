import { motion } from 'framer-motion';
import { TimelineItem } from './timeline-item';
import { timelineEvents } from '@/lib/utils';

const CaseBackground = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="py-16 bg-dark-300">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold font-mono text-primary mb-2">CASE BACKGROUND</h2>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            At 03:42 AM on December 14, Quantum Dynamics Corp's systems were compromised by a sophisticated ransomware attack. 
            All corporate files were encrypted, and a ransom demand of $2.75 million in cryptocurrency was issued. 
            As the lead digital forensic investigator, you must trace the attack vector, identify the threat actors, and recover critical data.
          </p>
        </motion.div>
        
        {/* Timeline Component */}
        <div className="relative mt-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-dark-100"></div>
          
          {timelineEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="relative mb-16"
            >
              <TimelineItem 
                id={event.id}
                time={event.time}
                title={event.title}
                description={event.description}
                tags={event.tags}
                position={event.position}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseBackground;
