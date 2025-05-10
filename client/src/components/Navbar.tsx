import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-dark-800 border-b border-dark-600 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h1 className="text-xl font-mono font-bold text-white">CyberForensics<span className="text-accent-blue">_</span></h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#case" className="text-white hover:text-accent-blue transition font-medium">Case Overview</a>
          <a href="#evidence" className="text-white hover:text-accent-blue transition font-medium">Evidence</a>
          <a href="#investigation" className="text-white hover:text-accent-blue transition font-medium">Investigation</a>
          <a href="#timeline" className="text-white hover:text-accent-blue transition font-medium">Timeline</a>
        </nav>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-dark-700 rounded-full px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse mr-2"></div>
            <span className="text-sm font-mono">CASE: ACTIVE</span>
          </div>
          <button id="menuButton" className="md:hidden text-white" onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div id="mobileMenu" className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'} bg-dark-700 border-t border-dark-600`}>
        <div className="container mx-auto px-4 py-2">
          <a href="#case" className="block py-2 text-white hover:text-accent-blue transition">Case Overview</a>
          <a href="#evidence" className="block py-2 text-white hover:text-accent-blue transition">Evidence</a>
          <a href="#investigation" className="block py-2 text-white hover:text-accent-blue transition">Investigation</a>
          <a href="#timeline" className="block py-2 text-white hover:text-accent-blue transition">Timeline</a>
        </div>
      </div>
    </header>
  );
}
