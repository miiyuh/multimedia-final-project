import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { investigationTools } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const InvestigationTools = () => {
  const { toast } = useToast();
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  
  const handleLaunchTool = (toolId: string) => {
    setActiveToolId(toolId);
    
    // Simulate tool loading
    toast({
      title: "Tool Launched",
      description: `The ${investigationTools.find(t => t.id === toolId)?.name} tool is now analyzing evidence.`,
      duration: 3000,
    });
  };
  
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
          <h2 className="text-3xl font-bold font-mono text-primary mb-2">INVESTIGATION TOOLS</h2>
          <div className="h-1 w-24 bg-secondary mb-6"></div>
          <p className="text-light-200 max-w-4xl">
            Select from available forensic tools to analyze evidence and progress your investigation. Each tool provides different insights and can reveal new clues.
          </p>
        </motion.div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investigationTools.map((tool) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Dialog>
                <Card className="bg-dark-200 rounded-lg p-6 border border-dark-100 hover:border-primary transition duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                        <i className={`fas fa-${tool.icon} text-primary text-xl`}></i>
                      </div>
                      <h3 className="text-xl font-bold text-light-100">{tool.name}</h3>
                    </div>
                    <p className="text-light-300 mb-6">{tool.description}</p>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => handleLaunchTool(tool.id)} 
                        className="w-full py-3 bg-dark-100 hover:bg-primary text-light-200 hover:text-white rounded-md transition duration-300 font-medium"
                      >
                        Launch Tool
                      </Button>
                    </DialogTrigger>
                  </CardContent>
                </Card>
                
                <DialogContent className="bg-dark-200 border-dark-100 text-light-200">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-light-100 font-mono">
                      <span className="text-primary">{tool.name}</span> Analysis Tool
                    </DialogTitle>
                    <DialogDescription className="text-light-300">
                      Running analysis on selected evidence...
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="bg-dark-300 border border-dark-100 rounded-lg p-4 font-mono text-sm text-light-200">
                    <div className="flex items-center mb-4">
                      <div className="h-3 w-3 rounded-full bg-danger mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-warning mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-success mr-2"></div>
                      <span className="text-light-300 text-xs font-mono ml-2">{tool.name.toLowerCase()}@forensics ~</span>
                    </div>
                    <p className="text-primary mb-1">$ initializing {tool.id}</p>
                    <p className="text-light-200 mb-1">Loading analysis modules...</p>
                    <p className="text-light-200 mb-1">Scanning evidence database...</p>
                    <p className="text-light-200 mb-1">Applying forensic procedures...</p>
                    <p className="text-success mb-1">Analysis complete.</p>
                    <p className="text-primary terminal-text">$ viewing results_</p>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => {
                        // Simulate tool results
                        toast({
                          title: "Analysis Complete",
                          description: "New information has been added to your case file.",
                          duration: 3000,
                        });
                      }}
                    >
                      View Results
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestigationTools;
