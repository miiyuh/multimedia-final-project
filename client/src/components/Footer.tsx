export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h1 className="text-lg font-mono font-bold text-white">CyberForensics<span className="text-accent-blue">_</span></h1>
            </div>
            <p className="text-gray-400 text-sm mt-2">A digital forensics ransomware investigation simulation</p>
          </div>
          <div className="flex space-x-8">
            <a href="#case" className="text-gray-400 hover:text-accent-blue transition">Case Overview</a>
            <a href="#evidence" className="text-gray-400 hover:text-accent-blue transition">Evidence</a>
            <a href="#investigation" className="text-gray-400 hover:text-accent-blue transition">Investigation</a>
            <a href="#timeline" className="text-gray-400 hover:text-accent-blue transition">Timeline</a>
          </div>
        </div>
        <div className="border-t border-dark-600 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; 2023 CyberForensics Interactive Case Study. Educational Use Only.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-accent-blue transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-accent-blue transition">Terms of Use</a>
            <a href="#" className="text-gray-400 hover:text-accent-blue transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
