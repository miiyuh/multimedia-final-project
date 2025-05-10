import { motion } from 'framer-motion';

interface TimelineItemProps {
  id: number;
  time: string;
  title: string;
  description: string;
  tags: string[];
  position: 'left' | 'right';
}

export const TimelineItem = ({
  id,
  time,
  title,
  description,
  tags,
  position
}: TimelineItemProps) => {
  return (
    <>
      <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-primary border-4 border-dark-300">
        <span className="text-xs font-bold text-dark-300">{id}</span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: position === 'left' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`
          ${position === 'left' 
            ? 'ml-0 md:ml-auto mr-auto md:mr-[calc(50%+2rem)]' 
            : 'ml-auto md:ml-[calc(50%+2rem)] mr-0 md:mr-auto'
          } 
          w-full md:w-[calc(50%-2rem)] p-6 rounded-lg bg-dark-200 border border-dark-100
        `}
      >
        <div className="font-mono text-warning text-sm mb-2">{time}</div>
        <h3 className="text-xl font-bold mb-2 text-light-100">{title}</h3>
        <p className="text-light-200 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-3 py-1 bg-dark-300 rounded-full text-xs font-mono ${
                tag === 'CRITICAL' ? 'text-danger' : 'text-secondary'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
};
