import { useGameState } from "@/hooks/useGameState";

export default function EvidenceGallery() {
  const { evidenceItems, openEvidenceModal } = useGameState();

  return (
    <section id="evidence" className="py-16 bg-dark-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-mono font-bold mb-2 flex items-center">
          <span className="text-accent-blue mr-2">#</span> Digital Evidence Gallery
        </h2>
        <p className="text-gray-400 mb-10 max-w-3xl">Examine the collected digital evidence to understand the attack vector, ransomware characteristics, and potential recovery options.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidenceItems.map((item) => (
            <div 
              key={item.id}
              className="evidence-card bg-dark-800 border border-dark-600 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-accent-blue/30" 
              data-evidence-id={item.id}
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 m-2 bg-dark-900/80 text-xs font-mono py-1 px-2 rounded">
                  {item.type.toUpperCase()}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-500">{item.id}</span>
                  <button 
                    onClick={() => openEvidenceModal(item)}
                    className="bg-dark-700 hover:bg-accent-blue text-white text-sm py-1 px-3 rounded transition-colors duration-300"
                  >
                    Examine
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
