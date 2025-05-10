import { useGameState } from "@/hooks/useGameState";

export default function InvestigationPaths() {
  const { investigationPaths, selectInvestigationPath } = useGameState();

  return (
    <section id="investigation" className="py-16 bg-dark-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-mono font-bold mb-2 flex items-center">
          <span className="text-accent-blue mr-2">#</span> Investigation Path
        </h2>
        <p className="text-gray-400 mb-10 max-w-3xl">Choose your investigative approach. Each decision will lead to different evidence and potential outcomes.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investigationPaths.map((path) => (
            <div key={path.id} className="bg-dark-700 border border-dark-600 rounded-lg overflow-hidden hover:border-accent-blue transition-all duration-300">
              <div className="bg-dark-800 p-4 border-b border-dark-600">
                <h3 className="font-bold text-lg">{path.title}</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <img 
                    src={path.image} 
                    alt={path.title} 
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-300 mb-4">
                  {path.description}
                </p>
                <ul className="mb-6 text-sm space-y-2">
                  {path.techniques.map((technique, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{technique}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => selectInvestigationPath(path)}
                  className="w-full bg-dark-600 hover:bg-accent-blue text-white py-3 rounded-md transition-colors duration-300"
                >
                  Choose This Path
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
