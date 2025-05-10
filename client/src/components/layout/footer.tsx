import { Link } from 'wouter';
import { Save, Settings, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useCaseState } from '@/hooks/use-case-state';

const Footer = () => {
  const { caseProgress, saveCase } = useCaseState();
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round(caseProgress * 100), 100);
  
  return (
    <footer className="bg-dark-200 border-t border-dark-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-primary text-xl font-bold font-mono">Ransom<span className="text-secondary">Track</span></span>
              <span className="ml-2 px-2 py-1 text-xs font-mono bg-dark-100 rounded-md text-light-300">Simulation v1.0</span>
            </div>
            <p className="text-light-300 text-sm mt-2">
              A cybercrime investigation web experience.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-light-200 font-bold mb-2">Investigation Progress</div>
              <div className="w-36 bg-dark-100 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={saveCase}
                variant="outline" 
                size="icon" 
                className="bg-dark-100 hover:bg-dark-100/80 w-10 h-10 rounded-full text-light-200"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-dark-100 hover:bg-dark-100/80 w-10 h-10 rounded-full text-light-200"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Link href="/resources">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-dark-100 hover:bg-dark-100/80 w-10 h-10 rounded-full text-light-200"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-100 mt-6 pt-6 text-center text-light-300 text-sm">
          &copy; 2023 RansomTrack Cybercrime Investigation Simulation | Educational Use Only
        </div>
      </div>
    </footer>
  );
};

export default Footer;
