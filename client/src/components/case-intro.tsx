import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from './ui/button';
import { TerminalWindow } from './terminal-window';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const CaseIntro = () => {
  const [, setLocation] = useLocation();
  
  const handleBeginInvestigation = () => {
    setLocation('/case-file');
  };
  
  return (
    <div className="relative h-screen flex items-center justify-center bg-dark-300 bg-opacity-70 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-300 via-dark-300/90 to-dark-300"></div>
        <div className="absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 py-2 px-4 border border-primary bg-dark-200 rounded-md"
        >
          <span className="text-primary font-mono text-sm font-bold">CONFIDENTIAL</span>
          <span className="text-light-300 font-mono text-sm ml-2">CASE #RT-1337</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold font-mono mb-4 text-light-100"
        >
          <span className="text-primary">RANSOM</span><span className="text-secondary">TRACK</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-light-200 mb-8 max-w-3xl mx-auto"
        >
          A sophisticated ransomware attack has crippled Quantum Dynamics Corp. Your job: investigate the attack, identify the perpetrators, and recover the systems.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <TerminalWindow className="max-w-3xl mx-auto mb-8" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <Button 
            onClick={handleBeginInvestigation}
            className="bg-primary hover:bg-primary/90 transition text-white font-bold py-3 px-8 rounded-md inline-flex items-center group"
          >
            <span className="mr-2">BEGIN INVESTIGATION</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center pb-8"
      >
        <div className="text-sm text-light-300 font-mono flex items-center animate-pulse">
          <ArrowDown className="mr-2 h-4 w-4" />
          <span>Scroll to continue</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CaseIntro;
